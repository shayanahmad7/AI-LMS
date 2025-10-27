"use client"

import { Progress } from "@/components/ui/progress"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, MessageSquare, Clock, User, Eye } from "lucide-react"

const mockInteractions = [
  {
    id: "1",
    student: "Alice Johnson",
    tutor: "Neural Networks Tutor",
    course: "Machine Learning",
    topic: "Deep Learning",
    messageCount: 24,
    duration: "18 min",
    timestamp: "2 hours ago",
    sentiment: "positive",
    resolved: true,
  },
  {
    id: "2",
    student: "Bob Smith",
    tutor: "Linear Algebra Tutor",
    course: "Advanced Calculus",
    topic: "Matrix Operations",
    messageCount: 15,
    duration: "12 min",
    timestamp: "3 hours ago",
    sentiment: "neutral",
    resolved: true,
  },
  {
    id: "3",
    student: "Carol Williams",
    tutor: "Sorting Algorithms Helper",
    course: "Data Structures",
    topic: "Quick Sort",
    messageCount: 32,
    duration: "25 min",
    timestamp: "5 hours ago",
    sentiment: "confused",
    resolved: false,
  },
  {
    id: "4",
    student: "David Brown",
    tutor: "Supervised Learning Tutor",
    course: "Machine Learning",
    topic: "Logistic Regression",
    messageCount: 19,
    duration: "15 min",
    timestamp: "6 hours ago",
    sentiment: "positive",
    resolved: true,
  },
]

const topQuestions = [
  { question: "How does backpropagation work?", count: 45, tutor: "Neural Networks Tutor" },
  {
    question: "What's the difference between supervised and unsupervised learning?",
    count: 38,
    tutor: "ML Basics Tutor",
  },
  { question: "How do I calculate eigenvalues?", count: 32, tutor: "Linear Algebra Tutor" },
  { question: "When should I use Quick Sort vs Merge Sort?", count: 28, tutor: "Sorting Algorithms Helper" },
  { question: "What is gradient descent?", count: 25, tutor: "Optimization Tutor" },
]

export function AIInteractionsView() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "confused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Interactions</CardTitle>
          <CardDescription>Monitor student conversations with AI tutors</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {mockInteractions.map((interaction) => (
                <Card key={interaction.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Bot className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{interaction.tutor}</h4>
                            <p className="text-xs text-muted-foreground">
                              {interaction.course} • {interaction.topic}
                            </p>
                          </div>
                        </div>
                        <Badge variant={interaction.resolved ? "default" : "secondary"}>
                          {interaction.resolved ? "Resolved" : "Ongoing"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{interaction.student}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{interaction.messageCount} messages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{interaction.duration}</span>
                        </div>
                        <span>{interaction.timestamp}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getSentimentColor(interaction.sentiment)} variant="outline">
                          {interaction.sentiment}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Conversation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Asked Questions</CardTitle>
            <CardDescription>Common topics students need help with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQuestions.map((item, index) => (
                <Card key={index} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-relaxed">{item.question}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{item.tutor}</p>
                          <Badge variant="secondary">{item.count} times</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tutor Performance</CardTitle>
            <CardDescription>Average metrics across all tutors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Accuracy</span>
                <span className="font-semibold">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Student Satisfaction</span>
                <span className="font-semibold">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Problem Resolution Rate</span>
                <span className="font-semibold">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg. Response Time</span>
                <span className="font-semibold">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
