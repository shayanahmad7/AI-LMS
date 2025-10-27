"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp, Clock } from "lucide-react"

const mockCourseData = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    students: 67,
    avgProgress: 72,
    completionRate: 84,
    avgTimeSpent: "24.5h",
    topicsCompleted: 456,
    totalTopics: 804,
    trend: "+8%",
  },
  {
    id: "2",
    title: "Advanced Calculus",
    students: 32,
    avgProgress: 65,
    completionRate: 78,
    avgTimeSpent: "18.2h",
    topicsCompleted: 192,
    totalTopics: 480,
    trend: "+5%",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    students: 45,
    avgProgress: 58,
    completionRate: 71,
    avgTimeSpent: "21.8h",
    topicsCompleted: 486,
    totalTopics: 810,
    trend: "+12%",
  },
]

export function CourseAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Performance Overview</CardTitle>
          <CardDescription>Detailed analytics for each course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockCourseData.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.topicsCompleted} of {course.totalTopics} topics completed by students
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {course.trend}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Students</span>
                      </div>
                      <p className="text-2xl font-bold">{course.students}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Avg. Progress</span>
                      </div>
                      <p className="text-2xl font-bold">{course.avgProgress}%</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>Completion Rate</span>
                      </div>
                      <p className="text-2xl font-bold">{course.completionRate}%</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Avg. Time Spent</span>
                      </div>
                      <p className="text-2xl font-bold">{course.avgTimeSpent}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{course.avgProgress}%</span>
                    </div>
                    <Progress value={course.avgProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
