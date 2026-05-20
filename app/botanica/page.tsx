'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { Leaf, Coins, Star, BookOpen, Sprout, ExternalLink } from 'lucide-react'

const BOTANICA_URL = 'https://nitro.sterenna.fr/botanica-obscura'
const PROJECT_REF  = 'nmdjrcswlnydglrxaivx'

type SavePreview = {
  coins: number
  level: number
  xp: number
  codex_count: number
  mutations_count: number
  username: string
  avatar_url: string | null
}

export default function BotanicaLanding() {
  const [save,    setSave]    = useState<SavePreview | null>(null)
  const [loading, setLoading] = useState(true)
  const [userId,  setUserId]  = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      setUserId(user.id)
      const meta = user.user_metadata

      // Fetch player data
      const [{ data: pd }, { count: codexCount }, { count: mutCount }] = await Promise.all([
        supabase
          .from('botanica_player_data')
          .select('coins, level, xp')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('player_codex')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('pot_mutations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'completed'),
      ])

      setSave({
        coins:           pd?.coins           ?? 0,
        level:           pd?.level           ?? 1,
        xp:              pd?.xp              ?? 0,
        codex_count:     codexCount          ?? 0,
        mutations_count: mutCount            ?? 0,
        username:        meta?.username ?? meta?.full_name ?? user.email?.split('@')[0] ?? 'Botaniste',
        avatar_url:      meta?.avatar_url    ?? null,
      })
      setLoading(false)
    })
  }, [])

  return (
    <div style={{
      fontFamily: '"Share Tech Mono", monospace',
      background: '#050e05',
      minHeight: '100vh',
      color: '#c8e6c8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      gap: '32px',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes pulse  { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes floatY { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        .stat-card:hover  { border-color: #4caf50 !important; transform: translateY(-2px); }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 8, animation: 'floatY 3s ease-in-out infinite' }}>🌿</div>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#a8e6a8', letterSpacing: 6, margin: 0 }}>BOTANICA OBSCURA</h1>
        <p style={{ fontSize: 11, color: 'rgba(168,230,168,0.5)', letterSpacing: 3, marginTop: 6 }}>IDLE GACHA BOTANIQUE · MUTATIONS · CODEX</p>
      </div>

      {/* SAVE PREVIEW */}
      {loading ? (
        <div style={{ fontSize: 11, color: 'rgba(168,230,168,0.4)', letterSpacing: 3, animation: 'pulse 1.5s infinite' }}>CHARGEMENT SAVE...</div>
      ) : !userId ? (
        <div style={{
          background: 'rgba(76,175,80,0.06)',
          border: '1px solid rgba(76,175,80,0.2)',
          borderRadius: 16,
          padding: '24px 32px',
          textAlign: 'center',
          maxWidth: 360,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
          <div style={{ fontSize: 13, color: 'rgba(168,230,168,0.7)', marginBottom: 16 }}>Connecte-toi sur Gwen Ha Star pour voir ta progression.</div>
          <a href="/login" style={{
            display: 'inline-block',
            background: '#2e7d32',
            color: '#a8e6a8',
            borderRadius: 30,
            padding: '8px 24px',
            fontSize: 11,
            letterSpacing: 2,
            textDecoration: 'none',
          }}>🔑 SE CONNECTER</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 480 }}>

          {/* Player badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'rgba(0,20,0,0.7)',
            border: '1px solid rgba(76,175,80,0.25)',
            borderRadius: 14, padding: '14px 20px',
          }}>
            {save?.avatar_url
              ? <img src={save.avatar_url} alt="avatar" style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #4caf50' }}/>
              : <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(76,175,80,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🌿</div>
            }
            <div>
              <div style={{ fontSize: 14, color: '#a8e6a8', fontWeight: 'bold', letterSpacing: 2 }}>{save?.username}</div>
              <div style={{ fontSize: 10, color: 'rgba(168,230,168,0.45)', letterSpacing: 2, marginTop: 2 }}>BOTANISTE · NIVEAU {save?.level}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#f9ca24' }}>
              🪙 {save?.coins?.toLocaleString('fr-FR')}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '⭐', label: 'NIVEAU',     value: `${save?.level}`,              sub: `${save?.xp} XP` },
              { icon: '🪙', label: 'PIÈCES',     value: (save?.coins ?? 0).toLocaleString('fr-FR'), sub: 'coins' },
              { icon: '📖', label: 'CODEX',      value: `${save?.codex_count} espèces`, sub: 'découvertes' },
              { icon: '🧪', label: 'MUTATIONS',  value: `${save?.mutations_count}`,     sub: 'complétées' },
            ].map(s => (
              <div key={s.label} className="stat-card" style={{
                background: 'rgba(0,15,0,0.8)',
                border: '1px solid rgba(76,175,80,0.15)',
                borderRadius: 12, padding: '16px 18px',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 9, color: 'rgba(168,230,168,0.4)', letterSpacing: 3, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 18, color: '#a8e6a8', fontWeight: 'bold' }}>{s.value}</div>
                <div style={{ fontSize: 9, color: 'rgba(168,230,168,0.35)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={BOTANICA_URL}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
          color: '#a8e6a8',
          border: '1px solid rgba(76,175,80,0.5)',
          borderRadius: 40,
          padding: '14px 36px',
          fontSize: 13,
          fontWeight: 'bold',
          letterSpacing: 3,
          textDecoration: 'none',
          boxShadow: '0 0 24px rgba(76,175,80,0.2)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(76,175,80,0.45)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(76,175,80,0.2)'}
      >
        🌿 JOUER À BOTANICA <ExternalLink size={14}/>
      </a>

      <a href="/" style={{ fontSize: 9, color: 'rgba(168,230,168,0.3)', letterSpacing: 2, textDecoration: 'none' }}>← RETOUR GWEN HA STAR</a>
    </div>
  )
}
