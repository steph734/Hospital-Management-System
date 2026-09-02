import { useState } from 'react'
import PatientSidebar, { type NavKey } from './PatientSidebar'
import PatientTopbar from './PatientTopbar'
import DashboardHome from './DashboardHome'
import Appointments from './Appointments'
import './patients.css'

type PatientDashboardProps = {
  /** Bubble up a sign-out request from the top bar. */
  onSignOut?: () => void
}

const PLACEHOLDER_TITLES: Record<NavKey, string> = {
  dashboard: 'Dashboard',
  appointments: 'Appointments',
  records: 'Medical records',
  prescriptions: 'Prescriptions',
  labs: 'Lab results',
  messages: 'Messages',
  billing: 'Billing',
}

function PatientDashboard({ onSignOut }: PatientDashboardProps) {
  const [page, setPage] = useState<NavKey>('dashboard')

  return (
    <div className="pt-app">
      <PatientSidebar active={page} onNavigate={setPage} />

      <div className="pt-main">
        <PatientTopbar onSignOut={onSignOut} />

        <main className="pt-content">
          {page === 'dashboard' && <DashboardHome />}
          {page === 'appointments' && <Appointments />}
          {page !== 'dashboard' && page !== 'appointments' && (
            <>
              <h1 className="pt-greeting">{PLACEHOLDER_TITLES[page]}</h1>
              <p className="pt-greeting-sub">This section is coming soon.</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default PatientDashboard
