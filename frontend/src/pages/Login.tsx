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
    } catch (error: any) {
      alert(error.response?.data || 'Error de autenticación');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-fuchsia-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-cyan-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white tracking-tighter">
            BUG<span className="text-cyan-400">BUSTER</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest">Authentication Terminal</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-cyan-400 font-bold uppercase mb-1 block">Username</label>
            <input 
              className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all" 
              placeholder="Enter agent ID..." 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label className="text-xs text-cyan-400 font-bold uppercase mb-1 block">Password</label>
            <input 
              className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold p-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            INITIALIZE SESSION
          </button>
        </div>
        <div className="mt-6 text-center">
          <a href="/register" className="text-slate-500 hover:text-fuchsia-400 text-sm transition-colors">
            New agent? <span className="underline">Create account</span>
          </a>
        </div>
      </form>
    </div>
  );
}
