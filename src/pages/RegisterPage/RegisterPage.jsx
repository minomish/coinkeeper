import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

const Register = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const toggleAuthMode = () => {
        setIsLoggingIn((prev) => !prev);
        setError('');
    };

    useEffect(() => {
        const authStatus = Cookies.get('authStatus');
        setIsLoggingIn(authStatus === 'login');
    }, []);

    const handleAuthAction = () => {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        const usersCookie = Cookies.get('users');
        const users = usersCookie ? JSON.parse(usersCookie) : {};

        if (isLoggingIn) {
            if (users[email] && users[email] === password) {
                Cookies.set('authStatus', 'login');
                Cookies.set('userEmail', email);
                navigate("/dashboard");
            } else {
                setError('Invalid email or password');
            }
        } else {
            if (users[email]) {
                setError('User already registered');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const updatedUsers = { ...users, [email]: password };
            Cookies.set('users', JSON.stringify(updatedUsers));

            Cookies.set('authStatus', 'login');
            Cookies.set('userEmail', email);
            navigate("/dashboard");
        }
    };

    return (
        <div className="auth">
            <h2>{isLoggingIn ? "Sign In" : "Register"}</h2>

            <div className="form">
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input_auth"
                />

                <input 
                    type="password" 
                    placeholder={isLoggingIn ? "Password" : "Enter password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input_auth"
                />

                {!isLoggingIn && (
                    <input 
                        type="password" 
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input_auth"
                    />
                )}

                <button onClick={handleAuthAction}>
                    {isLoggingIn ? "Sign In" : "Register"}
                </button>

                {error && <p className="error">{error}</p>}

                <div>
                    {isLoggingIn ? (
                        <p>Don't have an account? <a href="#" onClick={toggleAuthMode}>Register</a></p>
                    ) : (
                        <p>Already have an account? <a href="#" onClick={toggleAuthMode}>Sign In</a></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
