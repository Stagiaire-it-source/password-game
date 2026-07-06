import { useState, useEffect } from 'react'
import PasswordInput from '../components/PasswordInput'
import UsernameInput from '../components/UsernameInput'
import checkUsername from '../logic/usernameRules'
import {checkPassword, confirmPassword }from '../logic/passwordRules'

function Login() {
    const [step, setStep] = useState("login");

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    useEffect(() => {setUsernameError(checkUsername(username));}, [username]);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    useEffect(() => {setPasswordError(checkPassword(password));}, [password]);

    const [confirmPassword, setconfirmPassword] = useState('');
    const [confPassMess, setconfPassMess] = useState('');
    useEffect(() => {setconfPassMess(confirmPassword(confirmPassword, password));}, [confirmPassword, password]);


    const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = usernameError || passwordError;
    if (hasError) return;
    setStep("confirm"); // the key
    };

    const confirmSubmit = (e) => {
    e.preventDefault();
    const hasError = confPassMess !== "Password confirmed";
    if (hasError) return;
    setStep("success");
    };

    if (step === "confirm") {
    return (
        <div>
        <h1>Confirm Password</h1>
        <form onSubmit={confirmSubmit}>
        <PasswordInput value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
        {confirmPassword && confPassMess && <p className="error">{confPassMess}</p>}
        <button type="submit">Confirm</button>
        </form>
        </div>
    );
    }

    if (step === "success") {
        return(
            <landingPage />
        );
    }

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
export default Login
