import { supabase } from '@/lib/supabase'

export async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) {
    throw new Error('No authentication token available')
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`,
  }
}

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    })

    return response
  } catch (error) {
    console.error('Authenticated fetch error:', error)
    throw error
  }
}