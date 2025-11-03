"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Video,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Clock,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const mockPracticeSessions = [
  {
    id: "1",
    studentName: "Sarah Johnson",
    studentId: "s001",
    type: "practice",
    course: "Advanced Calculus",
    topic: "Integration Techniques",
    score: 92,
    duration: "45 min",
    date: "2 hours ago",
    status: "completed",
    questionsAttempted: 5,
    questionsCorrect: 5,
    explanationQuality: "excellent",
  },
  {
    id: "2",
    studentName: "Michael Chen",
    studentId: "s002",
    type: "test",
    course: "Machine Learning",
    topic: "Neural Networks",
    score: 78,
    duration: "90 min",
    date: "5 hours ago",
    status: "completed",
    questionsAttempted: 15,
    questionsCorrect: 12,
    explanationQuality: "good",
  },
  {
    id: "3",
    studentName: "Emily Rodriguez",
    studentId: "s003",
    type: "interview",
    course: "Data Structures",
    topic: "Graph Algorithms",
    score: 85,
    duration: "60 min",
    date: "1 day ago",
    status: "completed",
    questionsAttempted: 8,
    questionsCorrect: 7,
    explanationQuality: "excellent",
  },
  {
    id: "4",
    studentName: "David Kim",
    studentId: "s004",
    type: "practice",
    course: "Advanced Calculus",
    topic: "Differential Equations",
    score: 65,
    duration: "30 min",
    date: "1 day ago",
    status: "completed",
    questionsAttempted: 4,
    questionsCorrect: 3,
    explanationQuality: "needs improvement",
  },
]

const mockStudentStats = [
  {
    studentId: "s001",
    studentName: "Sarah Johnson",
    totalSessions: 24,
    avgScore: 89,
    totalTime: "18.5h",
    improvement: "+12%",
    lastActive: "2 hours ago",
  },
  {
    studentId: "s002",
    studentName: "Michael Chen",
    totalSessions: 18,
    avgScore: 82,
    totalTime: "14.2h",
    improvement: "+8%",
    lastActive: "5 hours ago",
  },
  {
    studentId: "s003",
    studentName: "Emily Rodriguez",
    totalSessions: 31,
    avgScore: 91,
    totalTime: "22.8h",
    improvement: "+15%",
    lastActive: "1 day ago",
  },
  {
    studentId: "s004",
    studentName: "David Kim",
    totalSessions: 12,
    avgScore: 74,
    totalTime: "9.3h",
    improvement: "-3%",
    lastActive: "1 day ago",
  },
]

export function PracticeMonitoring() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCourse, setFilterCourse] = useState("all")

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124h</div>
            <p className="text-xs text-muted-foreground">Total this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Practiced this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
          <TabsTrigger value="students">Student Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Recent Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by student name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Session Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="calculus">Advanced Calculus</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="ds">Data Structures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <div className="grid gap-4">
            {mockPracticeSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{session.studentName}</CardTitle>
                        <Badge
                          variant={
                            session.type === "practice" ? "secondary" : session.type === "test" ? "default" : "outline"
                          }
                        >
                          {session.type}
                        </Badge>
                        {session.score >= 85 && (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Excellent
                          </Badge>
                        )}
                        {session.score >= 70 && session.score < 85 && <Badge variant="secondary">Good</Badge>}
                        {session.score < 70 && (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Needs Review
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {session.course} • {session.topic} • {session.duration} • {session.date}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{session.score}%</div>
                      <div className="text-xs text-muted-foreground">
                        {session.questionsCorrect}/{session.questionsAttempted} correct
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Explanation:</span>
                        <span className="font-medium capitalize">{session.explanationQuality}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/teacher/practice/session/${session.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Student Overview Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Practice Statistics</CardTitle>
              <CardDescription>Overview of all student practice activity and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudentStats.map((student) => (
                  <Card key={student.studentId} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{student.studentName}</CardTitle>
                          <CardDescription>
                            {student.totalSessions} sessions • {student.totalTime} total time • Last active{" "}
                            {student.lastActive}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{student.avgScore}%</div>
                          <div
                            className={`text-sm font-medium ${
                              student.improvement.startsWith("+") ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {student.improvement.startsWith("+") ? (
                              <TrendingUp className="w-4 h-4 inline mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 inline mr-1" />
                            )}
                            {student.improvement}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/teacher/students/${student.studentId}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Patterns and recommendations based on student practice data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-green-600 mb-2">Strong Performance Areas</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Integration techniques showing 92% average success rate</li>
                    <li>Students explaining concepts clearly in 85% of sessions</li>
                    <li>Graph algorithms practice sessions up 40% this month</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h3 className="font-semibold text-orange-600 mb-2">Areas Needing Attention</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Differential equations showing 68% average - consider additional resources</li>
                    <li>4 students showing declining performance trends - may need intervention</li>
                    <li>Test mode scores 12% lower than practice mode - test anxiety possible</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-blue-600 mb-2">Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Schedule review sessions for differential equations</li>
                    <li>Reach out to students with declining trends for one-on-one support</li>
                    <li>Consider adding more practice problems for challenging topics</li>
                    <li>Implement test preparation strategies to reduce anxiety</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-purple-600 mb-2">Engagement Patterns</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Peak practice times: 6-8 PM weekdays, 2-5 PM weekends</li>
                    <li>Average session length: 42 minutes (optimal range)</li>
                    <li>Interview mode showing highest engagement and retention</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
