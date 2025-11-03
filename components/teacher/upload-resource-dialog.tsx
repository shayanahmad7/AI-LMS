"use client";

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, ClipboardList, Upload, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UploadResourceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadResourceDialog({ open, onOpenChange }: UploadResourceDialogProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("[v0] Uploading resources:", { selectedCourse, selectedTopic, files: uploadedFiles })
    onOpenChange(false)
    setUploadedFiles([])
    setSelectedCourse("")
    setSelectedTopic("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
          <DialogDescription>Add notes, videos, or practice questions to your courses</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ml">Introduction to Machine Learning</SelectItem>
                  <SelectItem value="calculus">Advanced Calculus</SelectItem>
                  <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="topic">Topic</Label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intro">Introduction</SelectItem>
                  <SelectItem value="supervised">Supervised Learning</SelectItem>
                  <SelectItem value="neural">Neural Networks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="notes">
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
              <div>
                <Label htmlFor="notes-title">Title</Label>
                <Input id="notes-title" placeholder="e.g., Chapter 1 Lecture Notes" />
              </div>

              <div>
                <Label htmlFor="notes-description">Description (Optional)</Label>
                <Textarea id="notes-description" placeholder="Brief description" rows={3} />
              </div>

              <div>
                <Label>Upload Files</Label>
                <div className="mt-2">
                  <label htmlFor="notes-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
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
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div>
                <Label htmlFor="video-title">Title</Label>
                <Input id="video-title" placeholder="e.g., Introduction Video" />
              </div>

              <div>
                <Label htmlFor="video-url">Video URL</Label>
                <Input id="video-url" placeholder="YouTube, Vimeo, or direct link" />
              </div>

              <div>
                <Label htmlFor="video-description">Description (Optional)</Label>
                <Textarea id="video-description" placeholder="Brief description" rows={3} />
              </div>

              <div className="text-center text-sm text-muted-foreground">or</div>

              <div>
                <Label>Upload Video File</Label>
                <div className="mt-2">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload video file</p>
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
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <div>
                <Label htmlFor="questions-title">Question Set Title</Label>
                <Input id="questions-title" placeholder="e.g., Practice Problems Set 1" />
              </div>

              <div>
                <Label htmlFor="questions-description">Description (Optional)</Label>
                <Textarea id="questions-description" placeholder="Brief description" rows={3} />
              </div>

              <div>
                <Label>Upload Question Bank</Label>
                <div className="mt-2">
                  <label htmlFor="questions-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload CSV or JSON file</p>
                      <p className="text-xs text-muted-foreground mt-1">Or create questions manually after upload</p>
                    </div>
                    <Input
                      id="questions-upload"
                      type="file"
                      className="hidden"
                      accept=".csv,.json"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Upload Resource</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
