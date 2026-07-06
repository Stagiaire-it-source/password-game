import React from "react";
import { useState, useEffect } from 'react'
import PasswordInput from './components/PasswordInput'
import UsernameInput from './components/UsernameInput'
import checkUsername from './logic/usernameRules'
import checkPassword from './logic/passwordRules'
import handleSubmit from './components/SubmitButton'

function App() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  useEffect(() => {setUsernameError(checkUsername(username));}, [username]);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  useEffect(() => {setPasswordError(checkPassword(password));}, [password]);
  
  return (
    <>
    <h1>Login</h1>
    <form  onSubmit={handleSubmit}>
      <UsernameInput value={username} onChange={(e) => setUsername(e.target.value)} />
          {username && usernameError && <p className="error">{usernameError}</p>}

      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          {password && passwordError && <p className="error">{passwordError}</p>}

      <button type="submit">Login</button>
    </form>
    </>
  )
}
export default App
