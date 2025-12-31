export const APP_NAME = 'Help Desk System'
export const APP_VERSION = '1.0.0'

export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Baixa', color: 'bg-green-500' },
  { value: 'medium', label: 'Média', color: 'bg-yellow-500' },
  { value: 'high', label: 'Alta', color: 'bg-orange-500' },
  { value: 'urgent', label: 'Urgente', color: 'bg-red-500' },
]

export const TICKET_STATUSES = [
  { value: 'open', label: 'Aberto', color: 'bg-blue-500' },
  { value: 'in_progress', label: 'Em Andamento', color: 'bg-purple-500' },
  { value: 'pending', label: 'Pendente', color: 'bg-yellow-500' },
  { value: 'resolved', label: 'Resolvido', color: 'bg-green-500' },
  { value: 'closed', label: 'Fechado', color: 'bg-gray-500' },
]

export const ACCESS_LEVELS = [
  { value: 'viewer', label: 'Visualizador' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Administrador' },
]