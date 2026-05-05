import type { ReactNode } from 'react'
import { AdminShell } from './_components/admin-shell'
import { getAdminSession } from './_lib/auth'
import './admin.css'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession()

  return <AdminShell session={session}>{children}</AdminShell>
}
