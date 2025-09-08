'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link, CreateLinkData, SearchFilters } from '@/types/links'
import { toast } from 'sonner'

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLinks = useCallback(async (filters?: SearchFilters) => {
    setLoading(true)
    setError(null)

    try {
      // Get the current session and access token
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      
      const params = new URLSearchParams()
      
      if (filters?.status) params.set('status', filters.status)
      if (filters?.platform) params.set('platform', filters.platform)
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
      
      const response = await fetch(`/api/links?${params}`, {
        headers,
      })
      
      if (!response.ok) {
        throw new Error('Erro ao buscar links')
      }

      const data = await response.json()
      setLinks(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createLink = useCallback(async (data: CreateLinkData) => {
    try {
      // Get the current session and access token
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('Não há sessão ativa')
      }

      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao criar link')
      }

      const newLink = await response.json()
      setLinks(prev => [newLink, ...prev])
      toast.success('Link adicionado com sucesso!')
      return { success: true, data: newLink }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar link'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const updateLink = useCallback(async (id: string, data: Partial<Link>) => {
    try {
      // Get the current session and access token
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
      
      const response = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao atualizar link')
      }

      const updatedLink = await response.json()
      setLinks(prev => prev.map(link => 
        link.id === id ? updatedLink : link
      ))
      toast.success('Link atualizado com sucesso!')
      return { success: true, data: updatedLink }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar link'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const deleteLink = useCallback(async (id: string) => {
    try {
      // Get the current session and access token
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      
      const headers: Record<string, string> = {}
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
      
      const response = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao deletar link')
      }

      setLinks(prev => prev.filter(link => link.id !== id))
      toast.success('Link removido com sucesso!')
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar link'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const toggleFavorite = useCallback(async (id: string, isFavorite: boolean) => {
    const newStatus = isFavorite ? 'favorite' : 'read'
    return updateLink(id, { status: newStatus })
  }, [updateLink])

  const markAsRead = useCallback(async (id: string) => {
    return updateLink(id, { status: 'read', viewed_at: new Date().toISOString() })
  }, [updateLink])

  const archiveLink = useCallback(async (id: string) => {
    return updateLink(id, { status: 'archived' })
  }, [updateLink])

  // Load initial data
  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return {
    links,
    loading,
    error,
    fetchLinks,
    createLink,
    updateLink,
    deleteLink,
    toggleFavorite,
    markAsRead,
    archiveLink,
  }
}