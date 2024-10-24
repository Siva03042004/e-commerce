/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../Config/firebase';
import '../Styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/landing');
            }
        });
        return () => unsubscribe(); 
    }, [navigate]);

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError('');
        setLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/landing');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        setError("No account found with this email. Please sign up.");
                        break;
                    case 'auth/wrong-password':
                        setError("Incorrect password. Please try again.");
                        break;
                    default:
                        setError("An error occurred. Please try again later.");
                        break;
                }
                console.error("Login error: ", error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='login-container'>
            <h1 className='login-title'>SEYON</h1>
            <h3 className='login-subtitle'>Login</h3>
            {error && <p className="login-error" role="alert">{error}</p>}
            <div className='login-input-group'>
                <label className='login-label' htmlFor="inputEmail">Email ID:</label>
                <input
                    className='login-input'
                    type="email"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    disabled={loading}
                />
            </div>
            <div className='login-input-group'>
                <label className='login-label' htmlFor="inputPassword">Password:</label>
                <input
                    className='login-input'
                    type="password"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    disabled={loading}
                />
                <div className='login-password-tip'>
                    Your password must be more than 6 characters long.
                </div>
            </div>
            <p className='login-footer'>
                Don't have an account? Please create an account <Link to={'/signup'}>Click here</Link>.
            </p>
            <button className='login-button' type="button" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging In...' : 'Login'}
            </button>
        </div>
    );
};

export default Login;
