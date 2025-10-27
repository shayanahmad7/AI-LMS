"use client"
import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, ClipboardList, Plus, Download, Trash2 } from "lucide-react"
import { UploadResourceDialog } from "./upload-resource-dialog"

const mockResources = {
  notes: [
    {
      id: "1",
      name: "Linear Algebra Lecture Notes.pdf",
      course: "Advanced Calculus",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Neural Networks Overview.pdf",
      course: "Machine Learning",
      size: "1.8 MB",
      uploadedAt: "2024-01-14",
    },
    { id: "3", name: "Sorting Algorithms Guide.pdf", course: "DSA", size: "3.2 MB", uploadedAt: "2024-01-13" },
  ],
  videos: [
    {
      id: "1",
      name: "Introduction to Matrices",
      course: "Advanced Calculus",
      duration: "15:30",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Backpropagation Explained",
      course: "Machine Learning",
      duration: "22:45",
      uploadedAt: "2024-01-14",
    },
  ],
  questions: [
    {
      id: "1",
      name: "Linear Algebra Practice Set 1",
      course: "Advanced Calculus",
      count: 15,
      uploadedAt: "2024-01-15",
    },
    { id: "2", name: "ML Algorithms Quiz", course: "Machine Learning", count: 20, uploadedAt: "2024-01-14" },
  ],
}

export function ResourceManager() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resources</h2>
          <p className="text-sm text-muted-foreground">Upload and manage course materials</p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <Tabs defaultValue="notes">
        <TabsList>
          <TabsTrigger value="notes">
            <FileText className="w-4 h-4 mr-2" />
            Notes & Slides
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="questions">
            <ClipboardList className="w-4 h-4 mr-2" />
            Practice Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4">
          {mockResources.notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{note.name}</CardTitle>
                      <CardDescription>
                        {note.course} • {note.size} • Uploaded {note.uploadedAt}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {mockResources.videos.map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{video.name}</CardTitle>
                      <CardDescription>
                        {video.course} • {video.duration} • Uploaded {video.uploadedAt}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          {mockResources.questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{question.name}</CardTitle>
                      <CardDescription>
                        {question.course} • {question.count} questions • Uploaded {question.uploadedAt}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <UploadResourceDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
    </div>
  )
}
