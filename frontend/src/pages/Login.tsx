import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data);
      navigate('/game');
    } catch (error) {
      alert('Error en login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-white text-2xl mb-4">Login</h2>
        <input className="w-full p-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Entrar</button>
        <p className="text-gray-400 mt-2 text-sm"><a href="/register" className="text-blue-400">Registrarse</a></p>
      </form>
    </div>
  );
}