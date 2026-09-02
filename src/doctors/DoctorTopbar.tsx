import { Icon } from './icons'
import type { Account } from '../auth'

type DoctorTopbarProps = {
  account: Account
  /** Called when the user picks sign out from the account button. */
  onSignOut?: () => void
}

/** Two-letter initials from the account name, falling back to the email. */
function initials(account: Account): string {
  const source = (account.name ?? account.email).replace(/^dr\.?\s+/i, '')
  const parts = source.trim().split(/\s+/)
  const letters = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
  return letters.toUpperCase() || source.slice(0, 2).toUpperCase()
}

function DoctorTopbar({ account, onSignOut }: DoctorTopbarProps) {
  return (
    <header className="dr-topbar">
      <div className="dr-search">
        <Icon name="search" size={18} />
        <input type="search" placeholder="Search patients, records, orders..." />
      </div>

      <div className="dr-topbar-spacer" />

      <button className="dr-icon-btn" type="button" aria-label="Notifications">
        <Icon name="bell" size={19} />
        <span className="dr-badge" />
      </button>
      <button className="dr-icon-btn" type="button" aria-label="Messages">
        <Icon name="chat" size={19} />
        <span className="dr-badge" />
      </button>

      <button
        className="dr-user"
        type="button"
        onClick={onSignOut}
        title="Sign out"
      >
        <span className="dr-avatar is-green">{initials(account)}</span>
        <span className="dr-user-text">
          <span className="dr-user-name">{account.name ?? account.email}</span>
          <span className="dr-user-role">
            Cardiology
            <span className="dr-user-tag">Internal Medicine</span>
          </span>
        </span>
      </button>
    </header>
  )
}

export default DoctorTopbar
