import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCpu, FiAlertTriangle, FiArrowRight, FiTrash2 } from 'react-icons/fi'
import GlassCard from './GlassCard'
import ResumeDropzone from './ResumeDropzone'
import ResultsDisplay from './ResultsDisplay'
import { AnalysisResultsSkeleton } from './SkeletonLoader'
import { analyzeResume } from '../services/api'
import { useToast } from '../context/ToastContext'

export default function Dashboard() {
  const { addToast } = useToast()
  
  const [file, setFile] = useState(null)
  const [jobRole, setJobRole] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please upload a resume file first.')
      addToast('Please upload a resume file first.', 'warning')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setResult(null)

    try {
      const data = await analyzeResume(file, jobRole)
      setResult(data)
      addToast('Resume scanned successfully!', 'success')
    } catch (err) {
      console.error(err)
      const detail = err.response?.data?.detail || err.message || 'Unknown network error.'
      const errMsg = `Analysis failed: ${detail}. Please ensure your backend server is running.`
      setError(errMsg)
      addToast('Resume analysis failed.', 'error')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setJobRole('')
    setResult(null)
    setError('')
    addToast('Scanner reset complete.', 'info')
  }

  // State: Loading / Skeletons View
  if (isAnalyzing) {
    return (
      <div className="w-full space-y-8 py-4">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-4 animate-none">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Analyzing Resume...</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            We're reviewing your resume to give you helpful feedback. This takes a few seconds.
          </p>
        </div>
        <AnalysisResultsSkeleton />
      </div>
    )
  }

  // State: Results View
  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-4"
      >
        <ResultsDisplay data={result} onReset={handleReset} />
      </motion.div>
    )
  }

  // State: Main Dashboard view
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 py-4">
      {/* Visual Hero Heading */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-primary mb-2 select-none"
        >
          <FiCpu className="animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI-Powered Analysis</span>
        </motion.div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-850 sm:leading-none">
          Improve Your Resume in Seconds
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Upload your resume and get simple, actionable feedback. Add a job role for tailored suggestions.
        </p>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropzone File Upload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Upload Your Resume
              </label>
              {file && (
                <button
                  type="button"
                  onClick={() => { setFile(null); addToast('File cleared', 'info') }}
                  className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center space-x-1"
                >
                  <FiTrash2 size={12} />
                  <span>Clear</span>
                </button>
              )}
            </div>
            <ResumeDropzone file={file} setFile={setFile} error={error && !file ? error : ''} setError={setError} />
          </div>

          {/* Job Role Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Target Job Role (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Software Engineer, Frontend Developer, Data Analyst"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
            />
          </div>

          {/* Error Banners */}
          {error && file && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs flex items-start space-x-2">
              <FiAlertTriangle className="mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="btn-gradient flex items-center space-x-2 py-3 px-8 text-sm font-semibold"
            >
              <span>Analyze Resume</span>
              <FiArrowRight size={16} />
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}