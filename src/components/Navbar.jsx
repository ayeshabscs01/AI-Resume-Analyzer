import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiCpu, FiClock, FiSettings, FiMenu, FiX, FiLayers, FiHome } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/analyzer', label: 'Analyzer', icon: FiCpu },
    { path: '/history', label: 'History', icon: FiClock },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0B0F19]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-md shadow-primary/20">
              <FiLayers size={18} />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">
              ResuScan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => {
              const Icon = link.icon
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${active 
                      ? 'bg-primary/10 border border-primary/20 text-white' 
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'}
                  `}
                >
                  <Icon size={15} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-900 bg-[#0B0F19]/95 px-4 py-3 space-y-1.5">
          {links.map(link => {
            const Icon = link.icon
            const active = isActive(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all
                  ${active 
                    ? 'bg-primary/10 border border-primary/20 text-white' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'}
                `}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
