import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

type View = 'login' | 'signup'

function App() {
  const [view, setView] = useState<View>('login')

  return view === 'login' ? (
    <Login onSwitch={() => setView('signup')} />
  ) : (
    <Signup onSwitch={() => setView('login')} />
  )
}

export default App
