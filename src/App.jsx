import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'

function App() {
  const [step, setStep] = useState('login') // 'login' | 'logged'

  if (step === 'logged') {
    return <Landing />
  }

  return <Login onSuccess={() => setStep('logged')} />
}

export default App
