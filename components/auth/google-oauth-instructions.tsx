"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function GoogleOAuthInstructions() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Google Sign-in Setup Required</AlertTitle>
      <AlertDescription>
        To use Google sign-in, you need to configure OAuth redirect URIs.
        <br />
        <a 
          href="https://console.cloud.google.com/apis/credentials" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Click here for setup instructions →
        </a>
        <br />
        <span className="text-sm text-muted-foreground">
          Or use email/password signup instead (no setup needed)
        </span>
      </AlertDescription>
    </Alert>
  )
}

