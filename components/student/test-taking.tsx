"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MathText } from "@/components/ui/math-renderer"
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertCircle,
  Award,
  TrendingUp,
  BookOpen,
  X,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface TestTakingProps {
  testId: string
}

const mockTest = {
  id: "1",
  title: "Calculus and Linear Algebra Assessment",
  description: "Test your understanding of calculus and linear algebra concepts",
  course: "Advanced Mathematics",
  topic: "Calculus & Linear Algebra",
  timeLimit: 60,
  totalPoints: 25,
  passingScore: 70,
  questions: [
    {
      id: "1",
      type: "multiple-choice",
      question: "What is the derivative of f(x) = 3x^2 + 2x - 5?",
      options: ["6x + 2", "3x + 2", "6x^2 + 2x", "3x^2 + 2"],
      points: 2,
    },
    {
      id: "2",
      type: "multiple-choice",
      question: "Evaluate the integral: ∫ (4x^3 - 2x) dx",
      options: ["x^4 - x^2 + C", "12x^2 - 2 + C", "4x^4 - 2x^2 + C", "x^4 - x + C"],
      points: 3,
    },
    {
      id: "3",
      type: "multiple-choice",
      question: "What is the determinant of the matrix [[2, 3], [1, 4]]?",
      options: ["5", "8", "11", "14"],
      points: 2,
    },
    {
      id: "4",
      type: "true-false",
      question: "The limit lim_{x → 0} sin(x)/x = 1",
      points: 2,
    },
    {
      id: "5",
      type: "multiple-choice",
      question: "Which of the following is an eigenvector of A = [[3, 1], [0, 2]] with eigenvalue λ = 3?",
      options: ["[[1], [0]]", "[[0], [1]]", "[[1], [1]]", "[[2], [1]]"],
      points: 3,
    },
    {
      id: "6",
      type: "short-answer",
      question:
        "Find the critical points of the function f(x) = x^3 - 6x^2 + 9x + 1 and determine whether each is a local maximum, local minimum, or neither. Show your work.",
      points: 5,
    },
    {
      id: "7",
      type: "multiple-choice",
      question: "What is d/dx[e^(2x) · cos(x)]?",
      options: [
        "2e^(2x)cos(x) - e^(2x)sin(x)",
        "e^(2x)cos(x) - e^(2x)sin(x)",
        "2e^(2x)cos(x)",
        "e^(2x)(2cos(x) - sin(x))",
      ],
      points: 3,
    },
    {
      id: "8",
      type: "short-answer",
      question: "Use the chain rule to find dy/dx if y = sin(3x^2 + 1). Show all steps in your calculation.",
      points: 5,
    },
  ],
}

export function TestTaking({ testId }: TestTakingProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(mockTest.timeLimit * 60)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (submitted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [submitted])

  const question = mockTest.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockTest.questions.length) * 100
  const answeredCount = Object.keys(answers).length
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer })
  }

  const toggleFlag = (questionId: string) => {
    const newFlagged = new Set(flagged)
    if (newFlagged.has(questionId)) {
      newFlagged.delete(questionId)
    } else {
      newFlagged.add(questionId)
    }
    setFlagged(newFlagged)
  }

  const handleSubmit = () => {
    // Calculate score (mock calculation)
    const calculatedScore = Math.floor(Math.random() * 30) + 70 // Mock: 70-100%
    setScore(calculatedScore)
    setSubmitted(true)
    setShowSubmitDialog(false)
  }

  const handleExit = () => {
    router.push("/student/tests")
  }

  if (submitted) {
    const passed = score >= mockTest.passingScore
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {passed ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-orange-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">{passed ? "Congratulations! You Passed!" : "Test Complete"}</CardTitle>
            <CardDescription>{mockTest.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{score}%</div>
              <p className="text-muted-foreground">
                {passed
                  ? `You exceeded the passing score of ${mockTest.passingScore}%`
                  : `Passing score is ${mockTest.passingScore}%`}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{answeredCount}</div>
                  <p className="text-xs text-muted-foreground">Questions Answered</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">
                    {Math.floor((mockTest.timeLimit * 60 - timeRemaining) / 60)}m
                  </div>
                  <p className="text-xs text-muted-foreground">Time Taken</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{Math.floor((score / 100) * mockTest.totalPoints)}</div>
                  <p className="text-xs text-muted-foreground">Points Earned</p>
                </CardContent>
              </Card>
            </div>

            {passed && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-green-900">Certificate Available</p>
                      <p className="text-xs text-green-700 mt-1">
                        You've earned a certificate for completing this assessment. Download it from your profile.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <BookOpen className="w-4 h-4 mr-2" />
                Review Answers
              </Button>
              <Button className="flex-1" onClick={() => router.push("/student/tests")}>
                Return to Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setShowExitDialog(true)}>
                <X className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{mockTest.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {mockTest.course} • {mockTest.topic}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={timeRemaining < 300 ? "destructive" : "secondary"} className="gap-2 px-3 py-1">
                <Clock className="h-4 w-4" />
                <span className="font-mono">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </Badge>
              <Button onClick={() => setShowSubmitDialog(true)} disabled={answeredCount === 0}>
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Progress */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Question {currentQuestion + 1} of {mockTest.questions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {answeredCount}/{mockTest.questions.length} answered
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                      <Badge>{question.points} points</Badge>
                      {flagged.has(question.id) && (
                        <Badge variant="secondary" className="gap-1">
                          <Flag className="h-3 w-3" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-relaxed">
                      <MathText>{question.question}</MathText>
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFlag(question.id)}
                    className={flagged.has(question.id) ? "text-orange-600" : ""}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup value={answers[question.id]} onValueChange={(v) => handleAnswer(question.id, v)}>
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                            answers[question.id] === index.toString()
                              ? "border-blue-500 bg-blue-50"
                              : "border-border hover:border-blue-200"
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`q${question.id}-option-${index}`} />
                          <Label htmlFor={`q${question.id}-option-${index}`} className="flex-1 cursor-pointer">
                            <MathText>{option}</MathText>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {question.type === "true-false" && (
                  <RadioGroup value={answers[question.id]} onValueChange={(v) => handleAnswer(question.id, v)}>
                    <div className="space-y-3">
                      {["True", "False"].map((option) => (
                        <div
                          key={option}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                            answers[question.id] === option.toLowerCase()
                              ? "border-blue-500 bg-blue-50"
                              : "border-border hover:border-blue-200"
                          }`}
                        >
                          <RadioGroupItem value={option.toLowerCase()} id={`q${question.id}-${option}`} />
                          <Label htmlFor={`q${question.id}-${option}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {question.type === "short-answer" && (
                  <div className="space-y-2">
                    <Textarea
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{answers[question.id]?.length || 0} characters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => setCurrentQuestion(Math.min(mockTest.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === mockTest.questions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar - Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Question Navigator</CardTitle>
                <CardDescription>Click to jump to any question</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="grid grid-cols-4 gap-2">
                    {mockTest.questions.map((q, index) => (
                      <Button
                        key={q.id}
                        variant={currentQuestion === index ? "default" : answers[q.id] ? "secondary" : "outline"}
                        className="h-10 relative"
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                        {flagged.has(q.id) && (
                          <Flag className="h-3 w-3 absolute top-1 right-1 text-orange-600" fill="currentColor" />
                        )}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-secondary rounded" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 border-2 rounded" />
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Flag className="w-4 h-4 text-orange-600" />
                    <span>Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will not be saved and you'll need to restart the test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={handleExit} className="bg-destructive text-destructive-foreground">
              Exit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your test? You have answered {answeredCount} out of{" "}
              {mockTest.questions.length} questions.
              {answeredCount < mockTest.questions.length && (
                <span className="block mt-2 text-orange-600 font-medium">
                  <AlertCircle className="inline h-4 w-4 mr-1" />
                  You have {mockTest.questions.length - answeredCount} unanswered question(s).
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit Test</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
