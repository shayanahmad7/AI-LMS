"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/ui/page-header"
import { Video, MessageSquare, Download, Share2, CheckCircle2, Clock, TrendingUp, Play, Pause } from "lucide-react"
import { useState } from "react"

export function SessionDetailView() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <PageHeader
        title="Practice Session Details"
        description="Sarah Johnson • Advanced Calculus • 2 hours ago"
        showBack
        backHref="/teacher"
        breadcrumbs={[
          { label: "Dashboard", href: "/teacher" },
          { label: "Practice Monitoring" },
          { label: "Session Details" },
        ]}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Session Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Integration Techniques Practice</CardTitle>
                <CardDescription>Practice Session • 45 minutes • Completed 2 hours ago</CardDescription>
              </div>
              <Badge className="text-lg px-4 py-2 bg-green-500">Score: 92/100</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-5 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct</span>
                </div>
                <div className="text-2xl font-bold">5/5</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Avg Time</span>
                </div>
                <div className="text-2xl font-bold">9 min</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>Explanation</span>
                </div>
                <div className="text-2xl font-bold">Excellent</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Improvement</span>
                </div>
                <div className="text-2xl font-bold text-green-500">+8%</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="w-4 h-4" />
                  <span>Recording</span>
                </div>
                <div className="text-2xl font-bold">45:23</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button>
                <Video className="w-4 h-4 mr-2" />
                Watch Full Recording
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share with Student
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Video Player */}
          <Card>
            <CardHeader>
              <CardTitle>Session Recording</CardTitle>
              <CardDescription>Canvas recording with audio explanation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                <div className="text-white text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Video Player Placeholder</p>
                  <p className="text-xs opacity-50 mt-2">45:23 duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <div className="flex-1 h-2 bg-muted rounded-full">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <span className="text-sm text-muted-foreground">15:20 / 45:23</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Transcript */}
          <Card>
            <CardHeader>
              <CardTitle>AI Interaction Transcript</CardTitle>
              <CardDescription>Real-time feedback and guidance provided</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {[
                    {
                      time: "00:45",
                      role: "ai",
                      message: "Great start! Can you explain why you chose the u-substitution method?",
                    },
                    {
                      time: "01:20",
                      role: "student",
                      message: "Because the derivative of the inner function is present in the integrand.",
                    },
                    {
                      time: "01:35",
                      role: "ai",
                      message: "Perfect! That's exactly right. Now show me how you'll set up your substitution.",
                    },
                    {
                      time: "03:15",
                      role: "student",
                      message: "Let u = 2x + 3, then du = 2dx, so dx = du/2",
                    },
                    {
                      time: "03:30",
                      role: "ai",
                      message: "Excellent work! Your substitution is correct. Continue with the integration.",
                    },
                    {
                      time: "05:45",
                      role: "ai",
                      message:
                        "I notice you're evaluating at the bounds. Remember to substitute back to x first, or adjust your bounds to u values.",
                    },
                    {
                      time: "06:20",
                      role: "student",
                      message: "Oh right! I'll adjust the bounds. When x=0, u=3, and when x=5, u=13.",
                    },
                    {
                      time: "06:35",
                      role: "ai",
                      message: "Perfect! That's a more efficient approach. Well done!",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.time}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground">
                          {item.role === "ai" ? "AI Assistant" : "Student"}
                        </span>
                      </div>
                      <div className={`p-3 rounded-lg text-sm ${item.role === "ai" ? "bg-muted" : "bg-primary/10"}`}>
                        {item.message}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Question Breakdown */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Question-by-Question Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="q1" className="space-y-4">
              <TabsList>
                {[1, 2, 3, 4, 5].map((q) => (
                  <TabsTrigger key={q} value={`q${q}`}>
                    Q{q}
                  </TabsTrigger>
                ))}
              </TabsList>

              {[1, 2, 3, 4, 5].map((q) => (
                <TabsContent key={q} value={`q${q}`} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Question {q}</CardTitle>
                          <CardDescription>Evaluate: ∫(2x + 3)dx from 0 to 5</CardDescription>
                        </div>
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Correct
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Student's Work:</h4>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm font-mono">
                            ∫(2x + 3)dx = x² + 3x + C<br />
                            [x² + 3x] from 0 to 5<br />= (25 + 15) - (0 + 0)
                            <br />= 40
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Verbal Explanation:</h4>
                        <p className="text-sm text-muted-foreground">
                          "I'll use the power rule for integration. The antiderivative of 2x is x squared, and the
                          antiderivative of 3 is 3x. Then I evaluate at the upper bound 5 and subtract the value at the
                          lower bound 0, giving me 40."
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">AI Assessment:</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                            <div className="text-sm">
                              <span className="font-medium">Correct solution</span> - Perfect application of power rule
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                            <div className="text-sm">
                              <span className="font-medium">Clear explanation</span> - Articulated each step logically
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                            <div className="text-sm">
                              <span className="font-medium">Good notation</span> - Used proper mathematical notation
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Jump to Question in Recording
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
