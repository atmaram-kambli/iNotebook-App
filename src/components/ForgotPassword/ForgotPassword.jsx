import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './auth.css'; 

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = await fetch('http://localhost:5000/api/password/forgot-password', {
        const res = await fetch('https://inotebook-app-backend.vercel.app/api/password/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        alert(data.message);
        setTimeout(() => {
            navigate('/login')
        }, 500);
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h3>Forgot Password</h3>
                <p>Find Your Account</p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
