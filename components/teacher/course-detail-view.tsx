"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, GripVertical, Edit, Trash2, Bot } from "lucide-react"
import Link from "next/link"
import { AddTopicDialog } from "./add-topic-dialog"
import { ManageTutorsDialog } from "./manage-tutors-dialog"
import { AddResourcesDialog } from "./add-resources-dialog"

const mockCourse = {
  id: "1",
  title: "Introduction to Machine Learning",
  description: "Learn the fundamentals of ML algorithms and applications",
  topics: [
    {
      id: "1",
      title: "Introduction to ML",
      description: "Overview of machine learning concepts",
      order: 1,
      tutorCount: 1,
      resourceCount: 5,
    },
    {
      id: "2",
      title: "Supervised Learning",
      description: "Classification and regression techniques",
      order: 2,
      tutorCount: 2,
      resourceCount: 8,
    },
    {
      id: "3",
      title: "Neural Networks",
      description: "Deep learning fundamentals",
      order: 3,
      tutorCount: 3,
      resourceCount: 12,
    },
  ],
}

interface CourseDetailViewProps {
  courseId: string
}

export function CourseDetailView({ courseId }: CourseDetailViewProps) {
  const [addTopicOpen, setAddTopicOpen] = useState(false)
  const [manageTutorsOpen, setManageTutorsOpen] = useState(false)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [addResourcesOpen, setAddResourcesOpen] = useState(false)

  const handleManageTutors = (topicId: string) => {
    setSelectedTopicId(topicId)
    setManageTutorsOpen(true)
  }

  const handleAddResources = (topicId: string) => {
    setSelectedTopicId(topicId)
    setAddResourcesOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={mockCourse.title}
        description={mockCourse.description}
        showBack
        backHref="/teacher"
        breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "Courses" }, { label: mockCourse.title }]}
        actions={
          <Button onClick={() => setAddTopicOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Topic
          </Button>
        }
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="topics">
          <TabsList>
            <TabsTrigger value="topics">Topics & Structure</TabsTrigger>
            <TabsTrigger value="settings">Course Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-4 mt-6">
            <div className="space-y-3">
              {mockCourse.topics.map((topic, index) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Button variant="ghost" size="icon" className="cursor-grab">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Topic {topic.order}</Badge>
                              <CardTitle className="text-lg">{topic.title}</CardTitle>
                            </div>
                            <CardDescription className="mt-1">{topic.description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <Badge variant="secondary">
                            <Bot className="w-3 h-3 mr-1" />
                            {topic.tutorCount} AI Tutors
                          </Badge>
                          <Badge variant="secondary">{topic.resourceCount} Resources</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleManageTutors(topic.id)}>
                        Manage AI Tutors
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAddResources(topic.id)}>
                        Add Resources
                      </Button>
                      <Link href={`/student/learn/${courseId}/${topic.id}/1`}>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>Manage course details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AddTopicDialog open={addTopicOpen} onOpenChange={setAddTopicOpen} />
      <ManageTutorsDialog open={manageTutorsOpen} onOpenChange={setManageTutorsOpen} topicId={selectedTopicId} />
      <AddResourcesDialog open={addResourcesOpen} onOpenChange={setAddResourcesOpen} topicId={selectedTopicId} />
    </div>
  )
}
