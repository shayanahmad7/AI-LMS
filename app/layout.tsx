import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProviderWrapper } from '@/components/providers/auth-provider-wrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Learning Management System',
  description: 'Intelligent Learning Platform with AI Tutors',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
        <Analytics />
      </body>
    </html>
  )
}
