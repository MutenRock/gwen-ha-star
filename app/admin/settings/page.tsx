import { SectionPage } from '../_components/section-page'
import { settingsItems } from '../_lib/admin-data'
import { getAdminSession } from '../_lib/auth'

export default async function AdminSettingsPage() {
  await getAdminSession()

  return (
    <SectionPage
      copy="Les reglages admin servent de reference aux conventions actives du projet, sans exposer de secrets ni de configuration sensible."
      items={settingsItems}
      kicker="Reglages"
      title="Configuration cockpit"
    />
  )
}
