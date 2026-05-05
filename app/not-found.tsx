'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div style={{
      background: '#000',
      color: '#00ff88',
      fontFamily: 'monospace',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    }}>
      <div style={{ fontSize: '3rem', letterSpacing: '0.2em' }}>404</div>
      <div style={{ color: '#ffffff88' }}>MODULE INTROUVABLE</div>
      <div style={{ fontSize: '0.85rem', color: '#ffffff44' }}>
        Redirection vers le hub dans 3s...
      </div>
      <button
        onClick={() => router.push('/')}
        style={{
          marginTop: '16px',
          background: 'transparent',
          border: '1px solid #00ff88',
          color: '#00ff88',
          padding: '8px 24px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          cursor: 'pointer',
          letterSpacing: '0.1em'
        }}
      >
        → RETOUR AU HUB
      </button>
    </div>
  )
}
