import LuminaLogo from '../components/LuminaLogo'
import { Icon, type IconName } from './icons'

export type NavKey =
  | 'dashboard'
  | 'appointments'
  | 'records'
  | 'prescriptions'
  | 'labs'
  | 'messages'
  | 'billing'

type NavItem = { key: NavKey; label: string; icon: IconName }

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { key: 'appointments', label: 'Appointments', icon: 'calendar' },
  { key: 'records', label: 'Medical records', icon: 'file' },
  { key: 'prescriptions', label: 'Prescriptions', icon: 'pill' },
  { key: 'labs', label: 'Lab results', icon: 'droplet' },
  { key: 'messages', label: 'Messages', icon: 'message' },
  { key: 'billing', label: 'Billing', icon: 'card' },
]

type PatientSidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
}

function PatientSidebar({ active, onNavigate }: PatientSidebarProps) {
  return (
    <aside className="pt-sidebar">
      <div className="pt-brand">
        <LuminaLogo size={34} markOnly />
        <div>
          <div className="pt-brand-name">LUMINA</div>
          <div className="pt-brand-sub">HEALTH PARTNER</div>
        </div>
      </div>

      <div className="pt-menu-label">MENU</div>
      <nav className="pt-nav">
        {NAV.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`pt-nav-item${active === item.key ? ' is-active' : ''}`}
            onClick={() => onNavigate(item.key)}
            aria-current={active === item.key ? 'page' : undefined}
          >
            <Icon name={item.icon} size={19} />
            <span className="pt-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-sidebar-spacer" />

      <div className="pt-urgent">
        <h3>Need urgent care?</h3>
        <p>Connect with an on-call physician in minutes, no appointment needed.</p>
        <button className="pt-btn pt-btn-primary" type="button">
          Start virtual visit
        </button>
      </div>
    </aside>
  )
}

export default PatientSidebar
