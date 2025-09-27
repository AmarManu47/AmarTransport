import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label><br />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
