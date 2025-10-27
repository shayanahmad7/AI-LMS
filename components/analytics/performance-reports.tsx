"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, AlertCircle } from "lucide-react"

const mockReports = [
  {
    id: "1",
    title: "Weekly Progress Report",
    description: "Student learning progress and engagement metrics",
    date: "Jan 15, 2024",
    type: "Weekly",
    status: "ready",
    insights: ["85% of students showed improvement", "AI tutor usage increased by 18%", "3 students need attention"],
  },
  {
    id: "2",
    title: "Monthly Performance Summary",
    description: "Comprehensive analysis of course completion and AI interactions",
    date: "Jan 1, 2024",
    type: "Monthly",
    status: "ready",
    insights: [
      "Average completion rate: 84%",
      "8,234 AI interactions recorded",
      "Top performing course: Machine Learning",
    ],
  },
  {
    id: "3",
    title: "Student Mastery Report",
    description: "Topic mastery levels and recommended interventions",
    date: "Jan 10, 2024",
    type: "Custom",
    status: "ready",
    insights: [
      "28 students achieved mastery",
      "5 topics need additional resources",
      "Neural Networks has highest engagement",
    ],
  },
]

const upcomingReports = [
  { title: "Weekly Progress Report", scheduledFor: "Tomorrow, 9:00 AM" },
  { title: "AI Tutor Effectiveness Analysis", scheduledFor: "Jan 20, 2024" },
  { title: "Course Completion Forecast", scheduledFor: "Jan 25, 2024" },
]

export function PerformanceReports() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>Automated daily and weekly performance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{report.type}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        Key Insights
                      </h4>
                      <ul className="space-y-1">
                        {report.insights.map((insight, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reports</CardTitle>
            <CardDescription>Scheduled automated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingReports.map((report, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{report.title}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.scheduledFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Recommendations</CardTitle>
            <CardDescription>AI-generated insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">3 Students Need Attention</h4>
                      <p className="text-xs text-muted-foreground">
                        Progress has declined in the past week. Consider reaching out.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">High Engagement Topic</h4>
                      <p className="text-xs text-muted-foreground">
                        Neural Networks has 2x more AI interactions than average.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Completion Rate Up</h4>
                      <p className="text-xs text-muted-foreground">
                        Overall completion rate increased by 3% this week.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
