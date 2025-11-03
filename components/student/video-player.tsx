"use client";

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface VideoPlayerProps {
  chapterId: string
}

const mockTimestamps = [
  { time: "0:00", label: "Introduction to Logistic Regression" },
  { time: "2:30", label: "Understanding the Sigmoid Function" },
  { time: "5:45", label: "Mathematical Formulation" },
  { time: "8:20", label: "Training Process" },
  { time: "12:10", label: "Practical Examples" },
  { time: "15:30", label: "Common Pitfalls" },
]

export function VideoPlayer({ chapterId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(35)

  return (
    <div className="h-full flex flex-col">
      {/* Video Player */}
      <div className="bg-black aspect-video relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm opacity-75">Video Player Placeholder</p>
            <p className="text-xs opacity-50 mt-1">Logistic Regression Lecture - 18:45</p>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <Slider value={[progress]} onValueChange={(v) => setProgress(v[0])} className="mb-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <span className="text-white text-sm ml-2">6:32 / 18:45</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Chapters/Timestamps */}
      <div className="flex-1 border-t">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-semibold text-sm">Video Chapters</h3>
          <p className="text-xs text-muted-foreground">Jump to specific sections</p>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="p-4 space-y-2">
            {mockTimestamps.map((timestamp, index) => (
              <Card
                key={index}
                className="p-3 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => console.log("[v0] Jump to:", timestamp.time)}
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-xs">
                    {timestamp.time}
                  </Badge>
                  <span className="text-sm">{timestamp.label}</span>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
