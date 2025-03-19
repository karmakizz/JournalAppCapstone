import React, { useState } from 'react';
import axios from'axios';
import PasswordStrengthChecker from './PasswordStrengthChecker'; // Import PasswordStrengthChecker component
import '../css/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginMessage('Username and password are required');
      return;
    }

    console.log("Sending login request with:", { username, password });

    axios.post('http://localhost:7777/api/login', { username, password })
      .then((response) => {
        console.log('User logged in:', response.data);
        onLogin(username);
        setLoginMessage(`Successfully logged in as ${username}`);
      })
      .catch((error) => {
        console.error('Error logging in:', error.response?.data || error);
        setLoginMessage(error.response?.data?.message || 'Failed to log in');
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username" className="login-label">Username:</label>
        <input
          type="text"
          id="username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Pass password state and setPassword function as props */}
        <PasswordStrengthChecker 
          password={password} 
          setPassword={setPassword} 
        />

        <button type="submit" className="login-button">Enter</button>

        {loginMessage && <p>{loginMessage}</p>}
      </form>
    </div>
  );
}

export default Login;