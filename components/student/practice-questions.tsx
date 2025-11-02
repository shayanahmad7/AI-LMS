"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, HelpCircle, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PracticeQuestionsProps {
  chapterId: string
}

const mockQuestions = [
  {
    id: "1",
    question: "What is the primary purpose of the sigmoid function in logistic regression?",
    options: [
      "To calculate the mean of the data",
      "To map predictions to probabilities between 0 and 1",
      "To normalize the input features",
      "To calculate the gradient",
    ],
    correctAnswer: 1,
    explanation:
      "The sigmoid function maps any real-valued number to a value between 0 and 1, making it perfect for representing probabilities in binary classification.",
  },
  {
    id: "2",
    question: "Which of the following is NOT a characteristic of logistic regression?",
    options: [
      "It's used for classification tasks",
      "It outputs continuous values",
      "It uses the sigmoid function",
      "It predicts probabilities",
    ],
    correctAnswer: 1,
    explanation:
      "Logistic regression outputs probabilities (values between 0 and 1), not continuous values. Linear regression outputs continuous values.",
  },
  {
    id: "3",
    question: "What cost function is typically used to train a logistic regression model?",
    options: ["Mean Squared Error", "Log Loss (Binary Cross-Entropy)", "Hinge Loss", "Huber Loss"],
    correctAnswer: 1,
    explanation:
      "Log Loss (also called Binary Cross-Entropy) is the standard cost function for logistic regression as it's well-suited for probabilistic predictions.",
  },
]

export function PracticeQuestions({ chapterId }: PracticeQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null))

  const question = mockQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  const handleSubmit = () => {
    setShowExplanation(true)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setShowExplanation(false)
    }
  }

  const correctCount = answers.filter((answer, index) => answer === mockQuestions[index].correctAnswer).length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b px-6 py-4 bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">Practice Questions</h3>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </p>
          </div>
          <Badge variant="secondary">
            Score: {correctCount}/{mockQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <ScrollArea className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => setSelectedAnswer(Number.parseInt(v))}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      showExplanation
                        ? index === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selectedAnswer === index
                            ? "border-red-500 bg-red-50"
                            : "border-border"
                        : selectedAnswer === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-border hover:border-blue-200"
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {showExplanation && (
              <Card className={isCorrect ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    )}
                    <CardTitle className="text-base">{isCorrect ? "Correct!" : "Not quite right"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{question.explanation}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="border-t px-6 py-4 flex items-center justify-between bg-card">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        {!showExplanation ? (
          <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={currentQuestion === mockQuestions.length - 1}>
            Next Question
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
