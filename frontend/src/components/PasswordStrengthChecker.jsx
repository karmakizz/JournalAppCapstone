import React, { useState } from 'react';
import '../css/Login.css';

const PasswordStrengthChecker = ({ password, setPassword }) => {
    const [strength, setStrength] = useState('');

    const hasNumber = (password) => /\d/.test(password);
    const hasLetter = (password) => /[a-zA-Z]/.test(password);
    const hasSpecialChar = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passwordStrength = (password) => {
        if (password.length < 6) {
            setStrength('Weak');
        } else if (password.length >= 8 && hasLetter(password) && hasNumber(password) && hasSpecialChar(password)) {
            setStrength('Strong');
        } else if (password.length >= 6 && hasLetter(password) && hasNumber(password)) {
            setStrength('Medium');
        } else {
            setStrength('Enter a valid password');
        }
    };

    // Colors for strength levels
    const strengthColor = {
        Weak: 'red',
        Medium: 'orange',
        Strong: 'green'
    };

    return (
        <div className="password-container">
            <label htmlFor="password" className="login-label">Password:</label>
            <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    passwordStrength(newPassword);
                }}
            />
            <div className="password-strength" style={{ color: strengthColor[strength] }}>
                {strength && `Strength: ${strength}`}
            </div>
        </div>
    );
};

export default PasswordStrengthChecker;