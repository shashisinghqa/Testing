'use client';

import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return false;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess('Registration successful! You can now login.');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        disabled={loading}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        disabled={loading}
                        required
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
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

            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    disabled={loading}
                    required
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default Register;