import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from 'react-icons/fi'

export default function ResumeDropzone({ file, setFile, error, setError }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejectReason = rejectedFiles[0].errors[0]?.message || 'Invalid file type.'
      setError(rejectReason)
      return
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setError('')
    }
  }, [setFile, setError])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  })

  const removeFile = (e) => {
    e.stopPropagation()
    setFile(null)
    setError('')
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-custom p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-700 hover:border-primary/50 hover:bg-slate-900/30'}
          ${isDragReject || error ? 'border-red-500/80 bg-red-950/5' : ''}
          ${file ? 'border-emerald-500/50 bg-emerald-950/5' : ''}
        `}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-2">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full">
              <FiCheckCircle size={36} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              onClick={removeFile}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-red-400 bg-red-950/30 hover:bg-red-950/60 rounded-full border border-red-500/20 transition-colors"
            >
              <FiX size={12} />
              <span>Change File</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <div className={`p-4 bg-slate-900/60 rounded-full text-slate-400 border border-slate-800 transition-colors
              ${isDragActive ? 'text-primary border-primary/20 bg-primary/10' : ''}
            `}>
              <FiUploadCloud size={40} className={isDragActive ? 'animate-bounce' : ''} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume file'}
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, and TXT files (Max 10MB)</p>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-2 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
