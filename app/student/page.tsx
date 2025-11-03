"use client"

import { StudentDashboard } from "@/components/student/student-dashboard"
import { ProtectedRoute } from "@/lib/auth/protected-route"

export default function StudentPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  )
}
