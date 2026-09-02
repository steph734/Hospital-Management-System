import { Icon } from './icons'

type PatientTopbarProps = {
  /** Called when the user picks sign out from the account button. */
  onSignOut?: () => void
}

function PatientTopbar({ onSignOut }: PatientTopbarProps) {
  return (
    <header className="pt-topbar">
      <div className="pt-search">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder="Search doctors, records, prescriptions..."
        />
      </div>

      <div className="pt-topbar-spacer" />

      <button className="pt-icon-btn" type="button" aria-label="Notifications">
        <Icon name="bell" size={19} />
        <span className="pt-badge" />
      </button>
      <button className="pt-icon-btn" type="button" aria-label="Messages">
        <Icon name="chat" size={19} />
        <span className="pt-badge" />
      </button>

      <button
        className="pt-user"
        type="button"
        onClick={onSignOut}
        title="Sign out"
      >
        <span className="pt-avatar">MC</span>
        <span className="pt-user-text">
          <span className="pt-user-name">Maria Cruz</span>
          <span className="pt-user-id">Patient ID #48213</span>
        </span>
      </button>
    </header>
  )
}

export default PatientTopbar
