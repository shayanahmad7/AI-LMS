"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown, Minus, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const mockStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    courses: 3,
    avgProgress: 85,
    trend: "up",
    lastActive: "2 hours ago",
    completedTopics: 28,
    totalTopics: 33,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    courses: 2,
    avgProgress: 72,
    trend: "up",
    lastActive: "5 hours ago",
    completedTopics: 18,
    totalTopics: 25,
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    courses: 4,
    avgProgress: 45,
    trend: "down",
    lastActive: "1 day ago",
    completedTopics: 22,
    totalTopics: 49,
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    courses: 3,
    avgProgress: 91,
    trend: "up",
    lastActive: "1 hour ago",
    completedTopics: 31,
    totalTopics: 34,
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    courses: 2,
    avgProgress: 58,
    trend: "stable",
    lastActive: "3 hours ago",
    completedTopics: 15,
    totalTopics: 26,
  },
]

export function StudentProgressView() {
  const [searchQuery, setSearchQuery] = useState("")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>Track individual student performance across all courses</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(student.trend)}
                          <span className="text-2xl font-bold">{student.avgProgress}%</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {student.completedTopics} of {student.totalTopics} topics completed
                          </span>
                          <span className="text-muted-foreground">Last active: {student.lastActive}</span>
                        </div>
                        <Progress value={student.avgProgress} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{student.courses} courses</Badge>
                        <Link href={`/teacher/students/${student.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
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
