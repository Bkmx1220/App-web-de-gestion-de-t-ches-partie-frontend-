// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from '../api'; 

export default function Login() {
  const [email, setEmail] = useState('');    
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ envoi email + password comme attendu par le backend NestJS
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      window.location.href = '/tasks'; // redirection après connexion
    } catch (err) {
      console.error(err);
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Connexion</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3">
          Pas encore de compte ? <a href="/register">S’inscrire</a>
        </p>
      </div>
    </div>
  );
}
