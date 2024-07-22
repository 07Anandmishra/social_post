import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users');
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      console.log('2', user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="welcome-text">WELCOME BACK</p>
        <h2 className="login-header">Log into your account</h2>
        
        <label className="input-label">Email or Username</label>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Enter your email or username" 
            className="text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="password-label-container">
          <label className="input-label">Password</label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        <div className="input-container">
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="text-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="visibility-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
        
        <button type="submit" className="login-button">Login now</button>
        
        <p className="register-prompt">
          Not registered yet? 
          <Link to="/register" className="register-link">Register →</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;