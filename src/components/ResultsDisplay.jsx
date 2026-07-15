import React from 'react'
import { motion } from 'framer-motion'
import { FiFileText, FiCheckCircle, FiAlertTriangle, FiCpu, FiAward, FiArrowLeft, FiCheck } from 'react-icons/fi'
import GlassCard from './GlassCard'
import { useToast } from '../context/ToastContext'

export default function ResultsDisplay({ data, onReset }) {
  const { addToast } = useToast()

  // Destructure analysis result properties with safe defaults
  const {
    overall_score = 0,
    suggested_resume_summary = '',
    strengths = [],
    weaknesses = [],
    missing_skills = [],
    recommendations = [],
    resume_rating = 'Good'
  } = data

  // Linear slide transition configurations
  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
      {/* Header controls row */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onReset}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-primary transition-colors py-1.5 px-3 bg-white border border-slate-200 shadow-sm rounded-lg select-none"
        >
          <FiArrowLeft size={14} />
          <span>Analyze Another Resume</span>
        </button>
        <span className="text-xs text-slate-400 font-bold select-none">Your Results</span>
      </div>

      <GlassCard className="p-6 space-y-6 border-slate-200/80 shadow-md bg-white">
        
        {/* 1. Circular Overall ATS Score */}
        <motion.div 
          variants={sectionVariants} 
          initial="hidden" 
          animate="visible"
          className="text-center space-y-4 pb-4 border-b border-slate-100"
        >
          <div className="relative w-32 h-32 flex items-center justify-center mx-auto select-none">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
              <circle 
                cx="64" cy="64" r="56" 
                stroke="#2563EB" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray={351.86}
                strokeDashoffset={351.86 - (351.86 * overall_score) / 100}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800">{overall_score}%</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">ATS Score</span>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800">Your Resume Score</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold">
              {overall_score >= 80 
                ? "Great job! Your resume is well-prepared for applicant tracking systems."
                : overall_score >= 60
                ? "Good effort! Your resume has solid foundations but can be improved."
                : "Your resume needs some work to get past ATS filters."}
            </p>
          </div>
        </motion.div>

        {/* 2. Resume Summary */}
        {suggested_resume_summary && (
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 text-primary">
              <FiFileText size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 leading-none">Resume Summary</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold bg-slate-50 border border-slate-100/50 rounded-xl p-4">
              {suggested_resume_summary}
            </p>
          </motion.div>
        )}

        {/* 3. Resume Strengths */}
        {strengths && strengths.length > 0 && (
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 text-emerald-600">
              <FiCheckCircle size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 leading-none">Strengths</h3>
            </div>
            <ul className="space-y-2.5 pl-1">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600 font-semibold">
                  <FiCheck className="text-emerald-500 mt-0.5 shrink-0" size={15} />
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* 4. Areas to Improve */}
        {weaknesses && weaknesses.length > 0 && (
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 text-amber-600">
              <FiAlertTriangle size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 leading-none">Areas to Improve</h3>
            </div>
            <ul className="space-y-2.5 pl-1">
              {weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{weak}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* 5. Missing Skills */}
        {missing_skills && missing_skills.length > 0 && (
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 text-primary">
              <FiCpu size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 leading-none">Missing Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 pl-1">
              {missing_skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-primary border border-blue-100 uppercase tracking-wide select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. Final Recommendation */}
        <motion.div 
          variants={sectionVariants} 
          initial="hidden" 
          animate="visible"
          className="pt-4 border-t border-slate-100"
        >
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100/40 flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-primary text-white shrink-0 shadow-sm shadow-primary/10 select-none">
              <FiAward size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Final Recommendation</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {recommendations && recommendations.length > 0 
                  ? recommendations[0] 
                  : `Your resume is in ${resume_rating} shape. Make the suggested improvements to get more interviews.`}
              </p>
            </div>
          </div>
        </motion.div>

      </GlassCard>

      {/* Action restart button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onReset}
          className="btn-gradient px-8 py-3 text-sm font-bold flex items-center space-x-2"
        >
          <span>Analyze Another Resume</span>
        </button>
      </div>
    </div>
  )
}