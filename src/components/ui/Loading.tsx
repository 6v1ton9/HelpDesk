import React from 'react'

interface LoadingProps {
  className?: string
  text?: string
}

export const Loading: React.FC<LoadingProps> = ({ 
  className = '', 
  text = 'Carregando...' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2" />
      <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  )
}