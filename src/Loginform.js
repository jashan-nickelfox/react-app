import React, { useState } from 'react';

export default function Loginform() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' || password === 'password') {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid email or password');
    }
  };

  const handleSignup = () => {
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('Signup successful! You can now log in.');
      setIsLogin(true);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login Form</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot Password?</a>
            <button onClick={handleLogin}>Login Here</button>
            {message && <p>{message}</p>}
            <p>
              Not a Member? <a href="#" onClick={() => setIsLogin(false)}>Signup Now</a>
            </p>
          </div>
        ) : (
          <div className="form">
            <h2>Signup Form</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            {message && <p>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
