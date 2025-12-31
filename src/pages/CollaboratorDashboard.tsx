import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Icons } from '../components/ui/Icons'
import { Modal } from '../components/ui/Modal'
import { Loading } from '../components/ui/Loading'
import type { Ticket, Collaborator } from '../lib/types'

const CollaboratorDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [myTickets, setMyTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [comment, setComment] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'open'>('assigned')
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    open: 0,
    resolved: 0,
  })

  useEffect(() => {
    loadCollaboratorData()
    loadTickets()
  }, [user])

  const loadCollaboratorData = async () => {
    if (!user) return

    try {
      // Buscar dados do colaborador
      const { data: collaboratorData, error } = await supabase
        .from('colaboradores')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error) {
        console.error('Error loading collaborator:', error)
        return
      }

      setCollaborator(collaboratorData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const loadTickets = async () => {
    setIsLoading(true)
    try {
      // Buscar todos os tickets (colaborador pode ver todos)
      const { data: ticketsData, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setTickets(ticketsData || [])
      
      // Buscar tickets atribuídos a mim
      const { data: myTicketsData, error: myError } = await supabase
        .from('tickets')
        .select('*')
        .eq('assigned_to', collaborator?.id || '')
        .order('created_at', { ascending: false })

      if (!myError) {
        setMyTickets(myTicketsData || [])
      }

      // Calcular estatísticas
      const total = ticketsData?.length || 0
      const assigned = myTicketsData?.length || 0
      const open = ticketsData?.filter(t => t.status === 'open').length || 0
      const resolved = ticketsData?.filter(t => t.status === 'resolved').length || 0

      setStats({ total, assigned, open, resolved })
    } catch (error) {
      console.error('Error loading tickets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTakeTicket = async (ticketId: string) => {
    if (!collaborator) return

    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          assigned_to: collaborator.id,
          status: 'in_progress',
          updated_at: new Date().toISOString(),
        })
        .eq('id', ticketId)

      if (error) throw error

      // Adicionar comentário automático
      await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticketId,
          author_id: collaborator.id,
          author_type: 'colaborador',
          content: `Ticket assumido por ${collaborator.username}`,
          is_internal: true,
        })

      alert('Ticket assumido com sucesso!')
      loadTickets()
    } catch (error) {
      console.error('Error taking ticket:', error)
      alert('Erro ao assumir ticket')
    }
  }

  const handleUpdateStatus = async (ticketId: string, newStatus: Ticket['status']) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === 'resolved' ? { resolved_at: new Date().toISOString() } : {}),
          ...(newStatus === 'closed' ? { closed_at: new Date().toISOString() } : {}),
        })
        .eq('id', ticketId)

      if (error) throw error

      const statusMessages = {
        open: 'reaberto',
        in_progress: 'colocado em andamento',
        pending: 'colocado como pendente',
        resolved: 'resolvido',
        closed: 'fechado',
      }

      // Adicionar comentário automático
      await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticketId,
          author_id: collaborator?.id,
          author_type: 'colaborador',
          content: `Ticket ${statusMessages[newStatus]} por ${collaborator?.username}`,
          is_internal: true,
        })

      alert(`Status atualizado para ${newStatus}`)
      loadTickets()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Erro ao atualizar status')
    }
  }

  const handleAddComment = async (ticketId: string) => {
    if (!comment.trim() || !collaborator) {
      alert('Digite um comentário')
      return
    }

    try {
      const { error } = await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticketId,
          author_id: collaborator.id,
          author_type: 'colaborador',
          content: comment,
          is_internal: isInternal,
        })

      if (error) throw error

      // Atualizar timestamp do ticket
      await supabase
        .from('tickets')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', ticketId)

      setComment('')
      setIsInternal(false)
      setIsModalOpen(false)
      setSelectedTicket(null)
      
      alert('Comentário adicionado com sucesso!')
      loadTickets()
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Erro ao adicionar comentário')
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    }
    return colors[status as keyof typeof colors] || colors.closed
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Icons.alert className="w-4 h-4 text-red-500" />
      case 'high':
        return <Icons.xCircle className="w-4 h-4 text-orange-500" />
      case 'medium':
        return <Icons.info className="w-4 h-4 text-yellow-500" />
      case 'low':
        return <Icons.check className="w-4 h-4 text-green-500" />
      default:
        return <Icons.info className="w-4 h-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredTickets = () => {
    switch (activeTab) {
      case 'all':
        return tickets
      case 'assigned':
        return myTickets
      case 'open':
        return tickets.filter(t => t.status === 'open')
      default:
        return tickets
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Carregando dashboard..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Icons.user className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Painel do Colaborador</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {collaborator?.username} • {collaborator?.access_level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="hidden sm:flex"
            >
              <Icons.login className="w-4 h-4 mr-2" />
              Trocar Conta
            </Button>
            <Button variant="destructive" onClick={logout}>
              <Icons.logout className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Tickets</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Icons.totalActions className="w-8 h-8 text-gray-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Atribuídos a Mim</p>
                <p className="text-2xl font-bold">{stats.assigned}</p>
              </div>
              <Icons.activeUsers className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Abertos</p>
                <p className="text-2xl font-bold">{stats.open}</p>
              </div>
              <Icons.alert className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resolvidos</p>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>
              <Icons.checkCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'assigned' ? 'default' : 'outline'}
            onClick={() => setActiveTab('assigned')}
          >
            <Icons.user className="w-4 h-4 mr-2" />
            Meus Tickets
          </Button>
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            <Icons.dashboard className="w-4 h-4 mr-2" />
            Todos os Tickets
          </Button>
          <Button
            variant={activeTab === 'open' ? 'default' : 'outline'}
            onClick={() => setActiveTab('open')}
          >
            <Icons.alert className="w-4 h-4 mr-2" />
            Abertos
          </Button>
        </div>

        {/* Tickets Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTickets().length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <Icons.totalActions className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum ticket encontrado</p>
                    </td>
                  </tr>
                ) : (
                  filteredTickets().map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {ticket.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(ticket.priority)}
                          <span className="capitalize">{ticket.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'in_progress' ? 'Em Andamento' : 
                           ticket.status === 'open' ? 'Aberto' :
                           ticket.status === 'pending' ? 'Pendente' :
                           ticket.status === 'resolved' ? 'Resolvido' : 'Fechado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {!ticket.assigned_to && collaborator?.access_level !== 'viewer' && (
                            <Button
                              size="sm"
                              onClick={() => handleTakeTicket(ticket.id)}
                            >
                              <Icons.plus className="w-3 h-3 mr-1" />
                              Assumir
                            </Button>
                          )}
                          
                          {ticket.assigned_to === collaborator?.id && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedTicket(ticket)
                                  setIsModalOpen(true)
                                }}
                              >
                                <Icons.edit className="w-3 h-3 mr-1" />
                                Comentar
                              </Button>
                              
                              <select
                                className="text-sm border rounded-md px-2 py-1 bg-white dark:bg-gray-800"
                                value={ticket.status}
                                onChange={(e) => handleUpdateStatus(ticket.id, e.target.value as Ticket['status'])}
                              >
                                <option value="open">Aberto</option>
                                <option value="in_progress">Em Andamento</option>
                                <option value="pending">Pendente</option>
                                <option value="resolved">Resolvido</option>
                                <option value="closed">Fechado</option>
                              </select>
                            </>
                          )}
                          
                          {collaborator?.access_level === 'viewer' && (
                            <span className="text-xs text-gray-500">Somente visualização</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Minhas Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tickets Atribuídos</span>
                <span className="font-medium">{stats.assigned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Resolvidos por Mim</span>
                <span className="font-medium">
                  {myTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Em Andamento</span>
                <span className="font-medium">
                  {myTickets.filter(t => t.status === 'in_progress').length}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Acesso</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icons.user className="w-4 h-4 text-gray-400" />
                <span>{collaborator?.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.mail className="w-4 h-4 text-gray-400" />
                <span>{collaborator?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.settings className="w-4 h-4 text-gray-400" />
                <span className="capitalize">{collaborator?.access_level}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => loadTickets()}
              >
                <Icons.loading className="w-4 h-4 mr-2" />
                Atualizar Tickets
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  const openTicket = tickets.find(t => t.status === 'open')
                  if (openTicket && collaborator?.access_level !== 'viewer') {
                    handleTakeTicket(openTicket.id)
                  }
                }}
              >
                <Icons.plus className="w-4 h-4 mr-2" />
                Assumir Ticket Aberto
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={logout}
              >
                <Icons.logout className="w-4 h-4 mr-2" />
                Sair do Sistema
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Modal de Comentário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTicket(null)
          setComment('')
        }}
        title={`Comentar no Ticket: ${selectedTicket?.ticket_number}`}
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="font-medium">{selectedTicket.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedTicket.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Comentário
              </label>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Digite seu comentário..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="internal"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="internal" className="text-sm">
                Comentário interno (visível apenas para colaboradores)
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedTicket(null)
                  setComment('')
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleAddComment(selectedTicket.id)}
                disabled={!comment.trim()}
              >
                <Icons.edit className="w-4 h-4 mr-2" />
                Adicionar Comentário
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CollaboratorDashboard