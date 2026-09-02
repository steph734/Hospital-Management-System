import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import PatientDashboard from './patients/PatientDashboard'
import DoctorDashboard from './doctors/DoctorDashboard'
import type { Account } from './auth'

type View = 'login' | 'signup' | 'dashboard'

function App() {
  const [view, setView] = useState<View>('login')
  const [account, setAccount] = useState<Account | null>(null)

  function signOut() {
    setAccount(null)
    setView('login')
  }

  if (view === 'dashboard' && account) {
    return account.role === 'doctor' ? (
      <DoctorDashboard account={account} onSignOut={signOut} />
    ) : (
      <PatientDashboard onSignOut={signOut} />
    )
  }

  if (view === 'signup')
    return <Signup onSwitch={() => setView('login')} />

  return (
    <Login
      onSwitch={() => setView('signup')}
      onSuccess={(acct) => {
        setAccount(acct)
        setView('dashboard')
      }}
    />
  )
}

export default App
