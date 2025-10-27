"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/ui/page-header"
import {
  CheckCircle2,
  TrendingUp,
  Video,
  MessageSquare,
  Download,
  Share2,
  Award,
  Clock,
  FileText,
  Mic,
} from "lucide-react"
import { useEffect, useState } from "react"
import { MathRenderer } from "@/components/ui/math-renderer"

export function PracticeResults() {
  const [canvasPages, setCanvasPages] = useState<{ [key: number]: string }>({})
  const [audioTranscript, setAudioTranscript] = useState("")

  useEffect(() => {
    const pages = sessionStorage.getItem("canvasPages")
    const transcript = sessionStorage.getItem("audioTranscript")

    if (pages) {
      setCanvasPages(JSON.parse(pages))
    }
    if (transcript) {
      setAudioTranscript(transcript)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Practice Results"
        description="Review your performance and AI feedback"
        showBack
        backHref="/student/practice"
        breadcrumbs={[
          { label: "Dashboard", href: "/student" },
          { label: "Practice", href: "/student/practice" },
          { label: "Results" },
        ]}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Score Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Calculus Problem Set 3</CardTitle>
                <CardDescription>Completed 2 hours ago • Duration: 45 minutes</CardDescription>
              </div>
              <Badge className="text-lg px-4 py-2 bg-green-500">Score: 92/100</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct Answers</span>
                </div>
                <div className="text-2xl font-bold">4/5</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Avg Time per Question</span>
                </div>
                <div className="text-2xl font-bold">9 min</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>Explanation Quality</span>
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
            </div>

            <div className="flex items-center gap-2">
              <Button>
                <Video className="w-4 h-4 mr-2" />
                Watch Recording
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="feedback" className="space-y-6">
          <TabsList>
            <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            <TabsTrigger value="written-feedback">Written Analysis</TabsTrigger>
            <TabsTrigger value="verbal-feedback">Verbal Analysis</TabsTrigger>
            <TabsTrigger value="written">Your Written Work</TabsTrigger>
            <TabsTrigger value="verbal">Your Explanation</TabsTrigger>
            <TabsTrigger value="solution">Correct Solution</TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance Summary</CardTitle>
                <CardDescription>High-level overview of your practice session performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      What Went Well
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li>Correctly identified the problem type and solution method</li>
                      <li>Applied the quadratic formula accurately</li>
                      <li>Showed clear mathematical reasoning</li>
                      <li>Completed all steps systematically</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Areas to Focus On
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li>Consider checking your work more thoroughly</li>
                      <li>Practice explaining each step as you write it</li>
                      <li>Try more challenging variations of similar problems</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Next Steps
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Great job on this quadratic equation! You demonstrated solid understanding of the quadratic formula. 
                    For your next practice session, try working with equations that have irrational solutions or complex roots. 
                    This will help you become more comfortable with different types of quadratic equations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="written-feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Written Solution Analysis</CardTitle>
                <CardDescription>Detailed feedback on your canvas work and mathematical presentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Strengths in Your Written Work
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li><strong>Clear organization:</strong> Your work was well-structured across multiple pages</li>
                      <li><strong>Proper notation:</strong> Used correct mathematical symbols and formatting</li>
                      <li><strong>Step-by-step approach:</strong> Showed each step of the quadratic formula application</li>
                      <li><strong>Neat presentation:</strong> Work was legible and easy to follow</li>
                      <li><strong>Correct calculation:</strong> All arithmetic was performed accurately</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-orange-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li><strong>Labeling:</strong> Consider adding labels like "Step 1:", "Step 2:" for clarity</li>
                      <li><strong>Intermediate steps:</strong> Show more detailed work for the discriminant calculation</li>
                      <li><strong>Final verification:</strong> Add a step to verify your solutions by substitution</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mathematical Accuracy Score: 95/100</h4>
                  <p className="text-sm text-muted-foreground">
                    Your mathematical work was highly accurate. The only minor deduction was for not showing 
                    the verification step, which is a good practice to ensure your solutions are correct.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verbal-feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verbal Explanation Analysis</CardTitle>
                <CardDescription>Feedback on your spoken explanation and communication skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Communication Strengths
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li><strong>Clear articulation:</strong> Spoke clearly and at an appropriate pace</li>
                      <li><strong>Logical flow:</strong> Explained your reasoning in a logical sequence</li>
                      <li><strong>Mathematical vocabulary:</strong> Used proper mathematical terminology</li>
                      <li><strong>Confidence:</strong> Delivered your explanation with confidence</li>
                      <li><strong>Problem identification:</strong> Correctly identified this as a quadratic equation problem</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-orange-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Areas to Improve
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li><strong>Pacing:</strong> Slightly slower delivery would help with complex steps</li>
                      <li><strong>Verification:</strong> Mention checking your answer at the end</li>
                      <li><strong>Alternative methods:</strong> Consider mentioning other solution approaches</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Communication Score: 88/100</h4>
                  <p className="text-sm text-muted-foreground">
                    Your verbal explanation was clear and well-structured. You demonstrated good understanding 
                    of the mathematical concepts and communicated them effectively. Consider slowing down slightly 
                    for more complex calculations to ensure clarity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="written" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Written Solution</CardTitle>
                <CardDescription>Review your canvas work from the practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(canvasPages).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(canvasPages).map(([page, imageData]) => (
                      <div key={page} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">Page {page}</h4>
                          <Badge variant="outline">Canvas Work</Badge>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                          <img
                            src={imageData || "/placeholder.svg"}
                            alt={`Your written work - Page ${page}`}
                            className="w-full h-auto max-w-4xl mx-auto rounded"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          This shows your step-by-step work on the quadratic equation problem. 
                          You can see how you organized your solution across multiple pages.
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No Written Work Captured</h3>
                    <p>No canvas work was saved from this practice session.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verbal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Verbal Explanation</CardTitle>
                <CardDescription>Review your spoken explanation and reasoning process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Audio Recording</h4>
                      <p className="text-sm text-muted-foreground">Duration: 6 minutes 15 seconds</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Play Audio
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Transcript with Timestamps</h4>
                    <div className="space-y-3">
                      {[
                        {
                          time: "00:45",
                          text: "Okay, so for this quadratic equation, I need to use the quadratic formula. Let me identify a, b, and c first...",
                          analysis: "Good problem identification and strategy explanation"
                        },
                        {
                          time: "02:15",
                          text: "So a equals 2, b equals negative 5, and c equals 3. Now I'll substitute these into the formula...",
                          analysis: "Clear identification of coefficients"
                        },
                        {
                          time: "04:30",
                          text: "The discriminant is b squared minus 4ac, which is 25 minus 24, equals 1. Since it's positive, we have two real solutions...",
                          analysis: "Excellent explanation of the discriminant concept"
                        },
                        {
                          time: "06:00",
                          text: "So x equals 5 plus or minus 1, all over 4. That gives us x equals 1.5 or x equals 1.",
                          analysis: "Clear final answer presentation"
                        },
                      ].map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              {item.time}
                            </Badge>
                            <div className="flex-1">
                              <p className="text-sm">{item.text}</p>
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                {item.analysis}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Communication Highlights</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Used proper mathematical terminology throughout</li>
                      <li>Explained your reasoning step-by-step</li>
                      <li>Spoke clearly and at an appropriate pace</li>
                      <li>Demonstrated understanding of the quadratic formula concept</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Correct Solution & Explanation</CardTitle>
                <CardDescription>Step-by-step solution with detailed explanation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Problem:</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <MathRenderer block>2x^2 - 5x + 3 = 0</MathRenderer>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Solution Steps:</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium mb-1">Step 1: Identify coefficients</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          From the standard form <MathRenderer>ax^2 + bx + c = 0</MathRenderer>:
                        </p>
                        <div className="bg-muted p-3 rounded">
                          <MathRenderer>a = 2, \quad b = -5, \quad c = 3</MathRenderer>
                        </div>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium mb-1">Step 2: Apply the quadratic formula</h4>
                        <div className="bg-muted p-3 rounded">
                          <MathRenderer block>x = (-b \pm \sqrt{b ^ 2 - 4ac}) / (2a)</MathRenderer>
                        </div>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium mb-1">Step 3: Calculate the discriminant</h4>
                        <div className="bg-muted p-3 rounded space-y-2">
                          <MathRenderer block>b^2 - 4ac = (-5)^2 - 4(2)(3)</MathRenderer>
                          <MathRenderer block>= 25 - 24 = 1</MathRenderer>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Since the discriminant is positive, we have two distinct real solutions.
                        </p>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium mb-1">Step 4: Substitute and solve</h4>
                        <div className="bg-muted p-3 rounded space-y-2">
                          <MathRenderer block>x = (5 \pm 1) / 4</MathRenderer>
                        </div>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium mb-1 text-green-600">Final Answer:</h4>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded space-y-2">
                          <MathRenderer block>x_1 = (5 + 1) / 4 = 6 / 4 = 3 / 2 = 1.5</MathRenderer>
                          <MathRenderer block>x_2 = (5 - 1) / 4 = 4 / 4 = 1</MathRenderer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Concepts
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>The quadratic formula works for all quadratic equations</li>
                      <li>The discriminant determines the nature of the roots</li>
                      <li>Always verify your solutions by substituting back into the original equation</li>
                      <li>Alternative methods: factoring or completing the square</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
