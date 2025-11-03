"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, BookOpen, Clock, Users, Star } from "lucide-react"
import Link from "next/link"

const mockCourses = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning, from basic concepts to advanced algorithms",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    students: 1234,
    rating: 4.8,
    topics: 12,
    level: "Beginner",
    category: "AI & ML",
    enrolled: true,
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Master multivariable calculus, differential equations, and advanced mathematical concepts",
    instructor: "Prof. Michael Chen",
    duration: "10 weeks",
    students: 856,
    rating: 4.6,
    topics: 15,
    level: "Advanced",
    category: "Mathematics",
    enrolled: true,
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Comprehensive course on data structures, algorithms, and problem-solving techniques",
    instructor: "Dr. Emily Rodriguez",
    duration: "14 weeks",
    students: 2103,
    rating: 4.9,
    topics: 18,
    level: "Intermediate",
    category: "Computer Science",
    enrolled: true,
  },
  {
    id: "4",
    title: "Deep Learning Fundamentals",
    description: "Dive deep into neural networks, CNNs, RNNs, and modern deep learning architectures",
    instructor: "Dr. James Wilson",
    duration: "16 weeks",
    students: 945,
    rating: 4.7,
    topics: 20,
    level: "Advanced",
    category: "AI & ML",
    enrolled: false,
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    description: "Full-stack web development with React, Node.js, and modern web technologies",
    instructor: "Sarah Martinez",
    duration: "12 weeks",
    students: 3421,
    rating: 4.8,
    topics: 24,
    level: "Beginner",
    category: "Web Development",
    enrolled: false,
  },
]

export function CourseBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Browse Courses</h1>
              <p className="text-sm text-muted-foreground">Discover and enroll in new courses</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6" onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="AI & ML">AI & ML</TabsTrigger>
            <TabsTrigger value="Computer Science">Computer Science</TabsTrigger>
            <TabsTrigger value="Mathematics">Mathematics</TabsTrigger>
            <TabsTrigger value="Web Development">Web Dev</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4">
            <div className="grid gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{course.category}</Badge>
                          <Badge variant="secondary">{course.level}</Badge>
                          {course.enrolled && <Badge>Enrolled</Badge>}
                        </div>
                        <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                        <CardDescription className="text-base">{course.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.topics} topics</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      <div className="flex gap-2">
                        {course.enrolled ? (
                          <Link href={`/student/courses/${course.id}`}>
                            <Button>Continue Learning</Button>
                          </Link>
                        ) : (
                          <Button>Enroll Now</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
