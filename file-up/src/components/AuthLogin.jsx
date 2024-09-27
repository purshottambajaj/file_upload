import React, { useState } from 'react';
import axios from 'axios';

const AuthLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setError('User registered. Please log in.');
    } catch (error) {
      setError('User already exists.');
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setUser(email); // Set the user to the App component
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AuthLogin;
