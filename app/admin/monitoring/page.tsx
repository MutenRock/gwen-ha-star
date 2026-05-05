import { SectionPage } from '../_components/section-page'
import { monitoringItems } from '../_lib/admin-data'
import { getAdminSession } from '../_lib/auth'

export default async function AdminMonitoringPage() {
  await getAdminSession()

  return (
    <SectionPage
      copy="Uptime Kuma reste l'outil specialise de monitoring. Le cockpit admin expose seulement un resume et des acces rapides."
      items={monitoringItems}
      kicker="Monitoring"
      title="Supervision sans duplication"
    />
  )
}
