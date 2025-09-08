'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useLinks } from '@/hooks/useLinks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkCard } from '@/components/links/link-card'
import { LinksTable } from '@/components/links/links-table'
import { AddLinkModal } from '@/components/links/add-link-modal'
import { EditLinkModal } from '@/components/links/edit-link-modal'
import { Plus, Search, Filter, Grid, Table as TableIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { links, loading, createLink, updateLink, deleteLink } = useLinks()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Carregando...</h2>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  const handleEditLink = (link) => {
    setEditingLink(link)
    setShowEditModal(true)
  }

  const handleEditSubmit = async (id, data) => {
    const result = await updateLink(id, data)
    if (result.success) {
      setShowEditModal(false)
      setEditingLink(null)
    }
    return result
  }

  // Filter links based on search query
  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Calculate stats
  const stats = {
    total: links.length,
    unread: links.filter(l => l.status === 'unread').length,
    favorites: links.filter(l => l.status === 'favorite').length,
    archived: links.filter(l => l.status === 'archived').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Meus Links Compartilhados
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Bem-vindo, {user?.email}! 
              {stats.unread > 0 && ` Você tem ${stats.unread} links não lidos.`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSignOut} variant="outline">
              Sair
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Link
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total === 0 ? 'Nenhum link ainda' : 'Links salvos'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Não Lidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
              <p className="text-xs text-muted-foreground">
                Links para ler
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.favorites}</div>
              <p className="text-xs text-muted-foreground">
                Links favoritos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Arquivados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
              <p className="text-xs text-muted-foreground">
                Links arquivados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar and View Toggle */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar links por título, descrição, autor ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-l-none"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-64">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Links Display */}
        {!loading && (
          <>
            {filteredLinks.length > 0 ? (
              viewMode === 'cards' ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLinks.map((link) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      onUpdate={updateLink}
                      onDelete={deleteLink}
                      onEdit={handleEditLink}
                    />
                  ))}
                </div>
              ) : (
                <LinksTable
                  links={filteredLinks}
                  onUpdate={updateLink}
                  onDelete={deleteLink}
                  onEdit={handleEditLink}
                />
              )
            ) : links.length === 0 ? (
              /* Empty State - No Links */
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum link encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Comece adicionando seu primeiro link do Twitter ou LinkedIn
                </p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Link
                </Button>
              </div>
            ) : (
              /* No Search Results */
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente buscar com outras palavras-chave
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                >
                  Limpar Busca
                </Button>
              </div>
            )}
          </>
        )}

      </div>

      {/* Add Link Modal */}
      <AddLinkModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={createLink}
      />

      {/* Edit Link Modal */}
      <EditLinkModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        link={editingLink}
        onSubmit={handleEditSubmit}
      />
    </div>
  )
}