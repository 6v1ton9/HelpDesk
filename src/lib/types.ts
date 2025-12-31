// src/lib/types.ts
export type UserRole = 'admin' | 'collaborator' | 'super_admin'

export interface Profile {
  id: string
  username: string
  email: string
  phone?: string
  is_super_admin: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SuperAdminInvite {
  id: string
  codigo: string
  used: boolean
  profile_id?: string
  used_by_email?: string
  used_by_username?: string
  created_at: string
  used_at?: string
  expires_at: string
  revoked_at?: string
  revoked_by?: string
  revocation_reason?: string
}

export interface Collaborator {
  id: string
  owner_id: string
  username: string
  email: string
  access_level: 'viewer' | 'editor' | 'admin'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AuthCode {
  id: string
  owner_id: string
  code: string
  is_active: boolean
  created_at: string
}

// TICKET TYPES - Adicionando tipos faltantes
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketStatus = 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed'

export interface Ticket {
  id: string
  ticket_number: string
  owner_id?: string
  dispositivo_id?: string
  colaborador_id?: string
  title: string
  description: string
  category: string
  priority: TicketPriority
  status: TicketStatus
  assigned_to?: string
  created_at: string
  updated_at: string
  resolved_at?: string
  closed_at?: string
}

export interface TicketComment {
  id: string
  ticket_id: string
  author_id?: string
  author_type?: 'profile' | 'colaborador' | 'dispositivo'
  content: string
  is_internal: boolean
  created_at: string
}

export interface Device {
  id: string
  auth_code_id?: string
  device_name: string
  user_email: string
  user_name?: string
  os_name?: string
  os_version?: string
  architecture?: string
  processor?: string
  memory_gb?: number
  storage_gb?: number
  ip_address?: string
  mac_address?: string
  is_active: boolean
  last_seen: string
  app_version?: string
  created_at: string
  updated_at: string
}

export interface SystemLog {
  id: string
  user_id?: string
  user_type?: string
  action: string
  resource_type?: string
  resource_id?: string
  details?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

// Database types interface
export interface DatabaseTypes {
  Profile: Profile
  SuperAdminInvite: SuperAdminInvite
  Collaborator: Collaborator
  AuthCode: AuthCode
  Ticket: Ticket
  TicketComment: TicketComment
  Device: Device
  SystemLog: SystemLog
}


