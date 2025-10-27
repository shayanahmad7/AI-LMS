"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/ui/page-header"
import { BookOpen, MessageSquare, TrendingUp, Clock, CheckCircle2, AlertCircle, Bot, User } from "lucide-react"

interface StudentDetailViewProps {
  studentId: string
}

const mockStudent = {
  id: "1",
  name: "Alice Johnson",
  email: "alice@example.com",
  joinedDate: "Jan 15, 2024",
  lastActive: "2 hours ago",
  totalCourses: 3,
  completedCourses: 1,
  avgProgress: 85,
  totalTimeSpent: "42h 30m",
  aiInteractions: 234,
}

const mockCourseProgress = [
  {
    id: "1",
    name: "Introduction to Machine Learning",
    progress: 100,
    status: "completed",
    timeSpent: "18h 45m",
    lastAccessed: "3 days ago",
    topicsCompleted: 12,
    totalTopics: 12,
  },
  {
    id: "2",
    name: "Advanced Python Programming",
    progress: 85,
    status: "in-progress",
    timeSpent: "15h 20m",
    lastAccessed: "2 hours ago",
    topicsCompleted: 10,
    totalTopics: 12,
  },
  {
    id: "3",
    name: "Data Structures & Algorithms",
    progress: 70,
    status: "in-progress",
    timeSpent: "8h 25m",
    lastAccessed: "1 day ago",
    topicsCompleted: 7,
    totalTopics: 10,
  },
]

const mockAIChats = [
  {
    id: "1",
    course: "Advanced Python Programming",
    topic: "Decorators and Generators",
    timestamp: "2 hours ago",
    messages: [
      { role: "student", content: "Can you explain how decorators work in Python?" },
      {
        role: "tutor",
        content:
          "Decorators are a powerful feature in Python that allow you to modify or enhance functions without changing their source code. They use the @ symbol and are placed above function definitions.",
      },
      { role: "student", content: "Can you show me an example?" },
      {
        role: "tutor",
        content:
          "Here's a simple example:\n\n```python\ndef my_decorator(func):\n    def wrapper():\n        print('Before function')\n        func()\n        print('After function')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Hello!')\n```",
      },
      { role: "student", content: "That makes sense! What about generators?" },
      {
        role: "tutor",
        content:
          "Generators are functions that use the yield keyword instead of return. They allow you to iterate over a sequence of values without storing them all in memory at once.",
      },
    ],
    sentiment: "positive",
    duration: "12 minutes",
  },
  {
    id: "2",
    course: "Data Structures & Algorithms",
    topic: "Binary Search Trees",
    timestamp: "1 day ago",
    messages: [
      { role: "student", content: "I'm confused about BST insertion. Can you help?" },
      {
        role: "tutor",
        content:
          "Of course! BST insertion follows a simple rule: if the value is less than the current node, go left; if greater, go right. Continue until you find an empty spot.",
      },
      { role: "student", content: "What if the value already exists?" },
      {
        role: "tutor",
        content:
          "Good question! Typically, BSTs don't allow duplicate values. You can either ignore the insertion or increment a counter if you need to track duplicates.",
      },
    ],
    sentiment: "neutral",
    duration: "8 minutes",
  },
  {
    id: "3",
    course: "Advanced Python Programming",
    topic: "Async/Await",
    timestamp: "2 days ago",
    messages: [
      { role: "student", content: "When should I use async/await?" },
      {
        role: "tutor",
        content:
          "Async/await is great for I/O-bound operations like network requests, file operations, or database queries. It allows your program to do other work while waiting for these operations to complete.",
      },
      { role: "student", content: "Is it the same as multithreading?" },
      {
        role: "tutor",
        content:
          "Not quite! Async/await uses cooperative multitasking (one thread), while multithreading uses multiple threads. Async is often more efficient for I/O-bound tasks.",
      },
    ],
    sentiment: "positive",
    duration: "15 minutes",
  },
]

export function StudentDetailView({ studentId }: StudentDetailViewProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <PageHeader
            title=""
            showBack
            backHref="/teacher"
            breadcrumbs={[
              { label: "Dashboard", href: "/teacher" },
              { label: "Analytics" },
              { label: mockStudent.name },
            ]}
          />
          <div className="flex items-center gap-4 mt-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {mockStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{mockStudent.name}</h1>
              <p className="text-sm text-muted-foreground">{mockStudent.email}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground">Joined {mockStudent.joinedDate}</span>
                <span className="text-xs text-muted-foreground">Last active {mockStudent.lastActive}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudent.avgProgress}%</div>
              <Progress value={mockStudent.avgProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStudent.completedCourses}/{mockStudent.totalCourses}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudent.totalTimeSpent}</div>
              <p className="text-xs text-muted-foreground">Total learning time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudent.aiInteractions}</div>
              <p className="text-xs text-muted-foreground">Total messages</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Course Progress</TabsTrigger>
            <TabsTrigger value="ai-chats">AI Chat History</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress Details</CardTitle>
                <CardDescription>Detailed breakdown of student progress across all enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourseProgress.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(course.status)}`} />
                              <div>
                                <h4 className="font-semibold">{course.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {course.topicsCompleted} of {course.totalTopics} topics completed
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">{course.progress}%</div>
                              <p className="text-xs text-muted-foreground">{course.timeSpent}</p>
                            </div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Last accessed: {course.lastAccessed}</span>
                            <Badge variant={course.status === "completed" ? "default" : "secondary"}>
                              {course.status === "completed" ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  In Progress
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-chats" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent AI Conversations</CardTitle>
                  <CardDescription>View all AI tutor interactions with this student</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {mockAIChats.map((chat) => (
                        <Card
                          key={chat.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedChat === chat.id ? "ring-2 ring-blue-500" : ""
                          }`}
                          onClick={() => setSelectedChat(chat.id)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-sm">{chat.course}</h4>
                                  <p className="text-xs text-muted-foreground">{chat.topic}</p>
                                </div>
                                <Badge variant="outline" className={getSentimentColor(chat.sentiment)}>
                                  {chat.sentiment}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {chat.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {chat.messages.length} messages
                                </span>
                                <span>{chat.timestamp}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversation Details</CardTitle>
                  <CardDescription>
                    {selectedChat ? "Full conversation transcript" : "Select a conversation to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedChat ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-4">
                        {mockAIChats
                          .find((chat) => chat.id === selectedChat)
                          ?.messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex gap-3 ${message.role === "student" ? "justify-end" : "justify-start"}`}
                            >
                              {message.role === "tutor" && (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-purple-600 text-white">
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`rounded-lg p-3 max-w-[80%] ${
                                  message.role === "student" ? "bg-blue-600 text-white" : "bg-muted"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold">
                                    {message.role === "student" ? "Student" : "AI Tutor"}
                                  </span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                              {message.role === "student" && (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-blue-600 text-white">
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select a conversation from the list to view the full chat history</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
