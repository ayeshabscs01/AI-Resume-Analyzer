import React from 'react'
import GlassCard from './GlassCard'

// Helper component for pulsing loading boxes
const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-slate-800/60 rounded-lg ${className}`} />
)

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {[1, 2, 3, 4].map((i) => (
        <GlassCard key={i} className="p-5 flex flex-col items-center justify-center text-center">
          <SkeletonPulse className="h-3 w-16 mb-3" />
          <SkeletonPulse className="h-8 w-12 rounded-xl mb-4" />
          <SkeletonPulse className="h-1.5 w-full rounded-full" />
        </GlassCard>
      ))}
    </div>
  )
}

export function AnalysisResultsSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-slate-800/80" />
          <div className="space-y-2">
            <div className="h-5 w-40 bg-slate-800/80 rounded" />
            <div className="h-3.5 w-24 bg-slate-800/80 rounded" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-28 bg-slate-800/80 rounded" />
          <div className="h-4 w-28 bg-slate-800/80 rounded" />
          <div className="h-4 w-28 bg-slate-800/80 rounded" />
        </div>
      </GlassCard>

      {/* Main Charts Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col items-center justify-center p-8 min-h-[300px]">
          <div className="h-3.5 w-28 bg-slate-800/80 rounded mb-6" />
          <div className="w-36 h-36 rounded-full border-8 border-slate-800/40 flex items-center justify-center">
            <div className="h-8 w-12 bg-slate-800/80 rounded" />
          </div>
        </GlassCard>

        <GlassCard className="col-span-1 md:col-span-2 flex flex-col p-8 min-h-[300px]">
          <div className="h-3.5 w-32 bg-slate-800/80 rounded mb-6" />
          <div className="w-full h-40 bg-slate-800/40 rounded-xl flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-850/60" />
          </div>
        </GlassCard>
      </div>

      {/* Stats Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} className="p-5 flex flex-col items-center">
            <div className="h-3 w-16 bg-slate-800/80 rounded mb-2.5" />
            <div className="h-7 w-12 bg-slate-800/80 rounded-xl mb-3" />
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full" />
          </GlassCard>
        ))}
      </div>

      {/* Tabs list skeleton */}
      <div className="flex border-b border-slate-900 space-x-6 pb-2">
        <div className="h-4 w-32 bg-slate-800/80 rounded" />
        <div className="h-4 w-36 bg-slate-800/80 rounded" />
        <div className="h-4 w-28 bg-slate-800/80 rounded" />
      </div>

      {/* Main Grid evaluation skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <div className="h-4.5 w-24 bg-slate-800/80 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-11/12 bg-slate-800/80 rounded" />
            <div className="h-3 w-10/12 bg-slate-800/80 rounded" />
          </div>
        </GlassCard>
        <GlassCard className="p-6 space-y-4">
          <div className="h-4.5 w-32 bg-slate-800/80 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-11/12 bg-slate-800/80 rounded" />
            <div className="h-3 w-9/12 bg-slate-800/80 rounded" />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export function HistorySkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-6 w-48 bg-slate-800/85 rounded mb-2" />
          <div className="h-3 w-64 bg-slate-800/85 rounded" />
        </div>
        <div className="h-9 w-28 bg-slate-800/85 rounded-xl" />
      </div>
      
      <GlassCard className="p-0 overflow-hidden">
        <div className="divide-y divide-slate-900">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3.5 w-1/3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/85 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 w-3/4 bg-slate-800/85 rounded" />
                  <div className="h-3 w-1/2 bg-slate-800/85 rounded" />
                </div>
              </div>
              <div className="w-1/4 h-3.5 bg-slate-800/85 rounded" />
              <div className="w-20 h-7 bg-slate-800/85 rounded-full" />
              <div className="flex space-x-2 shrink-0">
                <div className="w-7 h-7 bg-slate-800/85 rounded-lg" />
                <div className="w-7 h-7 bg-slate-800/85 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
