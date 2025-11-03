"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BookOpen, Bot, FileText, ClipboardList, LogOut, BarChart3, Pencil } from "lucide-react"
import { CourseList } from "./course-list"
import { CreateCourseDialog } from "./create-course-dialog"
import { AITutorManager } from "./ai-tutor-manager"
import { ResourceManager } from "./resource-manager"
import { TeacherAnalytics } from "./teacher-analytics"
import { PracticeMonitoring } from "./practice-monitoring"
import Link from "next/link"

export function TeacherDashboard() {
  const [createCourseOpen, setCreateCourseOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your courses and AI tutors</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setCreateCourseOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
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
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Tutors</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">4 per course average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Notes, videos, questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="ai-tutors">AI Tutors</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="practice">
              <Pencil className="w-4 h-4 mr-2" />
              Practice Monitoring
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <CourseList />
          </TabsContent>

          <TabsContent value="ai-tutors" className="space-y-4">
            <AITutorManager />
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <ResourceManager />
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <PracticeMonitoring />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <TeacherAnalytics />
          </TabsContent>
        </Tabs>
      </main>

      <CreateCourseDialog open={createCourseOpen} onOpenChange={setCreateCourseOpen} />
    </div>
  )
}
