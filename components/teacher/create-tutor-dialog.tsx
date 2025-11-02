"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

interface CreateTutorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTutorDialog({ open, onOpenChange }: CreateTutorDialogProps) {
  const [name, setName] = useState("")
  const [instructions, setInstructions] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create AI Tutor</DialogTitle>
          <DialogDescription>
            Set up an AI tutor for a specific topic. Upload documents and provide instructions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="course">Course</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml">Introduction to Machine Learning</SelectItem>
                <SelectItem value="calc">Advanced Calculus</SelectItem>
                <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="topic1">Linear Transformations</SelectItem>
                <SelectItem value="topic2">Neural Networks</SelectItem>
                <SelectItem value="topic3">Sorting Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Tutor Name</Label>
            <Input
              id="name"
              placeholder="e.g., Linear Algebra Helper"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="documents">Upload Documents</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT (max 10MB)</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="instructions">AI Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Provide instructions for how the AI should tutor students on this topic..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Example: "You are a patient tutor helping students understand linear transformations. Use visual examples
              and step-by-step explanations."
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Tutor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
