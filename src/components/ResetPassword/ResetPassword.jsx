import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './auth.css';

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = await fetch(`http://localhost:5000/api/password/reset-password/${token}`, {
        const res = await fetch(`https://inotebook-app-backend.vercel.app/api/password/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });
        const data = await res.json();
        if(res.ok) {
            navigate('/login')
        }else {
            alert(data.message)
            // setMessage("Something went wrong!!")
            navigate('/login')
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
