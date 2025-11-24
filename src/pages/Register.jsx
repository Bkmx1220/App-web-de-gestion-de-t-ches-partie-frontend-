// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' }); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      setSuccess('Compte créé avec succès ✅');
      setError('');
      setTimeout(() => navigate('/'), 1500); // redirection vers Login après 1.5s
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de l’inscription.');
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow bg-white" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Inscription</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-3">
          Déjà un compte ? <a href="/" className="text-primary">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
