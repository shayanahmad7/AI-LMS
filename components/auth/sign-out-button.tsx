"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  className?: string
  showIcon?: boolean
}

export function SignOutButton({ 
  variant = 'ghost', 
  className = '',
  showIcon = true 
}: SignOutButtonProps) {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <Button 
      variant={variant} 
      onClick={handleSignOut}
      className={className}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      Sign Out
    </Button>
  )
}

