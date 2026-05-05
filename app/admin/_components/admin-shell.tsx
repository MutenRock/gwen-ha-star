import type { ReactNode } from 'react'
import Link from 'next/link'
import { adminNav } from '../_lib/admin-data'
import type { AdminSession } from '../_lib/auth'

type AdminShellProps = {
  children: ReactNode
  session: AdminSession
}

export function AdminShell({ children, session }: AdminShellProps) {
  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand">
          <span className="admin-pulse" />
          <div>
            <h1 className="admin-title">Gwen-Ha-Star Admin</h1>
            <div className="admin-subtitle">Cockpit prive · exploitation · monitoring</div>
          </div>
        </div>
        <div className="admin-identity">
          <span>{session.user.email}</span>
          <span className="admin-badge">{session.role}</span>
        </div>
      </header>

      <main className="admin-main">
        <nav className="admin-nav" aria-label="Navigation admin">
          {adminNav.map(item => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </main>
    </div>
  )
}
