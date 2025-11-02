"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Plus, Settings, MessageSquare } from "lucide-react"
import { CreateTutorDialog } from "./create-tutor-dialog"
import Link from "next/link"

const mockTutors = [
  {
    id: "1",
    name: "Linear Algebra Tutor",
    course: "Advanced Calculus",
    topic: "Linear Transformations",
    interactions: 234,
    status: "active",
  },
  {
    id: "2",
    name: "Neural Networks Guide",
    course: "Introduction to Machine Learning",
    topic: "Deep Learning Basics",
    interactions: 456,
    status: "active",
  },
  {
    id: "3",
    name: "Sorting Algorithms Helper",
    course: "Data Structures & Algorithms",
    topic: "Sorting & Searching",
    interactions: 189,
    status: "active",
  },
]

export function AITutorManager() {
  const [createTutorOpen, setCreateTutorOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Tutors</h2>
          <p className="text-sm text-muted-foreground">Create and manage AI tutors for each topic</p>
        </div>
        <Button onClick={() => setCreateTutorOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create AI Tutor
        </Button>
      </div>

      <div className="grid gap-4">
        {mockTutors.map((tutor) => (
          <Card key={tutor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{tutor.name}</CardTitle>
                    <CardDescription>
                      {tutor.course} • {tutor.topic}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {tutor.interactions} interactions
                      </Badge>
                      <Badge variant={tutor.status === "active" ? "default" : "secondary"}>{tutor.status}</Badge>
                    </div>
                  </div>
                </div>
                <Link href={`/teacher/tutors/${tutor.id}`}>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href={`/teacher/tutors/${tutor.id}`}>
                  <Button variant="outline" size="sm">
                    Edit Instructions
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  View Conversations
                </Button>
                <Link href={`/teacher/tutors/${tutor.id}`}>
                  <Button variant="outline" size="sm">
                    Test Tutor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTutorDialog open={createTutorOpen} onOpenChange={setCreateTutorOpen} />
    </div>
  )
}
