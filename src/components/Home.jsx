import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiUploadCloud, FiCpu, FiAward, FiBookOpen, 
  FiCheckSquare, FiClock, FiArrowRight, FiCheck 
} from 'react-icons/fi'
import GlassCard from './GlassCard'

export default function Home() {
  const [mockScore, setMockScore] = useState(82)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const features = [
    {
      title: 'Resume Upload',
      desc: 'Upload your resume in PDF or DOCX format. Your file is processed securely and analyzed within a few seconds.',
      icon: <FiUploadCloud size={20} />
    },
    {
      title: 'AI Resume Analysis',
      desc: 'Our AI reviews your resume and highlights what is good and what needs improvement.',
      icon: <FiCpu size={20} />
    },
    {
      title: 'ATS Score',
      desc: 'See how well your resume can perform in Applicant Tracking Systems (ATS) used by many companies.',
      icon: <FiAward size={20} />
    },
    {
      title: 'Skills Analysis',
      desc: 'Find missing skills and keywords that can improve your chances of getting shortlisted.',
      icon: <FiBookOpen size={20} />
    },
    {
      title: 'Improvement Tips',
      desc: 'Receive simple and practical suggestions to make your resume stronger and more professional.',
      icon: <FiCheckSquare size={20} />
    },
    {
      title: 'Quick Results',
      desc: 'Get your complete resume analysis in just a few seconds with an easy-to-read report.',
      icon: <FiClock size={20} />
    }
  ]

  return (
    <div className="w-full space-y-16 pt-4 pb-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none"
          >
            Optimize Your Resume. <br />
            <span className="text-primary">
              Beat ATS Screeners.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-semibold"
          >
            Upload your resume and receive an AI-powered analysis in seconds. Check your ATS score, identify your strengths, discover areas for improvement, and get simple suggestions to make your resume stronger for recruiters.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/analyzer" className="btn-gradient flex items-center justify-center space-x-2 text-sm font-bold py-3 px-7">
              <span>Start Free Scan</span>
              <FiArrowRight size={16} />
            </Link>
            <a href="#features" className="btn-secondary flex items-center justify-center space-x-2 text-sm font-bold py-3 px-6">
              <span>Explore Features</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ATS Score Match Simulator mockup widget */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <GlassCard className="relative overflow-hidden p-6 border-slate-200/80 shadow-lg bg-white">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Score Simulator</span>
            </div>

            <div className="space-y-6">
              {/* Score indicator display */}
              <div className="flex flex-col items-center justify-center py-4 bg-slate-50/50 border border-slate-100 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-bold mb-3">Simulated Match Score</span>
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="#E2E8F0" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="56" cy="56" r="48" 
                      stroke="#2563EB" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="301.5"
                      strokeDashoffset={301.5 - (301.5 * mockScore) / 100}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <span className="absolute text-2xl font-black text-slate-800">{mockScore}%</span>
                </div>
                
                {/* Score slider control */}
                <div className="w-full mt-5 px-2">
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={mockScore} 
                    onChange={(e) => setMockScore(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-bold">
                    <span>Weak Match</span>
                    <span>Strong Match</span>
                  </div>
                </div>
              </div>

              {/* Status details indicators */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl border border-slate-100 bg-white flex items-center justify-between text-xs text-slate-650 font-bold">
                  <div className="flex items-center space-x-2">
                    <FiCheck className="text-emerald-500" />
                    <span>Keywords Match</span>
                  </div>
                  <span className="text-slate-800">{mockScore >= 75 ? '92%' : '48%'}</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-white flex items-center justify-between text-xs text-slate-650 font-bold">
                  <div className="flex items-center space-x-2">
                    <FiCheck className="text-emerald-500" />
                    <span>Formatting Screen</span>
                  </div>
                  <span className="text-emerald-600">Passed ✓</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="space-y-10 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-850 tracking-tight">Features</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-semibold">
            Simple and easy tools to analyze and strengthen your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <GlassCard key={idx} hoverEffect={true} className="space-y-3.5 border-slate-200/60 shadow-sm bg-white p-5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0 select-none">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-800">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {feat.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
