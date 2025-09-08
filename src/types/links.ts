export interface Link {
  id: string
  user_id: string
  title: string
  description?: string | null
  url: string // Link do conteúdo principal
  post_url?: string | null // Link do post/thread original
  author?: string | null
  platform: 'twitter' | 'linkedin' | 'other'
  tags: string[]
  status: 'unread' | 'read' | 'favorite' | 'archived'
  thumbnail_url?: string | null
  favicon_url?: string | null
  view_count: number
  click_count: number
  created_at: string
  updated_at: string
  viewed_at?: string | null
  clicked_at?: string | null
  domain?: string | null
  reading_time?: number | null
  word_count?: number | null
}

export interface CreateLinkData {
  title: string
  description?: string
  url: string // Link do conteúdo principal
  post_url?: string // Link do post/thread original
  author?: string
  platform: 'twitter' | 'linkedin' | 'other'
  tags: string[]
  category_ids?: string[]
}

export interface SearchFilters {
  query?: string
  platform?: 'twitter' | 'linkedin' | 'other'
  author?: string
  tags?: string[]
  status?: 'unread' | 'read' | 'favorite' | 'archived'
  category?: string
  dateRange?: {
    from: Date
    to: Date
  }
  sortBy?: 'relevance' | 'date' | 'author' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface Category {
  id: string
  user_id: string
  name: string
  description?: string | null
  color: string
  icon?: string | null
  parent_id?: string | null
  sort_order: number
  created_at: string
  updated_at: string
}