"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Video,
  MessageSquare,
  ClipboardList,
  Pencil,
  Play,
} from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mockCourse = {
  id: "1",
  title: "Introduction to Machine Learning",
  progress: 65,
  topics: [
    {
      id: "1",
      title: "Introduction to ML",
      status: "completed",
      chapters: [
        { id: "1-1", title: "What is Machine Learning?", status: "completed", hasNotes: true, hasVideo: true },
        { id: "1-2", title: "Types of ML", status: "completed", hasNotes: true, hasVideo: true },
        { id: "1-3", title: "ML Applications", status: "completed", hasNotes: true, hasVideo: false },
      ],
    },
    {
      id: "2",
      title: "Supervised Learning",
      status: "in-progress",
      chapters: [
        { id: "2-1", title: "Linear Regression", status: "completed", hasNotes: true, hasVideo: true },
        { id: "2-2", title: "Logistic Regression", status: "in-progress", hasNotes: true, hasVideo: true },
        { id: "2-3", title: "Decision Trees", status: "locked", hasNotes: true, hasVideo: true },
      ],
    },
    {
      id: "3",
      title: "Neural Networks",
      status: "locked",
      chapters: [
        { id: "3-1", title: "Perceptrons", status: "locked", hasNotes: true, hasVideo: true },
        { id: "3-2", title: "Backpropagation", status: "locked", hasNotes: true, hasVideo: true },
        { id: "3-3", title: "Deep Learning", status: "locked", hasNotes: true, hasVideo: true },
      ],
    },
  ],
}

interface CourseTopicViewProps {
  courseId: string
}

export function CourseTopicView({ courseId }: CourseTopicViewProps) {
  const [openTopics, setOpenTopics] = useState<string[]>(["2"])

  const toggleTopic = (topicId: string) => {
    setOpenTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Circle className="h-4 w-4 text-blue-600 fill-blue-600" />
      case "locked":
        return <Lock className="h-4 w-4 text-muted-foreground" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{mockCourse.title}</h1>
              <div className="flex items-center gap-4 mt-1">
                <Progress value={mockCourse.progress} className="h-2 w-48" />
                <span className="text-sm text-muted-foreground">{mockCourse.progress}% complete</span>
              </div>
            </div>
            <Link href="/student/practice">
              <Button variant="outline">
                <Pencil className="w-4 h-4 mr-2" />
                Practice Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar with topic navigation */}
        <aside className="w-80 border-r bg-card">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              <h2 className="font-semibold mb-4">Course Content</h2>
              {mockCourse.topics.map((topic) => (
                <Collapsible
                  key={topic.id}
                  open={openTopics.includes(topic.id)}
                  onOpenChange={() => toggleTopic(topic.id)}
                >
                  <Card className={topic.status === "in-progress" ? "border-blue-500" : ""}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2">
                          {openTopics.includes(topic.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          {getStatusIcon(topic.status)}
                          <div className="flex-1">
                            <CardTitle className="text-sm">{topic.title}</CardTitle>
                          </div>
                          <Badge variant={topic.status === "completed" ? "default" : "secondary"} className="text-xs">
                            {topic.chapters.filter((c) => c.status === "completed").length}/{topic.chapters.length}
                          </Badge>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="p-0 pb-2">
                        <div className="space-y-1">
                          {topic.chapters.map((chapter) => (
                            <Link
                              key={chapter.id}
                              href={`/student/learn/${courseId}/${topic.id}/${chapter.id}`}
                              className={`block px-4 py-2 hover:bg-accent/50 transition-colors ${
                                chapter.status === "locked" ? "pointer-events-none opacity-50" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 ml-6">
                                {getStatusIcon(chapter.status)}
                                <span className="text-sm flex-1">{chapter.title}</span>
                                <div className="flex gap-1">
                                  {chapter.hasNotes && <BookOpen className="h-3 w-3 text-muted-foreground" />}
                                  {chapter.hasVideo && <Video className="h-3 w-3 text-muted-foreground" />}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Chapter to Begin</CardTitle>
                <CardDescription>
                  Choose a chapter from the sidebar to start learning with your AI tutor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle className="text-sm">AI Tutor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Get personalized help and explanations for each topic
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-3">
                      <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
                      <CardTitle className="text-sm">Study Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Access notes, slides, and video lectures</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <ClipboardList className="h-8 w-8 text-green-600 mb-2" />
                      <CardTitle className="text-sm">Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Test your knowledge with practice questions</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Pencil className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>Interactive Practice & Testing</CardTitle>
                    <CardDescription>Practice with AI feedback, take tests, or do mock interviews</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Link href="/student/practice/session/new?mode=free" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/40">
                      <CardHeader>
                        <Pencil className="w-5 h-5 text-primary mb-2" />
                        <CardTitle className="text-sm">Free Practice</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Draw solutions and explain your thinking with live AI feedback
                        </p>
                        <Button size="sm" className="w-full">
                          <Play className="w-3 h-3 mr-2" />
                          Start Practice
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/student/practice" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-500/40">
                      <CardHeader>
                        <ClipboardList className="w-5 h-5 text-blue-500 mb-2" />
                        <CardTitle className="text-sm">Take a Test</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Proctored tests with screen recording and anti-cheating
                        </p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          View Tests
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/student/practice" className="block">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-purple-500/40">
                      <CardHeader>
                        <MessageSquare className="w-5 h-5 text-purple-500 mb-2" />
                        <CardTitle className="text-sm">AI Interview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Live AI interviewer with follow-up questions
                        </p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Start Interview
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
