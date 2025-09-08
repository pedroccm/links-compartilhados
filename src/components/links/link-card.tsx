'use client'

import { useState } from 'react'
import { Link } from '@/types/links'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
  Eye,
  Copy,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface LinkCardProps {
  link: Link
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
      return { color: 'bg-blue-500', label: 'Não lido' }
    case 'read':
      return { color: 'bg-green-500', label: 'Lido' }
    case 'favorite':
      return { color: 'bg-yellow-500', label: 'Favorito' }
    case 'archived':
      return { color: 'bg-gray-500', label: 'Arquivado' }
    default:
      return { color: 'bg-gray-500', label: 'Desconhecido' }
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

export function LinkCard({ link, onUpdate, onDelete, onEdit }: LinkCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const statusInfo = getStatusInfo(link.status)
  const isFavorite = link.status === 'favorite'

  const handleOpenLink = async () => {
    // Mark as read when clicked
    if (link.status === 'unread') {
      await onUpdate(link.id, { status: 'read', viewed_at: new Date().toISOString() })
    }
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  const handleOpenPostLink = () => {
    if (link.post_url) {
      window.open(link.post_url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleToggleFavorite = async () => {
    setIsLoading(true)
    const newStatus = isFavorite ? 'read' : 'favorite'
    await onUpdate(link.id, { status: newStatus })
    setIsLoading(false)
  }

  const handleArchive = async () => {
    setIsLoading(true)
    await onUpdate(link.id, { status: 'archived' })
    setIsLoading(false)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(link.url)
    toast.success('URL copiada para a área de transferência!')
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja deletar este link?')) {
      setIsLoading(true)
      await onDelete(link.id)
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn(
      "group hover:shadow-md transition-all duration-200",
      isLoading && "opacity-50 pointer-events-none"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getPlatformIcon(link.platform)}
            {link.author && (
              <span className="text-sm text-muted-foreground truncate">
                {link.author}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div 
              className={cn("w-2 h-2 rounded-full", statusInfo.color)}
              title={statusInfo.label}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleOpenLink}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyUrl}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar URL
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleFavorite}>
                  <Star className={cn(
                    "mr-2 h-4 w-4",
                    isFavorite && "fill-current text-yellow-500"
                  )} />
                  {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                </DropdownMenuItem>
                {link.status !== 'archived' && (
                  <DropdownMenuItem onClick={handleArchive}>
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
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <button
              onClick={handleOpenLink}
              className="text-left w-full group-hover:text-primary transition-colors"
            >
              <h3 className="font-semibold line-clamp-2 text-sm mb-1">
                {link.title}
              </h3>
            </button>
            {link.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {link.description}
              </p>
            )}
          </div>

          {/* Tags */}
          {link.tags && link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {link.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {link.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{link.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <span>{formatDate(link.created_at)}</span>
            <div className="flex items-center gap-2">
              {link.view_count > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{link.view_count}</span>
                </div>
              )}
              
              {/* Botão do Post Original (se existir) */}
              {link.post_url && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleOpenPostLink}
                  title="Ver post original"
                >
                  {getPlatformIcon(link.platform)}
                  <span className="sr-only">Ver post original</span>
                </Button>
              )}
              
              {/* Botão do Conteúdo */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleOpenLink}
                title="Abrir conteúdo"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">Abrir conteúdo</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}