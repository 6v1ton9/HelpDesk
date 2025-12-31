import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCollaboratorAuth } from '../hooks/useCollaboratorAuth'
import { Icons } from '../components/ui/Icons'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginType, setLoginType] = useState<'admin' | 'collaborator'>('admin')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login: adminLogin } = useAuth()
  const { login: collaboratorLogin, isLoading: collaboratorLoading } = useCollaboratorAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (loginType === 'admin') {
        // Login como administrador
        const result = await adminLogin(username, password)
        if (!result.success) {
          setError(result.error || 'Credenciais inválidas')
          return
        }
        navigate('/admin')
      } else {
        // Login como colaborador
        const success = await collaboratorLogin(username, password)
        if (!success) {
          setError('Credenciais de colaborador inválidas')
          return
        }
        navigate('/collaborator-dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo/Cabeçalho */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10">
            <Icons.login className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Help Desk System</h1>
          <p className="text-muted-foreground mt-2">Sistema de gerenciamento de suporte</p>
        </div>

        <Card className="p-6">
          {/* Seletor de tipo de login */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'admin'
                  ? 'bg-background text-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Administrador
            </button>
            <button
              type="button"
              onClick={() => setLoginType('collaborator')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'collaborator'
                  ? 'bg-background text-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Colaborador
            </button>
          </div>

          <h2 className="text-xl font-semibold text-center mb-6">
            {loginType === 'admin' ? 'Login Administrador' : 'Login Colaborador'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {loginType === 'admin' ? 'Email ou Username' : 'Username'}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginType === 'admin' ? 'email@exemplo.com ou username' : 'seu username'}
                required
                disabled={isLoading || collaboratorLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading || collaboratorLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || collaboratorLoading}
            >
              {(isLoading || collaboratorLoading) ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                `Entrar como ${loginType === 'admin' ? 'Administrador' : 'Colaborador'}`
              )}
            </Button>

            {loginType === 'admin' && (
              <div className="text-center">
                <Link
                  to="/register"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Não tem uma conta? Registre-se
                </Link>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              {loginType === 'admin'
                ? 'Use suas credenciais de administrador'
                : 'Use as credenciais fornecidas pelo seu administrador'}
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Help Desk System v1.0 • {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage