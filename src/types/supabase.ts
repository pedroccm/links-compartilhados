export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lc_links: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          url: string
          author: string | null
          platform: 'twitter' | 'linkedin' | 'other'
          tags: string[]
          status: 'unread' | 'read' | 'favorite' | 'archived'
          thumbnail_url: string | null
          favicon_url: string | null
          view_count: number
          click_count: number
          created_at: string
          updated_at: string
          viewed_at: string | null
          clicked_at: string | null
          domain: string | null
          reading_time: number | null
          word_count: number | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          url: string
          author?: string | null
          platform?: 'twitter' | 'linkedin' | 'other'
          tags?: string[]
          status?: 'unread' | 'read' | 'favorite' | 'archived'
          thumbnail_url?: string | null
          favicon_url?: string | null
          view_count?: number
          click_count?: number
          created_at?: string
          updated_at?: string
          viewed_at?: string | null
          clicked_at?: string | null
          domain?: string | null
          reading_time?: number | null
          word_count?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          url?: string
          author?: string | null
          platform?: 'twitter' | 'linkedin' | 'other'
          tags?: string[]
          status?: 'unread' | 'read' | 'favorite' | 'archived'
          thumbnail_url?: string | null
          favicon_url?: string | null
          view_count?: number
          click_count?: number
          created_at?: string
          updated_at?: string
          viewed_at?: string | null
          clicked_at?: string | null
          domain?: string | null
          reading_time?: number | null
          word_count?: number | null
        }
      }
      lc_categories: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          color: string
          icon: string | null
          parent_id: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          color?: string
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          color?: string
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lc_link_categories: {
        Row: {
          link_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          link_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          link_id?: string
          category_id?: string
          created_at?: string
        }
      }
      lc_user_preferences: {
        Row: {
          user_id: string
          theme: 'light' | 'dark' | 'system'
          default_view: 'grid' | 'list' | 'compact'
          links_per_page: number
          auto_extract_metadata: boolean
          auto_categorize: boolean
          mark_as_read_on_click: boolean
          email_notifications: boolean
          weekly_digest: boolean
          public_profile: boolean
          allow_search_indexing: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          default_view?: 'grid' | 'list' | 'compact'
          links_per_page?: number
          auto_extract_metadata?: boolean
          auto_categorize?: boolean
          mark_as_read_on_click?: boolean
          email_notifications?: boolean
          weekly_digest?: boolean
          public_profile?: boolean
          allow_search_indexing?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          default_view?: 'grid' | 'list' | 'compact'
          links_per_page?: number
          auto_extract_metadata?: boolean
          auto_categorize?: boolean
          mark_as_read_on_click?: boolean
          email_notifications?: boolean
          weekly_digest?: boolean
          public_profile?: boolean
          allow_search_indexing?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}