import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils/helpers'
import { Icons } from '../ui/Icons'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Icons.dashboard },
  { name: 'Usuários', href: '/admin/users', icon: Icons.user },
  { name: 'Tickets', href: '/admin/tickets', icon: Icons.history },
  { name: 'Configurações', href: '/admin/settings', icon: Icons.settings },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-1 min-h-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Icons.dashboard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-3 text-xl font-bold">Help Desk</span>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                  )}
                >
                  <Icon
                    className={cn(
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-5 w-5'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}