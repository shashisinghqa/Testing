import React, { useState } from 'react';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgot-password';
import styles from '../../styles/auth.module.css';

const AuthPage = () => {
    const [view, setView] = useState('login');

    const toggleView = (newView) => {
        setView(newView);
    };

    return (
        <div className={styles.authContainer}>
            <h1>Authentication</h1>
            <div>
                <button onClick={() => toggleView('login')}>Login</button>
                <button onClick={() => toggleView('register')}>Register</button>
                <button onClick={() => toggleView('forgot-password')}>Forgot Password?</button>
            </div>
            {view === 'login' && <Login />}
            {view === 'register' && <Register />}
            {view === 'forgot-password' && <ForgotPassword />}
        </div>
    );
};

export default AuthPage;
