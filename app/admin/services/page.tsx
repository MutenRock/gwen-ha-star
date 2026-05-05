import { serviceLinks } from '../_lib/admin-data'
import { getAdminSession } from '../_lib/auth'

export default async function AdminServicesPage() {
  await getAdminSession()

  return (
    <>
      <section className="admin-hero">
        <div className="admin-panel">
          <p className="admin-kicker">Services</p>
          <h2 className="admin-heading">Hub des outils reseau</h2>
          <p className="admin-copy">
            Les services restent autonomes. Cette page sert de point d&apos;acces et de
            futur resume d&apos;etat, sans recopier leurs interfaces metier.
          </p>
        </div>
        <div className="admin-panel">
          <p className="admin-kicker">Inventaire</p>
          <div className="admin-list">
            {serviceLinks.slice(0, 4).map(service => (
              <div className="admin-row" key={service.name}>
                <span className="admin-row-label">{service.name}</span>
                <span className="admin-row-value">{service.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-grid">
        {serviceLinks.map(service => {
          const Icon = service.icon
          const isDisabled = service.href === '#'
          const content = (
            <>
              <div className="admin-card-head">
                <span className="admin-icon">
                  <Icon size={18} />
                </span>
                <span className="admin-meta">{service.status}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.owner}</p>
            </>
          )

          return isDisabled ? (
            <article className="admin-card" key={service.name}>
              {content}
            </article>
          ) : (
            <a className="admin-card" href={service.href} key={service.name} rel="noopener noreferrer" target="_blank">
              {content}
            </a>
          )
        })}
      </section>
    </>
  )
}
