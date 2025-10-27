"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, TrendingUp, Search, Award, LogOut, Pencil } from "lucide-react"
import Link from "next/link"

const mockCourses = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    progress: 65,
    nextTopic: "Neural Networks",
    totalTopics: 12,
    completedTopics: 8,
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Advanced Calculus",
    progress: 40,
    nextTopic: "Multivariable Integration",
    totalTopics: 15,
    completedTopics: 6,
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    progress: 85,
    nextTopic: "Graph Algorithms",
    totalTopics: 18,
    completedTopics: 15,
    lastAccessed: "3 hours ago",
  },
]

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Learning</h1>
              <p className="text-sm text-muted-foreground">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/student/practice">
                <Button variant="outline">
                  <Pencil className="w-4 h-4 mr-2" />
                  Interactive Practice
                </Button>
              </Link>
              <Link href="/student/browse">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </Link>
              <Link href="/student/certificates">
                <Button variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Certificates
                </Button>
              </Link>
              <Link href="/student/profile">
                <Button variant="outline">View Profile</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29</div>
              <p className="text-xs text-muted-foreground">Out of 45 total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63%</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">My Courses</h2>
          </div>

          <div className="grid gap-4">
            {mockCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.completedTopics} of {course.totalTopics} topics completed • Last accessed{" "}
                        {course.lastAccessed}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next: </span>
                      <span className="font-medium">{course.nextTopic}</span>
                    </div>
                    <Link href={`/student/courses/${course.id}`}>
                      <Button>Continue Learning</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
