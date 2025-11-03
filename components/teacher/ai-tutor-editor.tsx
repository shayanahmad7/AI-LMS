"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { PageHeader } from "@/components/ui/page-header"
import { Upload, FileText, X, Bot, Save, TestTube, Sparkles, Settings2, MessageSquare, Brain } from "lucide-react"

interface AITutorEditorProps {
  tutorId: string
}

const mockTutor = {
  id: "1",
  name: "Logistic Regression Tutor",
  course: "Introduction to Machine Learning",
  topic: "Supervised Learning",
  description: "Helps students understand logistic regression concepts",
  instructions:
    "You are a patient and encouraging AI tutor specializing in logistic regression. Your goal is to help students understand the mathematical foundations and practical applications of logistic regression. Use step-by-step explanations, visual analogies, and real-world examples. When students struggle, break down concepts into smaller pieces. Always encourage questions and provide positive reinforcement.",
  documents: [
    { id: "1", name: "Logistic_Regression_Lecture_Notes.pdf", size: "2.4 MB", uploadedAt: "2024-01-15" },
    { id: "2", name: "Sigmoid_Function_Explained.pdf", size: "1.2 MB", uploadedAt: "2024-01-15" },
    { id: "3", name: "ML_Textbook_Chapter_3.pdf", size: "5.8 MB", uploadedAt: "2024-01-14" },
  ],
  settings: {
    temperature: 0.7,
    maxTokens: 500,
    responseStyle: "detailed",
    allowHints: true,
    allowExamples: true,
    strictMode: false,
  },
}

export function AITutorEditor({ tutorId }: AITutorEditorProps) {
  const [tutor, setTutor] = useState(mockTutor)
  const [testMessage, setTestMessage] = useState("")
  const [testResponse, setTestResponse] = useState("")
  const [isTesting, setIsTesting] = useState(false)

  const handleTestTutor = () => {
    setIsTesting(true)
    setTimeout(() => {
      setTestResponse(
        "This is a simulated response from your AI tutor. In production, this would use the actual AI model with your configured settings and uploaded documents to generate contextual responses.",
      )
      setIsTesting(false)
    }, 1500)
  }

  const handleRemoveDocument = (docId: string) => {
    setTutor({
      ...tutor,
      documents: tutor.documents.filter((doc) => doc.id !== docId),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{tutor.name}</h1>
              <p className="text-sm text-muted-foreground">
                {tutor.course} • {tutor.topic}
              </p>
            </div>
          </div>
        }
        showBack
        backHref="/teacher"
        breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "AI Tutors" }, { label: tutor.name }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <TestTube className="w-4 h-4 mr-2" />
              Test Tutor
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        }
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents & Resources
            </TabsTrigger>
            <TabsTrigger value="instructions">
              <Brain className="w-4 h-4 mr-2" />
              AI Instructions
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings2 className="w-4 h-4 mr-2" />
              Advanced Settings
            </TabsTrigger>
            <TabsTrigger value="test">
              <MessageSquare className="w-4 h-4 mr-2" />
              Test & Preview
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Training Documents</CardTitle>
                <CardDescription>
                  Upload PDFs, DOCX, or TXT files that the AI tutor will use to answer student questions. The AI will
                  learn from these materials to provide accurate, contextual responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Click to upload or drag and drop</h3>
                  <p className="text-sm text-muted-foreground mb-1">PDF, DOCX, TXT, MD (max 10MB per file)</p>
                  <p className="text-xs text-muted-foreground">You can upload multiple files at once</p>
                  <Button className="mt-4 bg-transparent" variant="outline">
                    Browse Files
                  </Button>
                </div>

                {tutor.documents.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Uploaded Documents ({tutor.documents.length})</h3>
                      <Badge variant="secondary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Training Active
                      </Badge>
                    </div>
                    {tutor.documents.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.size} • Uploaded {doc.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveDocument(doc.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Processing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      <strong>Clear formatting:</strong> Well-structured documents with headings and sections work best
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      <strong>Relevant content:</strong> Include lecture notes, textbook chapters, and supplementary
                      materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      <strong>Examples:</strong> Documents with worked examples help the AI provide better explanations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      <strong>Processing time:</strong> Large documents may take a few minutes to process
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructions Tab */}
          <TabsContent value="instructions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tutor Instructions</CardTitle>
                <CardDescription>
                  Define how the AI should interact with students. Be specific about teaching style, tone, and approach.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructions">System Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={tutor.instructions}
                    onChange={(e) => setTutor({ ...tutor, instructions: e.target.value })}
                    rows={12}
                    className="font-mono text-sm"
                    placeholder="Example: You are a patient tutor who helps students understand complex topics through simple explanations and real-world examples..."
                  />
                  <p className="text-xs text-muted-foreground">
                    {tutor.instructions.length} characters • Be detailed and specific for best results
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instruction Templates</CardTitle>
                <CardDescription>Quick start with pre-made instruction templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <p className="font-semibold text-sm">Socratic Method</p>
                      <p className="text-xs text-muted-foreground">
                        Guide students through questions rather than direct answers
                      </p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <p className="font-semibold text-sm">Step-by-Step Explainer</p>
                      <p className="text-xs text-muted-foreground">Break down complex topics into manageable steps</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <p className="font-semibold text-sm">Practical Examples Focus</p>
                      <p className="text-xs text-muted-foreground">Emphasize real-world applications and use cases</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Settings</CardTitle>
                <CardDescription>Fine-tune how the AI generates responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Response Creativity</Label>
                    <span className="text-sm text-muted-foreground">{tutor.settings.temperature}</span>
                  </div>
                  <Slider
                    id="temperature"
                    value={[tutor.settings.temperature]}
                    onValueChange={(v) => setTutor({ ...tutor, settings: { ...tutor.settings, temperature: v[0] } })}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower values = more focused and deterministic. Higher values = more creative and varied.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxTokens">Maximum Response Length</Label>
                    <span className="text-sm text-muted-foreground">{tutor.settings.maxTokens} tokens</span>
                  </div>
                  <Slider
                    id="maxTokens"
                    value={[tutor.settings.maxTokens]}
                    onValueChange={(v) => setTutor({ ...tutor, settings: { ...tutor.settings, maxTokens: v[0] } })}
                    min={100}
                    max={1000}
                    step={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls how long responses can be. ~100 tokens ≈ 75 words.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseStyle">Response Style</Label>
                  <Select
                    value={tutor.settings.responseStyle}
                    onValueChange={(v) => setTutor({ ...tutor, settings: { ...tutor.settings, responseStyle: v } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise - Brief, to-the-point answers</SelectItem>
                      <SelectItem value="detailed">Detailed - Thorough explanations with examples</SelectItem>
                      <SelectItem value="conversational">Conversational - Friendly, engaging tone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teaching Preferences</CardTitle>
                <CardDescription>Configure how the AI assists students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Hints</Label>
                    <p className="text-xs text-muted-foreground">AI can provide hints instead of full answers</p>
                  </div>
                  <Switch
                    checked={tutor.settings.allowHints}
                    onCheckedChange={(checked) =>
                      setTutor({ ...tutor, settings: { ...tutor.settings, allowHints: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Provide Examples</Label>
                    <p className="text-xs text-muted-foreground">Include practical examples in explanations</p>
                  </div>
                  <Switch
                    checked={tutor.settings.allowExamples}
                    onCheckedChange={(checked) =>
                      setTutor({ ...tutor, settings: { ...tutor.settings, allowExamples: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Strict Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Only answer questions directly related to course content
                    </p>
                  </div>
                  <Switch
                    checked={tutor.settings.strictMode}
                    onCheckedChange={(checked) =>
                      setTutor({ ...tutor, settings: { ...tutor.settings, strictMode: checked } })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Tab */}
          <TabsContent value="test" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Your AI Tutor</CardTitle>
                <CardDescription>
                  Try asking questions to see how your AI tutor responds with the current configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testMessage">Ask a question</Label>
                  <Textarea
                    id="testMessage"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Example: Can you explain what logistic regression is?"
                    rows={3}
                  />
                </div>
                <Button onClick={handleTestTutor} disabled={!testMessage.trim() || isTesting} className="w-full">
                  {isTesting ? "Generating Response..." : "Test Tutor"}
                </Button>

                {testResponse && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">AI Tutor Response</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{testResponse}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Questions to Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {[
                    "What is logistic regression?",
                    "How does the sigmoid function work?",
                    "Can you give me an example of when to use logistic regression?",
                    "What's the difference between logistic and linear regression?",
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-3 text-left bg-transparent"
                      onClick={() => setTestMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
