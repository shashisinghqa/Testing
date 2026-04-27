'use client';

import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            console.log('Login successful');
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordField}>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        disabled={loading}
                        required
                    />
                    <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;