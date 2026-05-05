import { cache } from 'react'
import type { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/app/lib/supabase-server'

export type AdminSession = {
  user: {
    id: string
    email: string
  }
  role: string
}

function getAppMetadataRole(user: User) {
  const role = user.app_metadata?.role
  return typeof role === 'string' ? role : null
}

export const getAdminSession = cache(async (): Promise<AdminSession> => {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .maybeSingle()

  const profileRole = typeof profile?.role === 'string' ? profile.role : null
  const role = profileRole ?? getAppMetadataRole(user) ?? 'user'

  if (role !== 'superuser') {
    redirect('/')
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? 'agent inconnu',
    },
    role,
  }
})
