import {
  Activity,
  Bot,
  Database,
  Gauge,
  MonitorDot,
  Settings,
  ShieldCheck,
  Terminal,
  Users,
} from 'lucide-react'

export const adminNav = [
  { label: 'Cockpit', href: '/admin' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Monitoring', href: '/admin/monitoring' },
  { label: 'Utilisateurs', href: '/admin/users' },
  { label: 'Systeme', href: '/admin/system' },
  { label: 'Reglages', href: '/admin/settings' },
]

export const dashboardCards = [
  {
    title: 'Services reseau',
    desc: 'Acces rapides vers les outils internes et publics.',
    href: '/admin/services',
    icon: MonitorDot,
    tone: 'cyan',
    meta: 'Hub',
  },
  {
    title: 'Monitoring',
    desc: 'Resume de supervision et lien vers Uptime Kuma.',
    href: '/admin/monitoring',
    icon: Activity,
    tone: 'green',
    meta: 'Kuma',
  },
  {
    title: 'Utilisateurs',
    desc: 'Controle des profils, roles et permissions.',
    href: '/admin/users',
    icon: Users,
    tone: 'violet',
    meta: 'Profiles',
  },
  {
    title: 'Systeme',
    desc: 'Points de controle machine, reseau et ressources.',
    href: '/admin/system',
    icon: Gauge,
    tone: 'amber',
    meta: 'Health',
  },
]

export const serviceLinks = [
  { name: 'Ollama', href: '#', status: 'A raccorder', owner: 'IA locale', icon: Bot },
  { name: 'Open WebUI', href: '#', status: 'A raccorder', owner: 'Interface IA', icon: Terminal },
  { name: 'Uptime Kuma', href: '#', status: 'Monitoring dedie', owner: 'Supervision', icon: Activity },
  { name: 'Dashdot', href: '#', status: 'A raccorder', owner: 'Systeme', icon: Gauge },
  { name: 'Jellyfin', href: '#', status: 'A raccorder', owner: 'Media', icon: Database },
  { name: 'ttyd', href: '#', status: 'A raccorder', owner: 'Terminal', icon: Terminal },
  { name: 'Excalidraw', href: 'https://draw.nitro.sterenna.fr', status: 'Externe', owner: 'Whiteboard', icon: MonitorDot },
  { name: 'CyberChef', href: 'https://chef.nitro.sterenna.fr', status: 'Externe', owner: 'Utils', icon: Settings },
]

export const monitoringItems = [
  { label: 'Kuma reste la source de verite', value: 'Lien dedie', tone: 'green' },
  { label: 'Alertes critiques', value: 'A connecter', tone: 'amber' },
  { label: 'Historique incidents', value: 'Kuma', tone: 'cyan' },
]

export const userAdminItems = [
  { label: 'Table profiles', value: 'role = superuser', tone: 'violet' },
  { label: 'Invitations', value: 'A definir', tone: 'amber' },
  { label: 'Permissions', value: 'Centralisees', tone: 'green' },
]

export const systemItems = [
  { label: 'CPU / RAM', value: 'A connecter', tone: 'cyan' },
  { label: 'Disque', value: 'A connecter', tone: 'amber' },
  { label: 'Reseau', value: 'A connecter', tone: 'green' },
]

export const settingsItems = [
  { label: 'Base path', value: '/star', tone: 'green' },
  { label: 'Auth', value: 'Supabase SSR', tone: 'cyan' },
  { label: 'Admin role', value: 'superuser', tone: 'violet' },
]

export const securityNotes = [
  { label: 'Authentification', value: 'Proxy Supabase actif', icon: ShieldCheck },
  { label: 'Autorisation', value: 'Verification serveur par route admin', icon: ShieldCheck },
  { label: 'Monitoring', value: 'Kuma non duplique', icon: Activity },
]
