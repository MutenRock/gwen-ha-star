import type { LucideIcon } from 'lucide-react'

type SectionItem = {
  label: string
  value: string
  tone: string
  icon?: LucideIcon
}

type SectionPageProps = {
  kicker: string
  title: string
  copy: string
  items: SectionItem[]
}

export function SectionPage({ kicker, title, copy, items }: SectionPageProps) {
  return (
    <>
      <section className="admin-hero">
        <div className="admin-panel">
          <p className="admin-kicker">{kicker}</p>
          <h2 className="admin-heading">{title}</h2>
          <p className="admin-copy">{copy}</p>
        </div>
        <div className="admin-panel">
          <p className="admin-kicker">Etat</p>
          <div className="admin-list">
            {items.map(item => (
              <div className="admin-row" key={item.label}>
                <span className="admin-row-label">{item.label}</span>
                <span className={`admin-row-value tone-${item.tone}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-grid">
        {items.map(item => {
          const Icon = item.icon
          return (
            <article className={`admin-card tone-${item.tone}`} key={item.label}>
              <div className="admin-card-head">
                <span className="admin-icon">{Icon ? <Icon size={18} /> : null}</span>
                <span className="admin-meta">{item.value}</span>
              </div>
              <h3>{item.label}</h3>
              <p>Bloc reserve pour connecter les donnees reelles de cette section admin.</p>
            </article>
          )
        })}
      </section>
    </>
  )
}
