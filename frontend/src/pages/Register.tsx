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
      alert('Agent registered successfully!');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data || 'Error in registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-emerald-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-fuchsia-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white tracking-tighter">
            JOIN THE <span className="text-emerald-400">ELITE</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest">Recruitment Terminal</p>
        </div>

        <div className="space-y-4">
          <input 
            className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
            placeholder="Agent Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
            placeholder="Secure Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            className="w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
            type="password" 
            placeholder="Encryption Key" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(52,211,153,0.4)]">
            REGISTER AGENT
          </button>
        </div>
        <div className="mt-6 text-center">
          <a href="/login" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">
            Already a member? <span className="underline">Sign in</span>
          </a>
        </div>
      </form>
    </div>
  );
}
