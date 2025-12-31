import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useCollaboratorAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const { data: collaborator, error } = await supabase
        .from('colaboradores')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single()

      if (error || !collaborator) {
        return false
      }

      // Aqui você implementaria a verificação de senha
      // Como estamos usando Supabase Auth para admins, colaboradores podem ter senhas separadas
      // Por enquanto, retorna true se encontrar o colaborador
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading,
  }
}