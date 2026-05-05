import { SectionPage } from '../_components/section-page'
import { userAdminItems } from '../_lib/admin-data'
import { getAdminSession } from '../_lib/auth'

export default async function AdminUsersPage() {
  await getAdminSession()

  return (
    <SectionPage
      copy="La gestion des utilisateurs restera liee a la table profiles et aux roles autorises. Les decisions d'autorisation ne doivent pas dependre de user_metadata."
      items={userAdminItems}
      kicker="Utilisateurs"
      title="Profils et roles"
    />
  )
}
