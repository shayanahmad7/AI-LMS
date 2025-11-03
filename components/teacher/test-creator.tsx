"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, Trash2, GripVertical, Save, Eye, Clock, Award, Settings, CheckCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  points: number
  explanation?: string
}

export function TestCreator() {
  const [testTitle, setTestTitle] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [course, setCourse] = useState("")
  const [topic, setTopic] = useState("")
  const [timeLimit, setTimeLimit] = useState(60)
  const [passingScore, setPassingScore] = useState(70)
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [showResults, setShowResults] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
    explanation: "",
  })

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      setQuestions([...questions, currentQuestion])
      setCurrentQuestion({
        id: Date.now().toString(),
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
        explanation: "",
      })
    }
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Create Test"
        description="Design a comprehensive assessment for your students"
        showBack
        backHref="/teacher"
        breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "Tests" }, { label: "Create Test" }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Test
            </Button>
          </div>
        }
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Details */}
            <Card>
              <CardHeader>
                <CardTitle>Test Details</CardTitle>
                <CardDescription>Basic information about this test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={course} onValueChange={setCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ml">Introduction to Machine Learning</SelectItem>
                        <SelectItem value="calc">Advanced Calculus</SelectItem>
                        <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supervised">Supervised Learning</SelectItem>
                        <SelectItem value="neural">Neural Networks</SelectItem>
                        <SelectItem value="unsupervised">Unsupervised Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Test Title</Label>
                  <Input
                    id="title"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="e.g., Supervised Learning Assessment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={testDescription}
                    onChange={(e) => setTestDescription(e.target.value)}
                    placeholder="Brief description of what this test covers..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Question */}
            <Card>
              <CardHeader>
                <CardTitle>Add Question</CardTitle>
                <CardDescription>Create a new question for this test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={currentQuestion.type}
                      onValueChange={(v: any) => setCurrentQuestion({ ...currentQuestion, type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Points</Label>
                    <Input
                      type="number"
                      value={currentQuestion.points}
                      onChange={(e) =>
                        setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) || 1 })
                      }
                      min={1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                    placeholder="Enter your question here..."
                    rows={3}
                  />
                </div>

                {currentQuestion.type === "multiple-choice" && (
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    <RadioGroup
                      value={currentQuestion.correctAnswer as string}
                      onValueChange={(v) => setCurrentQuestion({ ...currentQuestion, correctAnswer: v })}
                    >
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(currentQuestion.options || [])]
                              newOptions[index] = e.target.value
                              setCurrentQuestion({ ...currentQuestion, options: newOptions })
                            }}
                            placeholder={`Option ${index + 1}`}
                            className="flex-1"
                          />
                          <Badge variant={currentQuestion.correctAnswer === index.toString() ? "default" : "outline"}>
                            {currentQuestion.correctAnswer === index.toString() ? "Correct" : ""}
                          </Badge>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentQuestion({ ...currentQuestion, options: [...(currentQuestion.options || []), ""] })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                )}

                {currentQuestion.type === "true-false" && (
                  <div className="space-y-2">
                    <Label>Correct Answer</Label>
                    <RadioGroup
                      value={currentQuestion.correctAnswer as string}
                      onValueChange={(v) => setCurrentQuestion({ ...currentQuestion, correctAnswer: v })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="true" />
                        <Label htmlFor="true">True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="false" />
                        <Label htmlFor="false">False</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {currentQuestion.type === "short-answer" && (
                  <div className="space-y-2">
                    <Label>Sample Correct Answer</Label>
                    <Input
                      value={currentQuestion.correctAnswer as string}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      placeholder="Enter a sample correct answer for reference..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Short answer questions will need to be graded manually
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <Textarea
                    value={currentQuestion.explanation}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                    placeholder="Explain why this is the correct answer..."
                    rows={2}
                  />
                </div>

                <Button onClick={addQuestion} className="w-full" disabled={!currentQuestion.question.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question to Test
                </Button>
              </CardContent>
            </Card>

            {/* Questions List */}
            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Test Questions ({questions.length})</CardTitle>
                      <CardDescription>Total Points: {totalPoints}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {questions.map((q, index) => (
                        <Card key={q.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Button variant="ghost" size="icon" className="cursor-grab mt-1">
                                <GripVertical className="h-4 w-4" />
                              </Button>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">Q{index + 1}</Badge>
                                    <Badge variant="secondary">{q.type}</Badge>
                                    <Badge>{q.points} pts</Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQuestion(q.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-sm font-medium mb-2">{q.question}</p>
                                {q.options && (
                                  <div className="space-y-1">
                                    {q.options.map((option, i) => (
                                      <div key={i} className="flex items-center gap-2 text-xs">
                                        {q.correctAnswer === i.toString() && (
                                          <CheckCircle className="h-3 w-3 text-green-600" />
                                        )}
                                        <span className={q.correctAnswer === i.toString() ? "font-medium" : ""}>
                                          {option}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Test Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timeLimit" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Limit
                    </Label>
                    <span className="text-sm text-muted-foreground">{timeLimit} min</span>
                  </div>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number.parseInt(e.target.value) || 60)}
                    min={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passingScore" className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Passing Score
                    </Label>
                    <span className="text-sm text-muted-foreground">{passingScore}%</span>
                  </div>
                  <Input
                    id="passingScore"
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number.parseInt(e.target.value) || 70)}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shuffle Questions</Label>
                    <p className="text-xs text-muted-foreground">Randomize question order</p>
                  </div>
                  <Switch checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Results</Label>
                    <p className="text-xs text-muted-foreground">Display score after submission</p>
                  </div>
                  <Switch checked={showResults} onCheckedChange={setShowResults} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Questions</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Points</span>
                  <span className="font-medium">{totalPoints}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Limit</span>
                  <span className="font-medium">{timeLimit} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Passing Score</span>
                  <span className="font-medium">{passingScore}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
