import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { Loading } from './components/ui/Loading'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import CollaboratorDashboard from './pages/CollaboratorDashboard'
import RegisterPage from './pages/RegisterPage'
import { useAuth } from './contexts/AuthContext'

// Componente wrapper para rotas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'collaborator' | 'any'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'any' 
}) => {
  const { user, isLoading, isSuperAdmin } = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Simular tempo de verificação
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Verificando autenticação..." />
      </div>
    )
  }

  // Se não tem usuário logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Verificar se usuário está ativo
  if (!user.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-2">Conta Desativada</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sua conta foi desativada. Entre em contato com o administrador do sistema.
          </p>
        </div>
      </div>
    )
  }

  // Verificar permissões de rota
  if (requiredRole === 'admin' && !isSuperAdmin) {
    return <Navigate to="/collaborator-dashboard" replace />
  }

  if (requiredRole === 'collaborator' && isSuperAdmin) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}

// Componente principal da aplicação
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota raiz - redireciona baseado no login */}
        <Route 
          path="/" 
          element={
            <AuthRedirect />
          } 
        />
        
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rotas protegidas - Admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Rotas protegidas - Colaborador */}
        <Route 
          path="/collaborator-dashboard" 
          element={
            <ProtectedRoute requiredRole="collaborator">
              <CollaboratorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Página 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

// Componente para redirecionamento automático
const AuthRedirect: React.FC = () => {
  const { user, isLoading, isSuperAdmin } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Carregando..." />
      </div>
    )
  }

  if (user) {
    // Se for super admin, vai para painel admin
    if (isSuperAdmin) {
      return <Navigate to="/admin" replace />
    }
    // Se for colaborador, vai para painel colaborador
    return <Navigate to="/collaborator-dashboard" replace />
  }

  // Se não estiver logado, vai para login
  return <Navigate to="/login" replace />
}

// Página 404 personalizada
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="space-y-3">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para o início
          </a>
          <br />
          <a
            href="/login"
            className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Fazer login
          </a>
        </div>
      </div>
    </div>
  )
}

// Componente App principal
const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Inicialização da aplicação
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">HD</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Help Desk System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Inicializando sistema...
          </p>
          <div className="mt-8">
            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App