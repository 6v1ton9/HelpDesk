import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { supabase } from '../lib/supabaseClient'
import { Profile } from '../lib/types'

interface AuthContextType {
  user: Profile | null
  isLoading: boolean
  isSuperAdmin: boolean
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkIsAdmin: () => Promise<boolean>
}

// ✅ EXPORTAR o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ✅ Hook oficial
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user?.email) {
        await fetchUserProfile(session.user.email)
      }
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserProfile = async (email: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (!profile) {
      setUser(null)
      return
    }

    setUser(profile)
    setIsSuperAdmin(profile.is_super_admin)
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (data.user?.email) {
      await fetchUserProfile(data.user.email)
      return { success: true }
    }

    return { success: false, error: 'Erro ao obter informações do usuário' }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsSuperAdmin(false)
  }

  const checkIsAdmin = async (): Promise<boolean> => {
    if (!user) return false

    const { data } = await supabase
      .from('profiles')
      .select('is_super_admin')
      .eq('id', user.id)
      .single()

    return !!data?.is_super_admin
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSuperAdmin,
        login,
        logout,
        checkIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
