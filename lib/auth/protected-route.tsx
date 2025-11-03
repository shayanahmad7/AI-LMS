"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { getUserRole } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'student' | 'teacher'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (loading) return

      if (!user) {
        router.push('/login')
        return
      }

      if (requiredRole) {
        const role = await getUserRole(user.id)
        if (role !== requiredRole) {
          // Redirect to the correct dashboard based on their role
          if (role === 'teacher') {
            router.push('/teacher')
          } else {
            router.push('/student')
          }
          return
        }
      }

      setAuthorized(true)
      setChecking(false)
    }

    checkAuth()
  }, [user, loading, requiredRole, router])

  if (loading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}

