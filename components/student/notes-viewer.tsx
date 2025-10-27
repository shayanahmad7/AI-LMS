"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

interface NotesViewerProps {
  chapterId: string
}

export function NotesViewer({ chapterId }: NotesViewerProps) {
  const [zoom, setZoom] = useState(100)

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b px-4 py-2 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Notes Content */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto" style={{ fontSize: `${zoom}%` }}>
          <Card className="p-8 bg-white">
            <h1 className="text-3xl font-bold mb-6">Logistic Regression</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-base leading-relaxed mb-4">
                Logistic regression is a statistical method for predicting binary outcomes. Despite its name, it's a
                classification algorithm rather than a regression algorithm. It's widely used in machine learning for
                binary classification problems.
              </p>
              <p className="text-base leading-relaxed">
                The algorithm works by using the logistic function (also called the sigmoid function) to model the
                probability that a given input belongs to a particular class.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">The Sigmoid Function</h2>
              <p className="text-base leading-relaxed mb-4">The sigmoid function is defined as:</p>
              <div className="bg-muted p-4 rounded-lg mb-4 font-mono text-sm">σ(z) = 1 / (1 + e^(-z))</div>
              <p className="text-base leading-relaxed">
                This function maps any real-valued number to a value between 0 and 1, making it perfect for representing
                probabilities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Properties</h2>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>Output is always between 0 and 1</li>
                <li>S-shaped curve that's symmetric around 0.5</li>
                <li>Smooth and differentiable everywhere</li>
                <li>Asymptotes at 0 and 1</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Applications</h2>
              <p className="text-base leading-relaxed mb-4">Logistic regression is commonly used in:</p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li>Medical diagnosis (disease present or absent)</li>
                <li>Email spam detection (spam or not spam)</li>
                <li>Credit scoring (default or no default)</li>
                <li>Marketing (customer will buy or not)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Training Process</h2>
              <p className="text-base leading-relaxed mb-4">
                The model is trained using maximum likelihood estimation, typically optimized with gradient descent. The
                cost function used is the log loss (binary cross-entropy):
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4 font-mono text-sm">
                J(θ) = -1/m Σ [y*log(h(x)) + (1-y)*log(1-h(x))]
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              <p className="text-base leading-relaxed">
                Logistic regression is a fundamental algorithm in machine learning that provides a probabilistic
                framework for binary classification. Its simplicity, interpretability, and effectiveness make it a go-to
                choice for many classification tasks.
              </p>
            </section>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
