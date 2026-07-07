import { useState, useEffect } from 'react'
import '../assets/login.css'
import UsernameInput from '../components/UsernameInput'
import PasswordInput from '../components/PasswordInput'
import SubmitButton from '../components/SubmitButton'
import checkUsername from '../logic/usernameRules'
import checkPassword from '../logic/passwordRules'

function Login() {
    

    const [username, setUsername] = useState('');
    const [usernameChecks, setUsernameChecks] = useState([]);
    useEffect(() => {
    setUsernameChecks(checkUsername(username));
    }, [username]);

    const [password, setPassword] = useState('');
    const [passwordChecks, setPasswordChecks] = useState([]);
    useEffect(() => {
    setPasswordChecks(checkPassword(password));
    }, [password]);



    // handle
    const handleSubmit = (e) => {
    e.preventDefault();
    const isDone = (checks) => checks.length > 0 && checks[checks.length - 1].valid;
    const hasError = !isDone(usernameChecks) || !isDone(passwordChecks);
    if (hasError) return;

    };

    return (
            <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

            <UsernameInput value={username} onChange={(e) => setUsername(e.target.value)} />
            {username && (
            <div className="password-rules">
                {usernameChecks.map((check) => (
                <p key={check.id} className={check.valid ? 'success' : 'error'}>
                    {check.label}
                </p>
                ))}
            </div>
            )}
    
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            {password && (
                <div className="password-rules">
                    {passwordChecks.map((check) => (
                    <p key={check.id} className={check.valid ? 'success' : 'error'}>
                    {check.label}
                    </p>
                    ))}
                </div>
            )}
            <SubmitButton label ="Login" />
        </form>

            </div>
        );
    }
export default Login
