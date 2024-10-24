/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../Config/firebase';
import '../Styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/landing'); // Navigate to landing page after signup
            }
        });
        return () => unsubscribe(); 
    }, [navigate]);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError('');
        setLoading(true);
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Registration successful");
                navigate('/landing'); // Redirect to the landing page after successful signup
            })
            .catch((error) => {
                let errorMessage;
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already in use. Please login or use another email.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address. Please enter a valid email.';
                        break;
                    default:
                        errorMessage = 'Error during registration: ' + error.message;
                }
                setError(errorMessage);
                console.error("Error during registration: ", error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='signup-container'>
            <h1 className='signup-title'>SEYON</h1>
            <h3 className='signup-subtitle'>Signup</h3>
            {error && <p className="signup-error">{error}</p>}
            <div className='signup-input-group'>
                <label htmlFor="inputEmail" className="signup-label">Email ID:</label>
                <input
                    type="email"
                    id="inputEmail"
                    className="signup-input"
                    aria-describedby="emailHelpBlock"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    required // Mark as required
                />
            </div>
            <div className='signup-input-group'>
                <label htmlFor="inputPassword" className="signup-label">Password:</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="signup-input"
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    required // Mark as required
                />
                <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="signup-input"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); }}
                    required // Mark as required
                />
                <div id="passwordHelpBlock" className="signup-password-help">
                    Your password must be more than 6 characters long.
                </div>
            </div>
            <p className='signup-footer'>
                Already have an account? Please login <Link to={'/'}>Click here</Link>.
            </p>
            <button type="button" className="signup-button" onClick={handleSignup} disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
        </div>
    );
};

export default Signup;
