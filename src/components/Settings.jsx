import React, { useState, useEffect } from 'react'
import { FiSave, FiRadio, FiCheck, FiAlertCircle, FiActivity } from 'react-icons/fi'
import GlassCard from './GlassCard'
import { checkApiHealth } from '../services/api'

export default function Settings() {
  const [endpoint, setEndpoint] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' })
  
  // Health check status states
  const [healthStatus, setHealthStatus] = useState(null)
  const [checkingHealth, setCheckingHealth] = useState(false)

  useEffect(() => {
    setEndpoint(localStorage.getItem('resu_api_endpoint') || '')
    setApiKey(localStorage.getItem('resu_openai_key') || '')
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    
    try {
      localStorage.setItem('resu_api_endpoint', endpoint.trim())
      localStorage.setItem('resu_openai_key', apiKey.trim())
      
      setStatusMsg({ text: 'Settings saved successfully!', type: 'success' })
      setTimeout(() => setStatusMsg({ text: '', type: '' }), 3000)
    } catch (err) {
      setStatusMsg({ text: 'Failed to save settings to localStorage.', type: 'error' })
    }
  }

  const runHealthCheck = async () => {
    setCheckingHealth(true)
    setHealthStatus(null)
    try {
      const data = await checkApiHealth()
      setHealthStatus({
        ok: true,
        spacy: data.spacy_loaded,
        openai: data.openai_configured
      })
    } catch (err) {
      setHealthStatus({
        ok: false,
        detail: err.message || 'Could not establish connection to the backend server.'
      })
    } finally {
      setCheckingHealth(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-slate-400 text-sm mt-0.5">Configure endpoints, overrides, and test api server nodes.</p>
      </div>

      <GlassCard>
        <form onSubmit={handleSave} className="space-y-6">
          {/* API Server Endpoint Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Backend Endpoint URL
            </label>
            <input
              type="url"
              placeholder="e.g. http://localhost:8000"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-custom px-4 py-3 text-sm text-slate-100 placeholder-slate-650 transition-all outline-none"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Leave this empty to run through the default relative proxy (Vite proxy `/api` pointing to `localhost:8000`). If running the frontend in production, specify your custom domain endpoint.
            </p>
          </div>

          {/* OpenAI Key Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              OpenAI API Key (Override)
            </label>
            <input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-custom px-4 py-3 text-sm text-slate-100 placeholder-slate-650 transition-all outline-none"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Optionally supply your own API key to bypass local server defaults. The key is securely preserved in your local web browser memory space (`localStorage`) and never saved on our databases.
            </p>
          </div>

          {/* Feedback banners */}
          {statusMsg.text && (
            <div className={`p-4 rounded-custom text-sm flex items-center space-x-2 border
              ${statusMsg.type === 'success' 
                ? 'bg-emerald-950/20 border-emerald-500/10 text-emerald-300' 
                : 'bg-red-950/20 border-red-500/10 text-red-300'}
            `}>
              {statusMsg.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn-gradient flex items-center space-x-2 py-2.5 px-5 text-sm"
            >
              <FiSave size={16} />
              <span>Save Configurations</span>
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Diagnostics / Diagnostics Card */}
      <GlassCard className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Connection Diagnostics</h3>
            <p className="text-xs text-slate-500 mt-0.5">Test communication pathways with target server.</p>
          </div>
          <button
            onClick={runHealthCheck}
            disabled={checkingHealth}
            className="btn-secondary py-2 px-4 text-xs font-semibold flex items-center space-x-2 disabled:opacity-55"
          >
            <FiActivity className={checkingHealth ? 'animate-spin' : ''} />
            <span>{checkingHealth ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>

        {/* Diagnostic Results */}
        {healthStatus && (
          <div className={`p-4 rounded-xl border space-y-2.5 text-xs
            ${healthStatus.ok ? 'bg-slate-900/40 border-slate-800' : 'bg-red-950/15 border-red-500/15'}
          `}>
            {healthStatus.ok ? (
              <>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <FiCheck />
                  <span className="font-bold">FastAPI Connection Successful!</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1 border-t border-slate-800/60">
                  <div>spaCy Core NLP Model:</div>
                  <div className="font-medium text-slate-200">{healthStatus.spacy ? 'Loaded ✓' : 'Failed ⚠️'}</div>
                  <div>OpenAI Configuration:</div>
                  <div className="font-medium text-slate-200">{healthStatus.openai ? 'Configured (Env) ✓' : 'Not Configured (Using Local Fallback) ⚠️'}</div>
                </div>
              </>
            ) : (
              <div className="flex items-start space-x-2 text-red-400">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block mb-1">Server Check Failed</span>
                  <span className="leading-relaxed">{healthStatus.detail}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  )
}
