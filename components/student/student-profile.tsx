"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Award, BookOpen, Clock, TrendingUp, Bell, Shield } from "lucide-react"
import Link from "next/link"

const mockProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "September 2024",
  coursesEnrolled: 3,
  coursesCompleted: 2,
  totalStudyTime: "124.5 hours",
  averageScore: 89,
  certificates: 2,
  streak: 12,
}

const mockTestHistory = [
  {
    id: "1",
    testName: "Supervised Learning Assessment",
    course: "Introduction to Machine Learning",
    date: "Jan 10, 2025",
    score: 92,
    passed: true,
  },
  {
    id: "2",
    testName: "Data Structures Midterm",
    course: "Data Structures & Algorithms",
    date: "Jan 5, 2025",
    score: 88,
    passed: true,
  },
  {
    id: "3",
    testName: "Calculus Quiz 3",
    course: "Advanced Calculus",
    date: "Dec 28, 2024",
    score: 76,
    passed: true,
  },
]

export function StudentProfile() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account and view your progress</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="text-2xl bg-blue-600 text-white">
                      {mockProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{mockProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{mockProfile.email}</p>
                  <Badge variant="secondary" className="mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    Joined {mockProfile.joinDate}
                  </Badge>
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Courses Enrolled</span>
                  </div>
                  <span className="font-bold">{mockProfile.coursesEnrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-bold">{mockProfile.coursesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Study Time</span>
                  </div>
                  <span className="font-bold">{mockProfile.totalStudyTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Avg Score</span>
                  </div>
                  <span className="font-bold">{mockProfile.averageScore}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tests">Test History</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{mockProfile.streak} days</div>
                      <p className="text-xs text-muted-foreground">Keep learning every day!</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{mockProfile.certificates}</div>
                      <Link href="/student/certificates">
                        <Button variant="link" className="p-0 h-auto text-xs">
                          View all certificates →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your learning activity over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="flex items-center gap-4">
                          <span className="text-sm font-medium w-12">{day}</span>
                          <Progress value={Math.random() * 100} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-16 text-right">
                            {Math.floor(Math.random() * 4)}h {Math.floor(Math.random() * 60)}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tests" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Test History</CardTitle>
                    <CardDescription>All your completed assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTestHistory.map((test) => (
                        <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{test.testName}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{test.course}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={test.passed ? "default" : "secondary"} className="text-xs">
                                {test.passed ? "Passed" : "Failed"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{test.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{test.score}%</div>
                            <Button variant="ghost" size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Certificates</CardTitle>
                    <CardDescription>Certificates earned from completed courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        You have {mockProfile.certificates} certificate(s)
                      </p>
                      <Link href="/student/certificates">
                        <Button>View All Certificates</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={mockProfile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={mockProfile.email} />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Email notifications</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Privacy settings</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
