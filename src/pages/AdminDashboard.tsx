import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/authService'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Icons } from '../components/ui/Icons'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { SuperAdminInvite } from '../lib/types'

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [inviteCodes, setInviteCodes] = useState<SuperAdminInvite[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [newCode, setNewCode] = useState('')
  const [selectedCode, setSelectedCode] = useState<SuperAdminInvite | null>(null)
  const [revocationReason, setRevocationReason] = useState('')
  const [deactivationReason, setDeactivationReason] = useState('')
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    loadInviteCodes()
  }, [])

  const loadInviteCodes = async () => {
    setIsLoading(true)
    try {
      const codes = await authService.getInviteCodes()
      setInviteCodes(codes)
    } catch (error) {
      console.error('Error loading invite codes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateCode = async () => {
    setIsLoading(true)
    try {
      const result = await authService.generateInviteCode()
      if (result.success && result.code) {
        setNewCode(result.code)
        await loadInviteCodes()
      } else {
        alert(result.error || 'Erro ao gerar código')
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeCode = async () => {
    if (!selectedCode || !user) return

    setIsLoading(true)
    try {
      const result = await authService.revokeInviteCode(
        selectedCode.id,
        user.id,
        revocationReason
      )
      
      if (result.success) {
        setShowRevokeModal(false)
        setSelectedCode(null)
        setRevocationReason('')
        await loadInviteCodes()
        alert('Código revogado com sucesso!')
      } else {
        alert(result.error || 'Erro ao revogar código')
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivateProfile = async (profileId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      const result = await authService.deactivateProfile(
        profileId,
        user.id,
        deactivationReason
      )
      
      if (result.success) {
        setShowDeactivateModal(false)
        setDeactivationReason('')
        alert('Profile desativado com sucesso!')
      } else {
        alert(result.error || 'Erro ao desativar profile')
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (invite: SuperAdminInvite) => {
    if (invite.revoked_at) return { text: 'REVOGADO', color: 'bg-destructive text-destructive-foreground' }
    if (invite.used) return { text: 'UTILIZADO', color: 'bg-muted text-muted-foreground' }
    if (new Date(invite.expires_at) < new Date()) return { text: 'EXPIRADO', color: 'bg-warning/20 text-warning' }
    return { text: 'ATIVO', color: 'bg-success/20 text-success' }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icons.dashboardBIG className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold">Painel Super Admin</h1>
                <p className="text-sm text-muted-foreground">
                  Logado como: {user?.username} ({user?.email})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={() => setShowGenerateModal(true)}>
                <Icons.plus className="w-4 h-4 mr-2" />
                Gerar Código
              </Button>
              <Button variant="secondary" onClick={logout}>
                <Icons.logout className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Códigos</p>
                <p className="text-2xl font-bold">{inviteCodes.length}</p>
              </div>
              <Icons.trendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Códigos Ativos</p>
                <p className="text-2xl font-bold">
                  {inviteCodes.filter(c => !c.used && !c.revoked_at && new Date(c.expires_at) > new Date()).length}
                </p>
              </div>
              <Icons.activeUsers className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilizados</p>
                <p className="text-2xl font-bold">
                  {inviteCodes.filter(c => c.used).length}
                </p>
              </div>
              <Icons.trendingDown className="w-8 h-8 text-muted" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revogados</p>
                <p className="text-2xl font-bold">
                  {inviteCodes.filter(c => c.revoked_at).length}
                </p>
              </div>
              <Icons.xCircle className="w-8 h-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Códigos Gerados */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Códigos de Convite</h2>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Buscar por email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-64"
              />
              <Button onClick={loadInviteCodes} disabled={isLoading}>
                <Icons.loading className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium">Código</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Utilizado por</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Criado em</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Expira em</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {inviteCodes
                  .filter(invite => 
                    !searchEmail || 
                    invite.used_by_email?.toLowerCase().includes(searchEmail.toLowerCase())
                  )
                  .map((invite) => {
                    const status = getStatusBadge(invite)
                    return (
                      <tr key={invite.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm">{invite.codigo}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {invite.used_by_username ? (
                            <div>
                              <p className="font-medium">{invite.used_by_username}</p>
                              <p className="text-xs text-muted-foreground">{invite.used_by_email}</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Não utilizado</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm">{formatDate(invite.created_at)}</td>
                        <td className="py-3 px-4 text-sm">{formatDate(invite.expires_at)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {!invite.used && !invite.revoked_at && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedCode(invite)
                                  setShowRevokeModal(true)
                                }}
                              >
                                <Icons.x className="w-3 h-3 mr-1" />
                                Revogar
                              </Button>
                            )}
                            {invite.used_by_email && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Aqui você implementaria a busca do profile pelo email
                                  setDeactivationReason('')
                                  setShowDeactivateModal(true)
                                }}
                              >
                                <Icons.xCircle className="w-3 h-3 mr-1" />
                                Desativar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {inviteCodes.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Icons.totalActions className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum código de convite encontrado</p>
            </div>
          )}
        </Card>
      </main>

      {/* Modal: Gerar Novo Código */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Gerar Novo Código de Convite"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Um novo código será gerado e ficará disponível por 7 dias.
          </p>
          
          {newCode && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-1">Código Gerado:</p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-lg bg-background px-3 py-2 rounded flex-1">
                  {newCode}
                </code>
                <Button
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(newCode)}
                >
                  Copiar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Compartilhe este código com o novo super admin.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowGenerateModal(false)
                setNewCode('')
              }}
            >
              Fechar
            </Button>
            <Button
              onClick={handleGenerateCode}
              disabled={isLoading}
            >
              {isLoading ? 'Gerando...' : 'Gerar Código'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Revogar Código */}
      <Modal
        isOpen={showRevokeModal}
        onClose={() => {
          setShowRevokeModal(false)
          setSelectedCode(null)
          setRevocationReason('')
        }}
        title="Revogar Código de Convite"
      >
        <div className="space-y-4">
          {selectedCode && (
            <div className="p-3 bg-muted rounded">
              <p className="font-mono text-center text-lg">{selectedCode.codigo}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Motivo da Revogação (opcional)
            </label>
            <Input
              type="text"
              value={revocationReason}
              onChange={(e) => setRevocationReason(e.target.value)}
              placeholder="Ex: Código comprometido"
            />
          </div>

          <p className="text-sm text-destructive">
            ⚠️ Atenção: Esta ação não pode ser desfeita. O código será marcado como revogado.
          </p>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowRevokeModal(false)
                setSelectedCode(null)
                setRevocationReason('')
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevokeCode}
              disabled={isLoading}
            >
              {isLoading ? 'Revogando...' : 'Confirmar Revogação'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Desativar Profile */}
      <Modal
        isOpen={showDeactivateModal}
        onClose={() => {
          setShowDeactivateModal(false)
          setDeactivationReason('')
        }}
        title="Desativar Profile"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ao desativar um profile, todos os recursos associados serão desativados:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Profile (usuário não poderá mais logar)</li>
            <li>• Códigos de autenticação vinculados</li>
            <li>• Todos os colaboradores associados</li>
            <li>• Dispositivos vinculados</li>
          </ul>

          <div>
            <label className="block text-sm font-medium mb-2">
              Motivo da Desativação (opcional)
            </label>
            <Input
              type="text"
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              placeholder="Ex: Conta inativa"
            />
          </div>

          <p className="text-sm text-destructive">
            ⚠️ Atenção: Esta ação desativa completamente o acesso do usuário e todos os recursos relacionados.
          </p>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeactivateModal(false)
                setDeactivationReason('')
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Aqui você implementaria a lógica para buscar o profileId
                // handleDeactivateProfile(profileId)
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Desativando...' : 'Confirmar Desativação'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminDashboard