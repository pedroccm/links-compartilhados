'use client'

import { useState } from 'react'
import { Link } from '@/types/links'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ExternalLink,
  Star,
  Archive,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface LinksTableProps {
  links: Link[]
  onUpdate: (id: string, data: Partial<Link>) => Promise<any>
  onDelete: (id: string) => Promise<any>
  onEdit?: (link: Link) => void
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-4 w-4 text-blue-500" />
    case 'linkedin':
      return <Linkedin className="h-4 w-4 text-blue-600" />
    default:
      return <Globe className="h-4 w-4 text-gray-500" />
  }
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'unread':
      return { color: 'bg-blue-500', label: 'Não lido', variant: 'default' as const }
    case 'read':
      return { color: 'bg-green-500', label: 'Lido', variant: 'secondary' as const }
    case 'favorite':
      return { color: 'bg-yellow-500', label: 'Favorito', variant: 'default' as const }
    case 'archived':
      return { color: 'bg-gray-500', label: 'Arquivado', variant: 'outline' as const }
    default:
      return { color: 'bg-gray-500', label: 'Desconhecido', variant: 'outline' as const }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function LinksTable({ links, onUpdate, onDelete, onEdit }: LinksTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleOpenLink = async (link: Link) => {
    if (link.status === 'unread') {
      await onUpdate(link.id, { status: 'read', viewed_at: new Date().toISOString() })
    }
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  const handleOpenPostLink = (link: Link) => {
    if (link.post_url) {
      window.open(link.post_url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleToggleFavorite = async (link: Link) => {
    setLoadingId(link.id)
    const isFavorite = link.status === 'favorite'
    const newStatus = isFavorite ? 'read' : 'favorite'
    await onUpdate(link.id, { status: newStatus })
    setLoadingId(null)
  }

  const handleArchive = async (link: Link) => {
    setLoadingId(link.id)
    await onUpdate(link.id, { status: 'archived' })
    setLoadingId(null)
  }

  const handleCopyUrl = (link: Link) => {
    navigator.clipboard.writeText(link.url)
    toast.success('URL copiada para a área de transferência!')
  }

  const handleDelete = async (link: Link) => {
    if (confirm('Tem certeza que deseja deletar este link?')) {
      setLoadingId(link.id)
      await onDelete(link.id)
      setLoadingId(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Plataforma</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="w-[70px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => {
            const statusInfo = getStatusInfo(link.status)
            const isFavorite = link.status === 'favorite'
            const isLoading = loadingId === link.id

            return (
              <TableRow key={link.id} className={cn(isLoading && "opacity-50")}>
                <TableCell>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleOpenLink(link)}
                      className="text-left hover:text-primary transition-colors font-medium"
                    >
                      {link.title}
                    </button>
                    {link.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(link.platform)}
                    <span className="capitalize text-sm">{link.platform}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {link.author && (
                    <span className="text-sm text-muted-foreground">
                      {link.author}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={statusInfo.variant} className="gap-1">
                    <div className={cn("w-2 h-2 rounded-full", statusInfo.color)} />
                    {statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {link.tags && link.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {link.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {link.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{link.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(link.created_at)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenLink(link)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Abrir link
                      </DropdownMenuItem>
                      {link.post_url && (
                        <DropdownMenuItem onClick={() => handleOpenPostLink(link)}>
                          {getPlatformIcon(link.platform)}
                          <span className="ml-2">Ver post original</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleCopyUrl(link)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleFavorite(link)}>
                        <Star className={cn(
                          "mr-2 h-4 w-4",
                          isFavorite && "fill-current text-yellow-500"
                        )} />
                        {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      </DropdownMenuItem>
                      {link.status !== 'archived' && (
                        <DropdownMenuItem onClick={() => handleArchive(link)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Arquivar
                        </DropdownMenuItem>
                      )}
                      {onEdit && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onEdit(link)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(link)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}