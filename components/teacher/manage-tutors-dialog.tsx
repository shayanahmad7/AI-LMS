"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Plus, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

const mockTutors = [
  {
    id: "1",
    name: "Chapter 1 Tutor",
    description: "Helps with introduction concepts",
    interactions: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Advanced Concepts Guide",
    description: "Assists with complex topics",
    interactions: 32,
    status: "active",
  },
]

interface ManageTutorsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicId: string | null
}

export function ManageTutorsDialog({ open, onOpenChange, topicId }: ManageTutorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage AI Tutors</DialogTitle>
          <DialogDescription>Create and configure AI tutors for this topic</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Link href="/teacher/tutors/create">
              <Button onClick={() => onOpenChange(false)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Tutor
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {mockTutors.map((tutor) => (
              <Card key={tutor.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{tutor.name}</CardTitle>
                        <CardDescription>{tutor.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{tutor.interactions} interactions</Badge>
                          <Badge variant="default">{tutor.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/teacher/tutors/${tutor.id}`}>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
