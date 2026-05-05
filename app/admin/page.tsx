import Link from 'next/link'
import { dashboardCards, securityNotes } from './_lib/admin-data'
import { getAdminSession } from './_lib/auth'

export default async function AdminPage() {
  await getAdminSession()

  return (
    <>
      <section className="admin-hero">
        <div className="admin-panel">
          <p className="admin-kicker">Cockpit superuser</p>
          <h2 className="admin-heading">Vue centrale du reseau Sterenna</h2>
          <p className="admin-copy">
            Cette zone regroupe les raccourcis d&apos;exploitation, les points de controle
            serveur et les vues dediees aux superusers. Le site public reste hors de
            cette logique d&apos;admin.
          </p>
        </div>
        <div className="admin-panel">
          <p className="admin-kicker">Garde-fous</p>
          <div className="admin-list">
            {securityNotes.map(note => {
              const Icon = note.icon
              return (
                <div className="admin-row" key={note.label}>
                  <span className="admin-row-label">
                    <Icon size={13} /> {note.label}
                  </span>
                  <span className="admin-row-value">{note.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="admin-grid">
        {dashboardCards.map(card => {
          const Icon = card.icon
          return (
            <Link className={`admin-card tone-${card.tone}`} href={card.href} key={card.href}>
              <div className="admin-card-head">
                <span className="admin-icon">
                  <Icon size={18} />
                </span>
                <span className="admin-meta">{card.meta}</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
            </Link>
          )
        })}
      </section>
    </>
  )
}
