import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, FiCpu, FiLayers, 
  FiChevronLeft, FiChevronRight, FiX 
} from 'react-icons/fi'

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation()
  
  const links = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/analyzer", label: "Resume Analyzer", icon: FiCpu },
  ]

  const isActive = (path) => location.pathname === path

  const sidebarVariants = {
    expanded: { width: '240px', transition: { duration: 0.25, ease: 'easeInOut' } },
    collapsed: { width: '80px', transition: { duration: 0.25, ease: 'easeInOut' } }
  }

  const textVariants = {
    expanded: { opacity: 1, x: 0, display: 'block', transition: { delay: 0.05, duration: 0.15 } },
    collapsed: { opacity: 0, x: -10, transitionEnd: { display: 'none' }, transition: { duration: 0.08 } }
  }

  const InnerContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className={`flex items-center h-16 border-b border-slate-200 px-5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <Link to="/" className="flex items-center space-x-2.5" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/10 shrink-0">
            <FiLayers size={18} />
          </div>
          {!collapsed && (
            <motion.span 
              initial="expanded" 
              animate={collapsed ? 'collapsed' : 'expanded'}
              variants={textVariants}
              className="font-extrabold text-base tracking-tight text-slate-800"
            >
              ResuScan
            </motion.span>
          )}
        </Link>

        {/* Mobile close button */}
        <button 
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-450 hover:text-slate-800 hover:bg-slate-100"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow py-5 px-3.5 space-y-1 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const Icon = link.icon
          const active = isActive(link.path)
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center rounded-lg p-2.5 text-sm font-medium transition-all duration-150 group border
                ${active 
                  ? 'bg-blue-50/70 border-blue-100/40 text-primary font-semibold' 
                  : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50'}
                ${collapsed ? 'justify-center' : 'space-x-3'}
              `}
            >
              <Icon size={18} className={`shrink-0 transition-transform duration-150 group-hover:scale-105 ${active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
              {!collapsed && (
                <motion.span
                  initial="expanded"
                  animate={collapsed ? 'collapsed' : 'expanded'}
                  variants={textVariants}
                  className="leading-none whitespace-nowrap"
                >
                  {link.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Desktop Collapse Toggle Footer */}
      <div className="hidden md:flex p-4 border-t border-slate-200 justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-2 px-3 flex items-center justify-center text-slate-450 hover:text-slate-850 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
        >
          {collapsed ? <FiChevronRight size={18} /> : (
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider">
              <FiChevronLeft size={16} />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (fixed/sticky) */}
      <motion.aside
        initial="expanded"
        animate={collapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className="hidden md:block h-screen sticky top-0 shrink-0 z-45"
      >
        <InnerContent />
      </motion.aside>

      {/* Mobile Drawer (visible on SM/XS when mobileOpen is true) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 pointer-events-auto"
            />
            {/* Slide-out Sidebar Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-[240px] z-50 pointer-events-auto"
            >
              <InnerContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
