import { SectionPage } from '../_components/section-page'
import { systemItems } from '../_lib/admin-data'
import { getAdminSession } from '../_lib/auth'

export default async function AdminSystemPage() {
  await getAdminSession()

  return (
    <SectionPage
      copy="Cette section accueillera les signaux machine utiles au quotidien: ressources, stockage, reseau et uptime."
      items={systemItems}
      kicker="Systeme"
      title="Etat machine"
    />
  )
}
