import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiHelpCircle } from 'react-icons/fi'
import GlassCard from './GlassCard'

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background glowing shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center z-10"
      >
        <GlassCard className="p-8 space-y-6 border border-white/10 shadow-2xl">
          {/* Animated 404 Graphic */}
          <div className="flex justify-center relative">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="text-7xl font-extrabold bg-gradient-to-r from-primary-light via-accent to-blue-400 bg-clip-text text-transparent select-none tracking-tight"
            >
              404
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="absolute -top-3 right-1/4 text-accent/30"
            >
              <FiHelpCircle size={28} />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Lost in the Cloud?</h1>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs mx-auto">
              The page you are looking for does not exist or has been relocated to another workspace.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="btn-gradient flex items-center justify-center space-x-2 py-3 px-6 text-xs font-semibold w-full"
            >
              <FiHome size={14} />
              <span>Back to Home</span>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
