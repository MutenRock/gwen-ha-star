'use client'

export default function LemePage() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://leme.nitro.sterenna.fr"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="microphone; camera; clipboard-read; clipboard-write"
        title="LEME — Lemegeton AI"
      />
    </div>
  )
}