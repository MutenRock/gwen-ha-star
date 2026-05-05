'use client'
import { useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ChefPage() {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user); setReady(true)
    }
    load()
  }, [router, supabase])
  return (
    <div style={{ background: '#03050f', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <div style={{ borderBottom: '1px solid rgba(52,211,153,0.3)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ready ? '#34d399' : '#D85A30', boxShadow: ready ? '0 0 8px #34d399' : '0 0 8px #D85A30', transition: 'all 0.4s' }} />
          <span style={{ fontSize: '10px', color: '#34d399', letterSpacing: '3px' }}>CYBERCHEF · CRYPTO & UTILS</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '9px', color: 'rgba(62,207,207,0.5)', letterSpacing: '2px' }}>{user?.email}</span>
          <button onClick={() => router.push('/')} style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '6px', color: '#34d399', fontSize: '9px', padding: '6px 12px', cursor: 'pointer', letterSpacing: '2px' }}>← HUB</button>
        </div>
      </div>
      {!ready && <div style={{ height: '2px', background: 'rgba(52,211,153,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', background: 'linear-gradient(90deg, transparent, #34d399, transparent)', animation: 'load 1.2s infinite', width: '40%' }} /><style>{`@keyframes load { 0% { margin-left: -40% } 100% { margin-left: 140% } }`}</style></div>}
      {ready && <iframe src="https://chef.nitro.sterenna.fr" style={{ flex: 1, border: 'none', width: '100%' }} />}
    </div>
  )
}
