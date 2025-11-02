"use client";

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Pencil,
  Eraser,
  Undo,
  Redo,
  Trash2,
  Video,
  Mic,
  MicOff,
  Send,
  Square,
  Lock,
  MessageSquare,
  CheckCircle2,
  Lightbulb,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MathRenderer, MathText } from "@/components/ui/math-renderer"

interface InteractiveCanvasProps {
  mode: "practice" | "test" | "interview"
}

interface CanvasState {
  imageData: ImageData | null
}

export function InteractiveCanvas({ mode }: InteractiveCanvasProps) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pen" | "eraser">("pen")
  const [brushSize, setBrushSize] = useState(3)
  const [color, setColor] = useState("#000000")
  const [isRecording, setIsRecording] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(mode === "test")
  const [messages, setMessages] = useState<Array<{ role: "ai" | "user"; content: string }>>([])
  const [inputMessage, setInputMessage] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(5)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [hasRecorded, setHasRecorded] = useState(false)
  const [showSubmitForFeedback, setShowSubmitForFeedback] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [canvasPages, setCanvasPages] = useState<Map<number, string>>(new Map())

  const [history, setHistory] = useState<Map<number, string[]>>(new Map())
  const [historyStep, setHistoryStep] = useState<Map<number, number>>(new Map())

  const [currentProblem] = useState({
    title: "Solve the Quadratic Equation",
    description: "Find all real solutions to the following quadratic equation:",
    equation: "2x^2 - 5x + 3 = 0",
    hint: "Use the quadratic formula: x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
  })

  useEffect(() => {
    if (mode === "practice") {
      setMessages([
        {
          role: "ai",
          content:
            "Hi! I'm here to help you practice. Start solving the problem on the canvas, and I'll provide live feedback as you work. Feel free to explain your thinking out loud!",
        },
      ])
      setAiSuggestions(["Can you explain your approach?", "What's the time complexity?", "Show me an example"])
    } else if (mode === "interview") {
      setMessages([
        {
          role: "ai",
          content:
            "Welcome to your interview session. I'll be asking you questions and evaluating your problem-solving approach. Let's start with the first question: Implement a function to reverse a linked list.",
        },
      ])
    } else if (mode === "test") {
      setMessages([
        {
          role: "ai",
          content:
            "Test mode activated. Screen recording has started. You have 90 minutes to complete 5 questions. Good luck!",
        },
      ])
    }
  }, [mode])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL()
    const pageHistory = history.get(currentPage) || []
    const currentStep = historyStep.get(currentPage) || -1
    
    const newHistory = pageHistory.slice(0, currentStep + 1)
    newHistory.push(dataUrl)
    
    const newHistoryMap = new Map(history)
    newHistoryMap.set(currentPage, newHistory)
    setHistory(newHistoryMap)
    
    const newHistoryStepMap = new Map(historyStep)
    newHistoryStepMap.set(currentPage, newHistory.length - 1)
    setHistoryStep(newHistoryStepMap)
  }

  const restoreFromHistory = (step: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pageHistory = history.get(currentPage) || []
    if (step < 0 || step >= pageHistory.length) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = pageHistory[step]
    
    const newHistoryStepMap = new Map(historyStep)
    newHistoryStepMap.set(currentPage, step)
    setHistoryStep(newHistoryStepMap)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const startDrawing = (e: MouseEvent) => {
      setIsDrawing(true)
      const rect = canvas.getBoundingClientRect()
      ctx.beginPath()
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return
      const rect = canvas.getBoundingClientRect()
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.stroke()
    }

    const stopDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false)
        ctx.closePath()
        saveToHistory()
      }
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)

    return () => {
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stopDrawing)
      canvas.removeEventListener("mouseout", stopDrawing)
    }
  }, [isDrawing, tool, brushSize, color])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsAudioEnabled(true)
    if (mode === "test") {
      setIsFullscreen(true)
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsAudioEnabled(false)
    if (mode === "practice") {
      setHasRecorded(true)
      setShowSubmitForFeedback(true)
    }
  }

  const handleSubmit = () => {
    if (mode === "practice") {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Great work! Your solution is correct. Here's some feedback: Your approach is efficient with O(n) time complexity. Consider edge cases like empty lists. Would you like to try a more challenging variation?",
        },
      ])
    } else {
      router.push("/student/practice/results/new")
    }
  }

  const handleSubmitForFeedback = () => {
    // Save current page before submitting
    saveCurrentPage()
    setShowSubmitForFeedback(false)

    // Store canvas pages in session storage for results page
    const pagesData: { [key: number]: string } = {}
    canvasPages.forEach((data, page) => {
      pagesData[page] = data
    })
    sessionStorage.setItem("canvasPages", JSON.stringify(pagesData))
    sessionStorage.setItem("audioTranscript", "Sample transcript of verbal explanation...")

    router.push("/student/practice/results/new")
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
      {
        role: "ai",
        content:
          mode === "interview"
            ? "Interesting approach. Can you explain why you chose this method? What would happen if the input size doubled?"
            : "That's a good question! Let me help you think through this...",
      },
    ])
    setInputMessage("")
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const handleUndo = () => {
    const currentStep = historyStep.get(currentPage) || -1
    const pageHistory = history.get(currentPage) || []
    if (currentStep > 0) {
      restoreFromHistory(currentStep - 1)
    }
  }

  const handleRedo = () => {
    const currentStep = historyStep.get(currentPage) || -1
    const pageHistory = history.get(currentPage) || []
    if (currentStep < pageHistory.length - 1) {
      restoreFromHistory(currentStep + 1)
    }
  }

  const saveCurrentPage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL()
    setCanvasPages(new Map(canvasPages.set(currentPage, dataUrl)))
  }

  const loadPage = (pageNum: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Save current page first
    saveCurrentPage()

    // Load the requested page
    const pageData = canvasPages.get(pageNum)
    if (pageData) {
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = pageData
    } else {
      // Clear canvas for new page
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    setCurrentPage(pageNum)
  }

  const addNewPage = () => {
    saveCurrentPage()
    const newPageNum = totalPages + 1
    setTotalPages(newPageNum)
    setCurrentPage(newPageNum)

    // Initialize history for new page
    const newHistoryMap = new Map(history)
    newHistoryMap.set(newPageNum, [])
    setHistory(newHistoryMap)
    
    const newHistoryStepMap = new Map(historyStep)
    newHistoryStepMap.set(newPageNum, -1)
    setHistoryStep(newHistoryStepMap)

    // Clear canvas for new page
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className={`min-h-screen bg-background ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {mode !== "test" && (
                <Button onClick={() => router.push("/student/practice")} variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">
                    {mode === "practice" && "Practice Session"}
                    {mode === "test" && "Test Mode"}
                    {mode === "interview" && "AI Interview"}
                  </h1>
                  {mode === "test" && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion} of {totalQuestions}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-md">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {!isRecording ? (
                  <Button onClick={handleStartRecording} variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    {mode === "practice" ? "Start Live Session" : "Start Recording"}
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => setIsAudioEnabled(!isAudioEnabled)} variant="outline" size="sm">
                      {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    <Button onClick={handleStopRecording} variant="outline" size="sm">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="flex-1 flex flex-col">
          <div className="border-b bg-card p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant={tool === "pen" ? "default" : "outline"} size="sm" onClick={() => setTool("pen")}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant={tool === "eraser" ? "default" : "outline"} size="sm" onClick={() => setTool("eraser")}>
                  <Eraser className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <span className="text-sm text-muted-foreground">Size:</span>
                <Slider
                  value={[brushSize]}
                  onValueChange={(value) => setBrushSize(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8">{brushSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleUndo} 
                  disabled={(historyStep.get(currentPage) || -1) <= 0}
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRedo} 
                  disabled={(historyStep.get(currentPage) || -1) >= (history.get(currentPage) || []).length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={clearCanvas}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-b bg-card p-4">
            <h3 className="font-semibold mb-2">{currentProblem.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{currentProblem.description}</p>
            <div className="bg-muted p-4 rounded-lg mb-2">
              <div className="text-lg text-center">
                <MathRenderer block>{currentProblem.equation}</MathRenderer>
              </div>
            </div>
            {mode === "practice" && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Hint: </span>
                  <MathText>{currentProblem.hint}</MathText>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white p-4 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={addNewPage}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Page
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                className="border border-gray-200 rounded-lg shadow-sm cursor-crosshair"
              />
            </div>
          </div>

          <div className="border-t bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentQuestion < totalQuestions && (
                  <Button variant="outline" onClick={() => setCurrentQuestion((prev) => prev + 1)}>
                    Next Question
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {mode === "practice" && showSubmitForFeedback && (
                  <Button onClick={handleSubmitForFeedback} size="lg" variant="default">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for AI Feedback
                  </Button>
                )}
                {(mode !== "practice" || !showSubmitForFeedback) && (
                  <Button onClick={handleSubmit} size="lg" disabled={mode === "practice" && !hasRecorded}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentQuestion === totalQuestions ? "Submit All" : "Submit Answer"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 border-l bg-card flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                {mode === "practice" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold">
                  {mode === "practice" && "AI Tutor"}
                  {mode === "test" && "Test Instructions"}
                  {mode === "interview" && "AI Interviewer"}
                </h2>
                {mode === "practice" && <p className="text-xs text-muted-foreground">Live monitoring and feedback</p>}
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {mode === "practice" && aiSuggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3" />
                    <span>Suggested questions:</span>
                  </div>
                  {aiSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 bg-transparent"
                      onClick={() => setInputMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {mode !== "test" && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
