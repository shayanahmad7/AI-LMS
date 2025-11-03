"use client";

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Lightbulb, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AITutorChatProps {
  chapterId: string
  tutorName: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI tutor for Logistic Regression. I'm here to help you understand this topic thoroughly. Feel free to ask me anything about logistic regression, from basic concepts to implementation details. What would you like to learn about first?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "user",
    content: "Can you explain what logistic regression is and how it differs from linear regression?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Great question! Logistic regression is a classification algorithm used to predict binary outcomes (yes/no, true/false, 0/1), while linear regression predicts continuous values.\n\nKey differences:\n\n1. **Output**: Linear regression outputs continuous values, while logistic regression outputs probabilities between 0 and 1.\n\n2. **Function**: Logistic regression uses the sigmoid function to map predictions to probabilities, while linear regression uses a straight line.\n\n3. **Use cases**: Use linear regression for predicting things like house prices or temperature. Use logistic regression for classification tasks like spam detection or disease diagnosis.\n\nWould you like me to explain the sigmoid function in more detail?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
]

const suggestedQuestions = [
  "What is the sigmoid function?",
  "How do we train a logistic regression model?",
  "Can you show me an example?",
  "What are the limitations of logistic regression?",
]

export function AITutorChat({ chapterId, tutorName }: AITutorChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "This is a simulated response from the AI tutor. In a real implementation, this would be powered by an AI model that has been trained on the course materials and can provide personalized explanations based on your questions.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b px-4 py-3 bg-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{tutorName}</h3>
            <p className="text-xs text-muted-foreground">AI-powered learning assistant</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Lightbulb className="h-3 w-3" />
            Active
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className={message.role === "assistant" ? "bg-blue-600" : "bg-gray-600"}>
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </AvatarFallback>
              </Avatar>
              <Card className={`p-3 max-w-[80%] ${message.role === "user" ? "bg-blue-600 text-white" : "bg-card"}`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600">
                  <Bot className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </Card>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length <= 3 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Suggested questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask your AI tutor anything..."
            className="min-h-[60px] resize-none"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  )
}
