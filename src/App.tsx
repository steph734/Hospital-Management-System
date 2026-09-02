import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import PatientDashboard from './patients/PatientDashboard'

type View = 'login' | 'signup' | 'dashboard'

function App() {
  const [view, setView] = useState<View>('login')

  if (view === 'dashboard')
    return <PatientDashboard onSignOut={() => setView('login')} />

  if (view === 'signup')
    return <Signup onSwitch={() => setView('login')} />

  return (
    <Login
      onSwitch={() => setView('signup')}
      onSuccess={() => setView('dashboard')}
    />
  )
}

export default App
