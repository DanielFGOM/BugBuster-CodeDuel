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
      alert('Agente registrado con éxito. Bienvenido al sistema.');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Decoraciones de Fondo (Idénticas al Login para coherencia) */}
      <div className="absolute -top-20 -left-20 w-96 h-96 opacity-90" style={{ background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(153,20,20,0.55) 18px, rgba(153,20,20,0.55) 26px)', clipPath: 'polygon(0 0, 60% 0, 0 60%)' }} />
      <div className="absolute -bottom-24 -left-16 w-[28rem] h-72 opacity-80" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(139,20,20,0.5) 16px, rgba(139,20,20,0.5) 24px)', clipPath: 'polygon(0 100%, 45% 100%, 0 40%)' }} />
      <div className="absolute -top-16 -right-16 w-80 h-64 opacity-70" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(139,20,20,0.5) 16px, rgba(139,20,20,0.5) 24px)', clipPath: 'polygon(100% 0, 100% 55%, 40% 0)' }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 opacity-90" style={{ background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(153,20,20,0.55) 18px, rgba(153,20,20,0.55) 26px)', clipPath: 'polygon(100% 100%, 100% 40%, 40% 100%)' }} />

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md bg-[#0c0c0c]/95 backdrop-blur-sm border border-red-800/70 p-9" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)', boxShadow: '0 0 40px rgba(220,38,38,0.15), inset 0 0 60px rgba(0,0,0,0.4)' }}>
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight"><span className="text-red-600">{'>_'}</span> <span className="text-white">JOIN THE</span><span className="text-red-600"> ELITE</span></h1>
          <p className="text-neutral-500 text-xs mt-2 uppercase tracking-[0.2em]">Recruitment Terminal</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"><UserIcon /> Agent Username</label>
            <input className="w-full px-4 py-3 bg-[#141414] text-white placeholder-neutral-600 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 outline-none transition-all rounded-md" placeholder="Crea tu nombre de agente..." value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"><MailIcon /> Secure Email</label>
            <input className="w-full px-4 py-3 bg-[#141414] text-white placeholder-neutral-600 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 outline-none transition-all rounded-md" placeholder="email@seguro.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"><LockIcon /> Encryption Key</label>
            <input className="w-full px-4 py-3 bg-[#141414] text-white placeholder-neutral-600 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 outline-none transition-all rounded-md" type="password" placeholder="Crea tu contraseña..." value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full mt-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3.5 rounded-md transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.35)] uppercase tracking-wider flex items-center justify-center gap-2"><span>→</span> Registrar Agente</button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-neutral-500 text-sm">¿Ya eres miembro? </span>
          <a href="/login" className="text-red-500 hover:text-red-400 text-sm underline underline-offset-2">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
}

function UserIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>; }
function MailIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>; }
function LockIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>; }
