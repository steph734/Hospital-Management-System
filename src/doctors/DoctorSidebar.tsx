import LuminaLogo from '../components/LuminaLogo'
import { Icon, type IconName } from './icons'

export type NavKey =
  | 'dashboard'
  | 'schedule'
  | 'patients'
  | 'consultations'
  | 'prescriptions'
  | 'orders'
  | 'messages'

type NavItem = { key: NavKey; label: string; icon: IconName }

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { key: 'schedule', label: 'My schedule', icon: 'calendar' },
  { key: 'patients', label: 'Patients', icon: 'users' },
  { key: 'consultations', label: 'Consultations', icon: 'clipboard' },
  { key: 'prescriptions', label: 'Prescriptions', icon: 'pill' },
  { key: 'orders', label: 'Lab & imaging orders', icon: 'flask' },
  { key: 'messages', label: 'Messages', icon: 'chat' },
]

type DoctorSidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
}

function DoctorSidebar({ active, onNavigate }: DoctorSidebarProps) {
  return (
    <aside className="dr-sidebar">
      <div className="dr-brand">
        <LuminaLogo size={34} markOnly />
        <div>
          <div className="dr-brand-name">LUMINA</div>
          <div className="dr-brand-sub">HEALTH PARTNER</div>
        </div>
      </div>

      <div className="dr-menu-label">MENU</div>
      <nav className="dr-nav">
        {NAV.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`dr-nav-item${active === item.key ? ' is-active' : ''}`}
            onClick={() => onNavigate(item.key)}
            aria-current={active === item.key ? 'page' : undefined}
          >
            <Icon name={item.icon} size={19} />
            <span className="dr-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="dr-sidebar-spacer" />

      <div className="dr-oncall">
        <h3>On-call this week</h3>
        <p>You are the covering cardiologist until Friday 6:00 PM.</p>
        <button className="dr-btn dr-btn-ghost" type="button">
          View rota
        </button>
      </div>
    </aside>
  )
}

export default DoctorSidebar
