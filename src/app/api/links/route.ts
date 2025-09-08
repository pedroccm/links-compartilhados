import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/supabase'

type LinkInsert = Database['public']['Tables']['lc_links']['Insert']

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const platform = searchParams.get('platform')

    let query = supabase
      .from('lc_links')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    if (platform) {
      query = query.eq('platform', platform)
    }

    const { data: links, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(links)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/links - Starting request')
    
    // Check for Authorization header first
    const authHeader = request.headers.get('authorization')
    let user = null
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      console.log('Using Authorization header')
      const token = authHeader.substring(7)
      
      // Create a client with the access token
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          cookies: {
            get() { return undefined },
            set() {},
            remove() {},
          },
        }
      )
      
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      console.log('Token auth result - User ID:', authUser?.id, 'Error:', authError)
      user = authUser
    } else {
      console.log('Falling back to cookie authentication')
      const cookieStore = cookies()
      
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: '', ...options })
            },
          },
        }
      )

      const { data: { user: cookieUser } } = await supabase.auth.getUser()
      user = cookieUser
    }

    if (!user) {
      console.log('No user found, returning 401')
      return NextResponse.json({ error: 'Unauthorized - No authenticated user' }, { status: 401 })
    }

    console.log('Authenticated user:', user.id)

    const body = await request.json()
    const { title, description, url, post_url, author, platform, tags, category_ids } = body

    // Validação básica
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      )
    }

    // URL validation
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid content URL format' }, { status: 400 })
    }

    // Validate post_url if provided
    if (post_url) {
      try {
        new URL(post_url)
      } catch {
        return NextResponse.json({ error: 'Invalid post URL format' }, { status: 400 })
      }
    }

    // Create a new supabase client for the database operation
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get() { return undefined },
          set() {},
          remove() {},
        },
      }
    )

    const linkData: LinkInsert = {
      user_id: user.id,
      title,
      description: description || null,
      url,
      post_url: post_url || null,
      author: author || null,
      platform: platform || 'other',
      tags: tags || [],
    }

    const { data: link, error } = await supabase
      .from('lc_links')
      .insert([linkData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Handle category associations if provided
    if (category_ids && category_ids.length > 0) {
      const categoryAssociations = category_ids.map((categoryId: string) => ({
        link_id: link.id,
        category_id: categoryId,
      }))

      const { error: categoryError } = await supabase
        .from('lc_link_categories')
        .insert(categoryAssociations)

      if (categoryError) {
        console.error('Category association error:', categoryError)
        // Don't fail the entire request, just log the error
      }
    }

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}