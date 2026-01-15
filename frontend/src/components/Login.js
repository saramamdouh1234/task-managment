import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please enter email and password');
      return;
    }

    try {
      const res = await loginUser({ email, password });

      const token = res.data?.token;

      if (token) {


        setAuthToken(token);

        if (props.onLogin) {
          props.onLogin();
        }

        // Navigate to tasks page
        navigate('/tasks');
      } else {
        setMessage(res.data?.message || 'Login failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input 
          type="email"
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          autoComplete="off"
        /><br/>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          autoComplete="new-password"
        /><br/>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <span>Don't have an account? </span>
        <span 
          style={{ color: 'blue', cursor: 'pointer' }} 
          onClick={() => navigate('/register')}
        >
          Register
        </span>
      </div>
    </div>
  );
}

export default Login;
