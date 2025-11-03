"use client"

import { TeacherDashboard } from "@/components/teacher/teacher-dashboard"
import { ProtectedRoute } from "@/lib/auth/protected-route"

export default function TeacherPage() {
  return (
    <ProtectedRoute requiredRole="teacher">
      <TeacherDashboard />
    </ProtectedRoute>
  )
}
