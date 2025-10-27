"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Bot, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockCourses = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and applications",
    topics: 12,
    students: 45,
    tutors: 8,
    status: "active",
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Deep dive into multivariable calculus and differential equations",
    topics: 15,
    students: 32,
    tutors: 10,
    status: "active",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Master essential programming concepts and problem-solving",
    topics: 18,
    students: 67,
    tutors: 12,
    status: "active",
  },
  {
    id: "4",
    title: "Quantum Physics",
    description: "Explore the fascinating world of quantum mechanics",
    topics: 10,
    students: 28,
    tutors: 6,
    status: "draft",
  },
]

export function CourseList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <p className="text-sm text-muted-foreground">Manage and organize your course content</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge variant={course.status === "active" ? "default" : "secondary"} className="w-fit">
                {course.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.topics} topics</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bot className="h-4 w-4" />
                  <span>{course.tutors} tutors</span>
                </div>
              </div>
              <Link href={`/teacher/courses/${course.id}`}>
                <Button className="w-full bg-transparent" variant="outline">
                  Manage Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
