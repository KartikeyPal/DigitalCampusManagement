import React from 'react'

const ActivityRow = ({ text, time }) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-800/50 bg-zinc-900/30 px-4 py-3 hover:bg-zinc-900/60 transition-colors">
        <span className="text-sm text-zinc-300">{text}</span>
        <span className="text-xs font-medium text-zinc-500 font-mono">{time}</span>
    </div>
  )
}

export default ActivityRow