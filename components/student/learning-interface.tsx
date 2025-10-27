"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  Video,
  ClipboardList,
  MessageSquare,
  Settings,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { AITutorChat } from "./ai-tutor-chat"
import { NotesViewer } from "./notes-viewer"
import { VideoPlayer } from "./video-player"
import { PracticeQuestions } from "./practice-questions"
import { Badge } from "@/components/ui/badge"

interface LearningInterfaceProps {
  courseId: string
  topicId: string
  chapterId: string
}

const mockChapter = {
  id: "2-2",
  title: "Logistic Regression",
  topic: "Supervised Learning",
  course: "Introduction to Machine Learning",
  hasNotes: true,
  hasVideo: true,
  hasPractice: true,
  tutorName: "Supervised Learning Tutor",
}

export function LearningInterface({ courseId, topicId, chapterId }: LearningInterfaceProps) {
  const [layout, setLayout] = useState<"split" | "tutor-only" | "content-only">("split")
  const [activeTab, setActiveTab] = useState("notes")
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/student/courses/${courseId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-sm">{mockChapter.title}</h1>
            <p className="text-xs text-muted-foreground">
              {mockChapter.course} • {mockChapter.topic}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            {mockChapter.tutorName}
          </Badge>

          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={layout === "content-only" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setLayout("content-only")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "split" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setLayout("split")}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button
              variant={layout === "tutor-only" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setLayout("tutor-only")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Content Panel */}
        {layout !== "tutor-only" && (
          <div className={`${layout === "split" ? "w-1/2" : "flex-1"} border-r flex flex-col`}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="border-b px-4">
                <TabsList className="h-12">
                  {mockChapter.hasNotes && (
                    <TabsTrigger value="notes" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Notes
                    </TabsTrigger>
                  )}
                  {mockChapter.hasVideo && (
                    <TabsTrigger value="video" className="gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                  )}
                  {mockChapter.hasPractice && (
                    <TabsTrigger value="practice" className="gap-2">
                      <ClipboardList className="h-4 w-4" />
                      Practice
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <TabsContent value="notes" className="flex-1 m-0 overflow-hidden">
                <NotesViewer chapterId={chapterId} />
              </TabsContent>

              <TabsContent value="video" className="flex-1 m-0 overflow-hidden">
                <VideoPlayer chapterId={chapterId} />
              </TabsContent>

              <TabsContent value="practice" className="flex-1 m-0 overflow-hidden">
                <PracticeQuestions chapterId={chapterId} />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* AI Tutor Panel */}
        {layout !== "content-only" && (
          <div className={`${layout === "split" ? "w-1/2" : "flex-1"} flex flex-col`}>
            <AITutorChat chapterId={chapterId} tutorName={mockChapter.tutorName} />
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <footer className="border-t bg-card px-4 py-3 flex items-center justify-between">
        <Button variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Chapter
        </Button>
        <Button>
          Next Chapter
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </footer>
    </div>
  )
}
