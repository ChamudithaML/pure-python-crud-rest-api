import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login({ handleLog }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
    
        var username = email;
    
        try {
            const response = await axios.post('http://localhost:5000/signin', {
                username,
                password
            });

            if (response.status === 200 && response.data.message.token) {
                const result = response.data.message;
                localStorage.setItem('token', result.token); 
                handleLog();
                navigate('/home'); 
            } else {
                throw new Error('Login failed: Invalid credentials or token missing');
            }
    
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };
    

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn">Login</button>
            </form>

            <Link to='/signup'>
                Sign Up From Here
            </Link>
        </div>
    );
}

export default Login;
