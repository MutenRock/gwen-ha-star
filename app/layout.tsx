import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gwen ha Star · BZH-PW',
  description: 'Système d\'identification galactique — BZH Portail Worlds',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⭐</text></svg>',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
