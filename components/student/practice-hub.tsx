"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/ui/page-header"
import { Pencil, Video, MessageSquare, Clock, CheckCircle2, TrendingUp, Lock, Play, History } from "lucide-react"
import Link from "next/link"

const mockPracticeSessions = [
  {
    id: "1",
    title: "Calculus Problem Set 3",
    type: "practice",
    course: "Advanced Calculus",
    duration: "45 min",
    completed: true,
    score: 85,
    date: "2 days ago",
  },
  {
    id: "2",
    title: "ML Algorithm Explanation",
    type: "practice",
    course: "Machine Learning",
    duration: "30 min",
    completed: true,
    score: 92,
    date: "1 week ago",
  },
]

const mockTests = [
  {
    id: "1",
    title: "Midterm Exam - Calculus",
    type: "test",
    course: "Advanced Calculus",
    duration: "90 min",
    status: "scheduled",
    date: "Tomorrow, 2:00 PM",
    questions: 15,
  },
  {
    id: "2",
    title: "Final Assessment - ML",
    type: "test",
    course: "Machine Learning",
    duration: "120 min",
    status: "available",
    date: "Available now",
    questions: 20,
  },
]

const mockInterviews = [
  {
    id: "1",
    title: "Data Structures Interview",
    type: "interview",
    course: "Data Structures & Algorithms",
    duration: "60 min",
    status: "available",
    difficulty: "Advanced",
  },
]

export function PracticeHub() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Interactive Practice & Testing"
        description="Practice with AI feedback, take tests, and ace your interviews"
        showBack
        backHref="/student"
        breadcrumbs={[{ label: "Dashboard", href: "/student" }, { label: "Practice" }]}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Average score: 87%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+15%</div>
              <p className="text-xs text-muted-foreground">From last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="practice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="practice">Practice Mode</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          {/* Practice Mode Tab */}
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Start New Practice Session</CardTitle>
                <CardDescription>
                  Practice with live AI feedback. Draw your solutions and explain your thinking out loud.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Pencil className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">Free Practice</CardTitle>
                      </div>
                      <CardDescription>Open canvas to practice any topic with AI guidance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/student/practice/session/new?mode=free">
                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Start Free Practice
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-500/20 hover:border-blue-500/40 transition-colors bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        </div>
                        <CardTitle className="text-lg">Guided Practice</CardTitle>
                      </div>
                      <CardDescription>AI tutor actively oversees your session and provides real-time guidance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">AI Tutor Active</div>
                          <div className="text-xs">Live monitoring and feedback</div>
                        </div>
                      </div>
                      <Link href="/student/practice/session/new?mode=guided">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                          <Play className="w-4 h-4 mr-2" />
                          Start Live Practice Session
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Recent Practice Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Practice Sessions</h2>
                <Button variant="ghost" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="grid gap-4">
                {mockPracticeSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription>
                            {session.course} • {session.duration} • {session.date}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Score: {session.score}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Link href={`/student/practice/results/${session.id}`}>
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            View Recording
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          View Feedback
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Available Tests</CardTitle>
                <CardDescription>Take proctored tests with screen recording and anti-cheating measures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockTests.map((test) => (
                    <Card key={test.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{test.title}</CardTitle>
                              {test.status === "scheduled" && <Badge variant="outline">Scheduled</Badge>}
                              {test.status === "available" && <Badge className="bg-green-500">Available Now</Badge>}
                            </div>
                            <CardDescription>
                              {test.course} • {test.questions} questions • {test.duration}
                            </CardDescription>
                          </div>
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">{test.date}</div>
                          {test.status === "available" && (
                            <Link href={`/student/practice/test/${test.id}`}>
                              <Button>
                                <Play className="w-4 h-4 mr-2" />
                                Start Test
                              </Button>
                            </Link>
                          )}
                          {test.status === "scheduled" && <Button disabled>Starts {test.date}</Button>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Interview Practice</CardTitle>
                <CardDescription>
                  Practice with live AI interviewer that asks follow-up questions and evaluates your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockInterviews.map((interview) => (
                    <Card key={interview.id} className="border-2 border-purple-500/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{interview.title}</CardTitle>
                              <Badge variant="outline" className="border-purple-500 text-purple-500">
                                {interview.difficulty}
                              </Badge>
                            </div>
                            <CardDescription>
                              {interview.course} • {interview.duration} • Live AI interaction
                            </CardDescription>
                          </div>
                          <MessageSquare className="w-5 h-5 text-purple-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground">
                            The AI will ask you questions in real-time, evaluate your solutions, and ask follow-up
                            questions to test your understanding.
                          </div>
                          <Link href={`/student/practice/interview/${interview.id}`}>
                            <Button className="w-full">
                              <Play className="w-4 h-4 mr-2" />
                              Start Interview
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
