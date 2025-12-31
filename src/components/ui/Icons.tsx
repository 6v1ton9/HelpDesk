import React from 'react'

// Interface para props padrão dos ícones
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  style?: React.CSSProperties
}

// Exportando como objeto nomeado
export const Icons = {
  // Ícone de Login
  login: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="10,17 15,12 10,7" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="15" y1="12" x2="3" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Dashboard
  dashboard: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Dashboard (versão grande)
  dashboardBIG: ({ className = "w-8 h-8", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Sair/Logout
  logout: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,17 21,12 16,7" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Carregamento
  loading: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M12 2v4" strokeLinecap="round"/>
      <path d="M12 18v4" strokeLinecap="round"/>
      <path d="m4.93 4.93 2.83 2.83" strokeLinecap="round"/>
      <path d="m16.24 16.24 2.83 2.83" strokeLinecap="round"/>
      <path d="M2 12h4" strokeLinecap="round"/>
      <path d="M18 12h4" strokeLinecap="round"/>
      <path d="m4.93 19.07 2.83-2.83" strokeLinecap="round"/>
      <path d="m16.24 7.76 2.83-2.83" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Adicionar/Plus
  plus: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round"/>
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone X (fechar/cancelar)
  x: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone X dentro de círculo
  xCircle: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round"/>
      <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Check (concluído)
  check: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Usuários Ativos
  activeUsers: ({ className = "w-8 h-8", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 32 32" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="11" cy="10" r="3"/>
      <circle cx="21" cy="10" r="2"/>
      <path d="M4 24V22C4 19.7909 5.79086 18 8 18H14C16.2091 18 18 19.7909 18 22V24" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 24V22C24 20.8954 23.1046 20 22 20H20" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Ações Totais
  totalActions: ({ className = "w-8 h-8", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 32 32" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M6 8H26" strokeLinecap="round"/>
      <path d="M6 16H26" strokeLinecap="round"/>
      <path d="M6 24H26" strokeLinecap="round"/>
      <circle cx="10" cy="8" r="2" fill="currentColor"/>
      <circle cx="10" cy="16" r="2" fill="currentColor"/>
      <circle cx="10" cy="24" r="2" fill="currentColor"/>
    </svg>
  ),

  // Ícone de Usuário
  user: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" strokeLinecap="round"/>
      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Configurações
  settings: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" strokeLinecap="round"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Histórico
  history: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M12 8v4l3 3"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  ),

  // Ícone de Relógio
  clock: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),

  // Ícone de Busca
  search: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Editar
  edit: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),

  // Ícone de Lixeira/Delete
  trash: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M3 6h18"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round"/>
      <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Olho (visualizar)
  eye: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),

  // Ícone de Download
  download: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),

  // Ícone de Upload
  upload: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),

  // Ícone de Filtro
  filter: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),

  // Ícone de Seta para baixo
  chevronDown: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Seta para cima
  chevronUp: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polyline points="18 15 12 9 6 15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Informação
  info: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
      <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Aviso/Alert
  alert: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Sucesso/Check Circle
  checkCircle: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Email
  mail: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round"/>
      <polyline points="2,8 12,14 22,8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Telefone
  phone: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Localização
  mapPin: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),

  // Ícone de Arquivo
  file: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round"/>
      <polyline points="10 9 9 9 8 9" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Imagem
  image: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Link
  link: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Copiar
  copy: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Compartilhar
  share: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round"/>
    </svg>
  ),

  // Ícone de Gráfico
  chart: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),

  // Ícone de Trending Up
  trendingUp: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Trending Down
  trendingDown: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 18 23 18 23 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Ícone de Bar Chart
  barChart: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),

  // Ícone de Battery
  battery: ({ className = "w-6 h-6", style }: IconProps) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
      <line x1="23" y1="13" x2="23" y2="11"/>
    </svg>
  ),
}