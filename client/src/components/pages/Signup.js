import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            alert("Error: " + error)
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            alert("Error: " + error)
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                name: username,
                username: email,
                password: password,
            });

            if (response.status !== 201) {
                console.log(response);
                alert("Signup Failed");
                throw new Error('Signup failed');
            }

            const result = response.data;
            alert(result.message);
            console.log(result);
            resetFields();

        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const resetFields = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Sign Up</button>
            </form>

            <Link to='/login'>
                Login From Here
            </Link>
        </div>
    );
}

export default Signup;
