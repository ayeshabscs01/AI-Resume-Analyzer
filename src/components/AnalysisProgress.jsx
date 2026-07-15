import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiLoader, FiCheck, FiCpu } from 'react-icons/fi'

const STEPS = [
  "Reading uploaded document...",
  "Extracting plain text metadata...",
  "Running local entity processing with spaCy...",
  "Applying OpenAI GPT matching formulas...",
  "Building resume scoring charts..."
]

export default function AnalysisProgress({ isAnalyzing }) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0)
      return
    }

    // Progress through first few steps mock-style to keep user engaged during API call
    const intervals = [1200, 1800, 2400, 4000]
    
    let timer
    const run = (index) => {
      if (index >= STEPS.length - 1) return
      timer = setTimeout(() => {
        setCurrentStep(index + 1)
        run(index + 1)
      }, intervals[index] || 2000)
    }

    run(0)

    return () => clearTimeout(timer)
  }, [isAnalyzing])

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      {/* Top Graphic */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-xl opacity-20 w-24 h-24"
        />
        <div className="relative w-24 h-24 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-primary-light">
          <FiCpu size={38} className="animate-pulse" />
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep
          const isActive = idx === currentStep
          const isPending = idx > currentStep

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3.5 p-3.5 rounded-custom border transition-all duration-300
                ${isActive ? 'bg-primary/5 border-primary/20 scale-[1.02]' : 'bg-slate-950/20 border-slate-900'}
                ${isDone ? 'opacity-70' : ''}
              `}
            >
              <div className="flex-shrink-0">
                {isDone && (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">
                    <FiCheck size={12} />
                  </div>
                )}
                {isActive && (
                  <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center text-primary text-xs">
                    <FiLoader size={12} className="animate-spin" />
                  </div>
                )}
                {isPending && (
                  <div className="w-5 h-5 rounded-full border border-slate-850 flex items-center justify-center text-slate-600 text-xs">
                    •
                  </div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors
                ${isActive ? 'text-slate-100' : 'text-slate-400'}
                ${isDone ? 'text-slate-500 line-through' : ''}
              `}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
