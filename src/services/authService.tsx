import { supabase } from '../lib/supabaseClient'
import { SuperAdminInvite } from '../lib/types'

export const authService = {
  // Verificar se usuário é super admin
  async checkSuperAdmin(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_super_admin')
      .eq('id', userId)
      .single()

    if (error) return false
    return data?.is_super_admin || false
  },

  // Gerar código de convite para super admin
  async generateInviteCode(): Promise<{ success: boolean; code?: string; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('super_admin_invites')
        .insert({})
        .select('codigo')
        .single()

      if (error) throw error
      return { success: true, code: data.codigo }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Listar todos os códigos de convite
  async getInviteCodes(): Promise<SuperAdminInvite[]> {
    const { data, error } = await supabase
      .from('super_admin_invites')
      .select(`
        *,
        profiles:profile_id (username, email)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invite codes:', error)
      return []
    }

    return data.map(invite => ({
      ...invite,
      used_by_username: invite.profiles?.username,
      used_by_email: invite.profiles?.email,
    }))
  },

  // Revogar código de convite
  async revokeInviteCode(
    codeId: string, 
    revokedBy: string, 
    reason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('super_admin_invites')
        .update({
          revoked_at: new Date().toISOString(),
          revoked_by: revokedBy,
          revocation_reason: reason || 'Revoked by admin',
        })
        .eq('id', codeId)

      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Desativar profile e tudo relacionado
  async deactivateProfile(
    profileId: string, 
    deactivatedBy: string, 
    reason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Primeiro, registrar a ação
      const { error: logError } = await supabase
        .from('system_logs')
        .insert({
          user_id: deactivatedBy,
          user_type: 'profile',
          action: 'deactivate_profile',
          resource_type: 'profiles',
          resource_id: profileId,
          details: { reason },
        })

      if (logError) console.error('Error logging action:', logError)

      // Executar função de desativação em cascata
      const { error } = await supabase.rpc('deactivate_profile_cascade', {
        p_profile_id: profileId
      })

      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Verificar se código é válido
  async validateInviteCode(code: string): Promise<{ 
    valid: boolean; 
    error?: string; 
    invite?: SuperAdminInvite 
  }> {
    const { data, error } = await supabase
      .from('super_admin_invites')
      .select('*')
      .eq('codigo', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .is('revoked_at', null)
      .single()

    if (error) {
      return { 
        valid: false, 
        error: 'Código inválido, expirado ou já utilizado' 
      }
    }

    return { valid: true, invite: data }
  },

  // Usar código de convite
  async useInviteCode(code: string, profileId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.rpc('use_invite_code', {
        p_codigo: code,
        p_profile_id: profileId
      })

      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}