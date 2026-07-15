import React, { useState, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Sidebar from './components/Sidebar'
import { FiMenu, FiLayers } from 'react-icons/fi'

// Lazy loaded page components for optimal bundle-splitting
const Home = lazy(() => import('./components/Home'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const NotFound = lazy(() => import('./components/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function AppContent() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen w-full text-slate-700 bg-[#F8FAFC] relative overflow-hidden">
      {/* Persistent/Responsive Left Navigation Sidebar */}
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      {/* Right Main Content Shell - scrollable area while sidebar is fixed */}
      <div className="flex flex-col flex-grow min-w-0 h-screen overflow-y-auto bg-[#F8FAFC]">
        {/* Mobile-only Header bar */}
        <header className="md:hidden h-16 w-full flex items-center justify-between px-5 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white">
              <FiLayers size={16} />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-850">ResuScan</span>
          </div>
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all animate-none"
          >
            <FiMenu size={20} />
          </button>
        </header>

        {/* Main Application Routes Container */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-start">
          <Suspense fallback={
            <div className="flex-grow flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyzer" element={<Dashboard />} />
              {/* Handles all other paths to render the 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Minimal SaaS Footer */}
        <footer className="w-full border-t border-slate-100 py-4 text-center text-xs text-slate-400 shrink-0 bg-white">
          <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
            <span>ResuScan</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ToastProvider>
  )
}
