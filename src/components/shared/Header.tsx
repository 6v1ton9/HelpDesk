import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Icons } from '../ui/Icons'
import { Button } from '../ui/Button'

export const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icons.dashboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg font-semibold">Help Desk System</h1>
            {user && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <Button variant="ghost" onClick={logout}>
              <Icons.logout className="w-4 h-4 mr-2" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}