"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Loader2, GraduationCap } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function SetupCheckPage() {
  const [checking, setChecking] = useState(true)
  const [checks, setChecks] = useState({
    supabaseConnection: { status: "pending", message: "" },
    profilesTable: { status: "pending", message: "" },
    authEnabled: { status: "pending", message: "" },
  })

  useEffect(() => {
    runChecks()
  }, [])

  const runChecks = async () => {
    const supabase = createClient()
    const newChecks = { ...checks }

    // Check 1: Supabase connection
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1)
      if (error) {
        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          newChecks.profilesTable = {
            status: "error",
            message: "Profiles table doesn't exist. You need to run the database setup SQL."
          }
        } else {
          newChecks.supabaseConnection = {
            status: "error",
            message: `Connection error: ${error.message}`
          }
        }
      } else {
        newChecks.supabaseConnection = {
          status: "success",
          message: "Successfully connected to Supabase"
        }
        newChecks.profilesTable = {
          status: "success",
          message: "Profiles table exists and is accessible"
        }
      }
    } catch (err: any) {
      newChecks.supabaseConnection = {
        status: "error",
        message: `Failed to connect: ${err.message}`
      }
    }

    // Check 3: Auth test
    try {
      const { data } = await supabase.auth.getSession()
      newChecks.authEnabled = {
        status: "success",
        message: data.session ? "You are logged in" : "Auth is working (not logged in)"
      }
    } catch (err: any) {
      newChecks.authEnabled = {
        status: "error",
        message: `Auth error: ${err.message}`
      }
    }

    setChecks(newChecks)
    setChecking(false)
  }

  const getStatusIcon = (status: string) => {
    if (status === "pending") return <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
    if (status === "success") return <CheckCircle className="h-5 w-5 text-green-600" />
    if (status === "error") return <XCircle className="h-5 w-5 text-red-600" />
    return <AlertCircle className="h-5 w-5 text-yellow-600" />
  }

  const allGood = Object.values(checks).every(check => check.status === "success")
  const hasErrors = Object.values(checks).some(check => check.status === "error")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Setup Status Check</CardTitle>
            <CardDescription>
              Let's verify your authentication setup is working correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Check Results */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="mt-0.5">{getStatusIcon(checks.supabaseConnection.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">Supabase Connection</h3>
                  <p className="text-sm text-muted-foreground">{checks.supabaseConnection.message || "Checking..."}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="mt-0.5">{getStatusIcon(checks.profilesTable.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">Database Tables</h3>
                  <p className="text-sm text-muted-foreground">{checks.profilesTable.message || "Checking..."}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="mt-0.5">{getStatusIcon(checks.authEnabled.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">Authentication</h3>
                  <p className="text-sm text-muted-foreground">{checks.authEnabled.message || "Checking..."}</p>
                </div>
              </div>
            </div>

            {/* Results */}
            {!checking && (
              <>
                {allGood && (
                  <Alert className="bg-green-50 text-green-900 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>All Good! 🎉</AlertTitle>
                    <AlertDescription>
                      Your authentication setup is complete and working correctly.
                      You can now sign up and log in!
                    </AlertDescription>
                  </Alert>
                )}

                {hasErrors && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Setup Required</AlertTitle>
                    <AlertDescription>
                      Some components need to be configured. Follow the steps below to fix them.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Items */}
                {checks.profilesTable.status === "error" && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Database Setup Needed</AlertTitle>
                    <AlertDescription className="space-y-2">
                      <p>You need to create the profiles table in Supabase:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Go to <a href="https://app.supabase.com/project/brmdzbtdypfxwbjburkz/sql/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase SQL Editor</a></li>
                        <li>Open the file <code className="bg-gray-100 px-1 rounded">supabase-schema.sql</code> in your project</li>
                        <li>Copy all the SQL code</li>
                        <li>Paste it into Supabase and click "Run"</li>
                      </ol>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={runChecks} variant="outline" className="flex-1">
                    <Loader2 className="mr-2 h-4 w-4" />
                    Re-check Status
                  </Button>
                  {allGood ? (
                    <Link href="/signup" className="flex-1">
                      <Button className="w-full">
                        Go to Sign Up
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Documentation Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Need help?</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              QUICK_START.md
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              TROUBLESHOOTING.md
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              DATABASE_SETUP.md
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

