import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Icon mapping by toast type
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle size={18} className="text-emerald-400 shrink-0" />
      case 'error':
        return <FiAlertTriangle size={18} className="text-red-400 shrink-0" />
      case 'warning':
        return <FiAlertTriangle size={18} className="text-amber-400 shrink-0" />
      default:
        return <FiInfo size={18} className="text-blue-400 shrink-0" />
    }
  }

  // Border and background mapping
  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-slate-950/85 border-emerald-500/20 text-slate-100 shadow-emerald-950/10'
      case 'error':
        return 'bg-slate-950/85 border-red-500/20 text-slate-100 shadow-red-950/10'
      case 'warning':
        return 'bg-slate-950/85 border-amber-500/20 text-slate-100 shadow-amber-950/10'
      default:
        return 'bg-slate-950/85 border-blue-500/20 text-slate-100 shadow-blue-950/10'
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
              className={`pointer-events-auto border backdrop-blur-md px-4 py-3.5 rounded-xl shadow-lg flex items-center justify-between gap-3 ${getColors(
                toast.type
              )}`}
            >
              <div className="flex items-center gap-3">
                {getIcon(toast.type)}
                <span className="text-xs font-semibold leading-relaxed select-none">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-900 border border-transparent"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
