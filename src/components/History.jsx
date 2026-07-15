import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiClock, FiFileText, FiAward, FiArrowLeft, FiDatabase } from 'react-icons/fi'
import GlassCard from './GlassCard'
import ResultsDisplay from './ResultsDisplay'

export default function History() {
  const [historyItems, setHistoryItems] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const items = JSON.parse(localStorage.getItem('resu_history') || '[]')
      // Sort newest first
      items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setHistoryItems(items)
    } catch (e) {
      setHistoryItems([])
    }
  }

  const deleteItem = (id, e) => {
    e.stopPropagation()
    const updated = historyItems.filter(item => item.id !== id)
    localStorage.setItem('resu_history', JSON.stringify(updated))
    setHistoryItems(updated)
  }

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire analysis history?")) {
      localStorage.setItem('resu_history', '[]')
      setHistoryItems([])
    }
  }

  // Inject a mock report for visual demonstrations
  const loadMockDemo = () => {
    const mockReport = {
      id: 'demo-123',
      timestamp: new Date().toISOString(),
      filename: 'Sample_Resume_Senior_Engineer.pdf',
      name: 'Sarah Jenkins',
      overall_score: 84,
      data: {
        contact_info: {
          name: "Sarah Jenkins",
          email: "sarah.jenkins@example.com",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA"
        },
        education: [
          {
            institution: "University of California, Berkeley",
            degree: "Master of Science in Computer Science",
            year: "2019"
          }
        ],
        experience: [
          {
            company: "Apex Cloud Services",
            role: "Senior Full Stack Engineer",
            duration: "2021 - Present",
            responsibilities: [
              "Led migration of microservices architecture to Kubernetes, improving cluster utilization by 40%.",
              "Spearheaded redesign of customer web portals using Next.js/React and Tailwind CSS, increasing page conversions by 25%.",
              "Architected secure, scalable APIs using FastAPI and Node.js, managing 5M+ daily requests."
            ]
          },
          {
            company: "DevLaunch Inc.",
            role: "Software Engineer",
            duration: "2019 - 2021",
            responsibilities: [
              "Developed responsive SaaS dashboard modules using React and Redux.",
              "Implemented automated End-to-End browser test coverage using Cypress, lowering production regressions by 15%."
            ]
          }
        ],
        skills: [
          { skill: "React", category: "Frameworks", level: "Expert", matched: true },
          { skill: "Next.js", category: "Frameworks", level: "Expert", matched: true },
          { skill: "FastAPI", category: "Frameworks", level: "Expert", matched: true },
          { skill: "Python", category: "Languages", level: "Expert", matched: true },
          { skill: "JavaScript", category: "Languages", level: "Expert", matched: true },
          { skill: "SQL", category: "Languages", level: "Intermediate", matched: true },
          { skill: "Kubernetes", category: "Tools & Platforms", level: "Intermediate", matched: true },
          { skill: "Docker", category: "Tools & Platforms", level: "Expert", matched: true },
          { skill: "AWS", category: "Tools & Platforms", level: "Intermediate", matched: false }
        ],
        missing_skills: ["Terraform", "Redis", "TypeScript"],
        overall_score: 84,
        skills_score: 88,
        experience_score: 85,
        readability_score: 75,
        strengths: [
          "Strong core microservice architectures design skills using FastAPI.",
          "Excellent modern framework usage including React and Next.js.",
          "Clear experience scaling applications and leading architectural changes."
        ],
        weaknesses: [
          "Missing TypeScript skills, which are crucial for type safety in modern UI applications.",
          "Cypress automation and test coverages could be presented with more business metric details.",
          "Readability and layout structure can be improved with clear horizontal divider grids."
        ],
        recommendations: [
          "Incorporate TypeScript keywords explicitly in your skills list to capture ATS match patterns.",
          "Quantify the performance gains in Next.js portal migrations in terms of load times (e.g. speed index).",
          "Ensure formatting contains distinct columns for tools and frameworks to speed scanning."
        ],
        bullet_point_improvements: [
          {
            original: "Developed responsive SaaS dashboard modules using React.",
            improved: "Designed and launched 8 critical responsive React SaaS panels, decreasing portal load times by 22%.",
            reason: "Highlights volume, scope, and quantitative user experience enhancements."
          }
        ]
      }
    }
    
    const updated = [mockReport, ...historyItems]
    localStorage.setItem('resu_history', JSON.stringify(updated))
    setHistoryItems(updated)
  }

  // If a report is selected, render it inline
  if (selectedReport) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedReport(null)}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors py-1.5"
        >
          <FiArrowLeft size={16} />
          <span className="text-sm font-semibold">Back to History List</span>
        </button>
        <ResultsDisplay data={selectedReport} onReset={() => setSelectedReport(null)} />
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Analysis History</h2>
          <p className="text-slate-400 text-sm mt-0.5">Manage and revisit previous resume matching evaluations.</p>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/20 border border-red-500/10 text-red-400 hover:bg-red-950/50 transition-colors"
          >
            <FiTrash2 size={13} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {historyItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {historyItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <GlassCard
                  hoverEffect={true}
                  className="flex items-center justify-between p-5 cursor-pointer"
                >
                  <div 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-grow"
                    onClick={() => setSelectedReport(item.data)}
                  >
                    {/* Score badge */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-white flex-shrink-0">
                      <span className="text-sm font-extrabold">{item.overall_score}%</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <FiFileText size={14} className="text-slate-400" />
                        <span>{item.filename}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="text-slate-350">{item.name || 'Candidate'}</span>
                        <span className="flex items-center gap-1">
                          <FiClock size={11} />
                          {new Date(item.timestamp).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteItem(item.id, e)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800 ml-4 flex-shrink-0"
                    title="Delete record"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <GlassCard className="max-w-md mx-auto p-10 flex flex-col items-center justify-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-550">
                <FiDatabase size={30} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200">No Reports Yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                  Your scanned documents will be cataloged here automatically. Run your first analysis to populate this page.
                </p>
              </div>
              <button
                onClick={loadMockDemo}
                className="btn-secondary py-2 px-4 text-xs font-semibold flex items-center space-x-1.5"
              >
                <span>Load Mock Report Demo</span>
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
