import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Registro exitoso, inicia sesión');
      navigate('/login');
    } catch (error) {
      alert('Error en registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-white text-2xl mb-4">Registro</h2>
        <input className="w-full p-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Registrar</button>
        <p className="text-gray-400 mt-2 text-sm"><a href="/login" className="text-blue-400">Iniciar sesión</a></p>
      </form>
    </div>
  );
}