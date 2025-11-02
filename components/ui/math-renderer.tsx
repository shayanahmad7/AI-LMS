"use client";

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface MathRendererProps {
  children: string
  className?: string
  block?: boolean
}

export function MathRenderer({ children, className = "", block = false }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null)
  const [katexLoaded, setKatexLoaded] = useState(false)

  useEffect(() => {
    // Check if KaTeX is already loaded
    if (typeof window !== "undefined" && (window as any).katex) {
      setKatexLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!katexLoaded || !containerRef.current) return

    try {
      const katex = (window as any).katex
      // Extract LaTeX from $$ delimiters
      const latex = children.replace(/^\$\$|\$\$$/g, "").trim()

      katex.render(latex, containerRef.current, {
        throwOnError: false,
        displayMode: block,
        output: "html",
      })
    } catch (error) {
      console.error("[v0] Failed to render math:", error)
      // Fallback to showing the raw LaTeX
      if (containerRef.current) {
        containerRef.current.textContent = children
      }
    }
  }, [children, block, katexLoaded])

  if (block) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
          integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8"
          crossOrigin="anonymous"
          onLoad={() => setKatexLoaded(true)}
        />
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`my-4 ${className}`} />
      </>
    )
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
        integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8"
        crossOrigin="anonymous"
        onLoad={() => setKatexLoaded(true)}
      />
      <span ref={containerRef as React.RefObject<HTMLSpanElement>} className={className} />
    </>
  )
}

// Helper component to parse and render mixed text with math
interface MathTextProps {
  children: string
  className?: string
}

export function MathText({ children, className = "" }: MathTextProps) {
  // Split text by $$ delimiters
  const parts = children.split(/(\$\$[^$]+\$\$)/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <MathRenderer key={index}>{part}</MathRenderer>
        }
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}
