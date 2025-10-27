"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, ClipboardList, Upload, Plus, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AddResourcesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicId: string | null
}

export function AddResourcesDialog({ open, onOpenChange, topicId }: AddResourcesDialogProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Handle resource upload
    console.log("[v0] Uploading resources for topic:", topicId)
    onOpenChange(false)
    setUploadedFiles([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Resources</DialogTitle>
          <DialogDescription>Upload notes, videos, and practice questions for this topic</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notes" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">
              <FileText className="w-4 h-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="questions">
              <ClipboardList className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes-title">Title</Label>
                <Input id="notes-title" placeholder="e.g., Chapter 1 Lecture Notes" />
              </div>

              <div>
                <Label htmlFor="notes-description">Description (Optional)</Label>
                <Textarea id="notes-description" placeholder="Brief description of the notes" />
              </div>

              <div>
                <Label>Upload Files</Label>
                <div className="mt-2">
                  <label htmlFor="notes-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX (max 50MB)</p>
                    </div>
                    <Input
                      id="notes-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.pptx"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  {uploadedFiles.map((file, index) => (
                    <Card key={index}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="video-title">Title</Label>
                <Input id="video-title" placeholder="e.g., Introduction to Linear Algebra" />
              </div>

              <div>
                <Label htmlFor="video-url">Video URL or Upload</Label>
                <Input id="video-url" placeholder="YouTube, Vimeo, or upload file" />
              </div>

              <div>
                <Label htmlFor="video-description">Description (Optional)</Label>
                <Textarea id="video-description" placeholder="Brief description of the video" />
              </div>

              <div>
                <Label>Upload Video File</Label>
                <div className="mt-2">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI (max 500MB)</p>
                    </div>
                    <Input
                      id="video-upload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="questions-title">Question Set Title</Label>
                <Input id="questions-title" placeholder="e.g., Chapter 1 Practice Problems" />
              </div>

              <div>
                <Label htmlFor="questions-description">Description (Optional)</Label>
                <Textarea id="questions-description" placeholder="Brief description of the question set" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Question Bank
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Questions Manually
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Upload a CSV or JSON file with questions, or create them manually using our question builder
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Resources</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
