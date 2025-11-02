"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Award, Calendar, CheckCircle } from "lucide-react"

interface Certificate {
  id: string
  courseName: string
  completedDate: string
  score: number
  instructor: string
  certificateNumber: string
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    courseName: "Introduction to Machine Learning",
    completedDate: "January 15, 2025",
    score: 92,
    instructor: "Dr. Sarah Johnson",
    certificateNumber: "ML-2025-001234",
  },
  {
    id: "2",
    courseName: "Data Structures & Algorithms",
    completedDate: "December 20, 2024",
    score: 88,
    instructor: "Prof. Michael Chen",
    certificateNumber: "DSA-2024-005678",
  },
]

export function CertificateViewer() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Certificates</h2>
        <p className="text-muted-foreground">Certificates earned from completed courses</p>
      </div>

      <div className="grid gap-6">
        {mockCertificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Certified
                    </Badge>
                    <h3 className="text-2xl font-bold">{cert.courseName}</h3>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-100 mb-1">Completed</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {cert.completedDate}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 mb-1">Final Score</p>
                  <p className="font-semibold text-xl">{cert.score}%</p>
                </div>
                <div>
                  <p className="text-blue-100 mb-1">Certificate ID</p>
                  <p className="font-mono text-xs">{cert.certificateNumber}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Instructor: <span className="font-medium text-foreground">{cert.instructor}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
