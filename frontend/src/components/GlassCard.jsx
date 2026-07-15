import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hoverEffect = false, delay = 0 }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay }
    }
  }

  const hoverProps = hoverEffect ? {
    whileHover: { 
      y: -2, 
      borderColor: 'rgba(37, 99, 235, 0.25)',
      boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.06)',
      backgroundColor: '#FFFFFF'
    },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {}

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...hoverProps}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
