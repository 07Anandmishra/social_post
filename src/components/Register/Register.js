import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import './Register.css';



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <div className="signup-overlay">
    <div className="signup-container">
      <button className="close-button" onClick={() => navigate('/login')}>
        <CloseIcon />
      </button>
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-text">SIGN UP</p>
        <h2 className="signup-header">Create an account to continue</h2>
        
        <label className="input-label">Email</label>
        <div className="input-container">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="text-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <label className="input-label">Username</label>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Choose a preferred username" 
            className="text-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <label className="input-label">Password</label>
        <div className="input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Choose a strong password" 
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
        
        <button type="submit" className="signup-button">Continue</button>
        
        <p className="login-prompt">
          Already have an account?
          <Link to="/login" onClick={() => navigate('/login')} className="login-link">Login →</Link>
        </p>
      </form>
    </div>
  </div>
  );
};

export default Register;