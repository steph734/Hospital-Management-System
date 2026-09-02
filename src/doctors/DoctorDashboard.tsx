import { useState } from 'react'
import DoctorSidebar, { type NavKey } from './DoctorSidebar'
import DoctorTopbar from './DoctorTopbar'
import DashboardHome from './DashboardHome'
import type { Account } from '../auth'
import './doctors.css'

type DoctorDashboardProps = {
  account: Account
  /** Bubble up a sign-out request from the top bar. */
  onSignOut?: () => void
}

const PLACEHOLDER: Record<Exclude<NavKey, 'dashboard'>, string> = {
  schedule: 'My schedule',
  patients: 'Patients',
  consultations: 'Consultations',
  prescriptions: 'Prescriptions',
  orders: 'Lab & imaging orders',
  messages: 'Messages',
}

function DoctorDashboard({ account, onSignOut }: DoctorDashboardProps) {
  const [page, setPage] = useState<NavKey>('dashboard')

  return (
    <div className="dr-app">
      <DoctorSidebar active={page} onNavigate={setPage} />

      <div className="dr-main">
        <DoctorTopbar account={account} onSignOut={onSignOut} />

        <main className="dr-content">
          {page === 'dashboard' ? (
            <DashboardHome account={account} />
          ) : (
            <>
              <h1 className="dr-greeting">{PLACEHOLDER[page]}</h1>
              <p className="dr-greeting-sub">This section is coming soon.</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default DoctorDashboard
