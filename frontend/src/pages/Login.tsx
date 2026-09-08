import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Franjas diagonales rojas - esquina superior izquierda */}
      <div className="absolute -top-20 -left-20 w-96 h-96 opacity-90"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(153,20,20,0.55) 18px, rgba(153,20,20,0.55) 26px)',
          clipPath: 'polygon(0 0, 60% 0, 0 60%)'
        }}
      />
      {/* Franjas diagonales rojas - esquina inferior izquierda */}
      <div className="absolute -bottom-24 -left-16 w-[28rem] h-72 opacity-80"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(139,20,20,0.5) 16px, rgba(139,20,20,0.5) 24px)',
          clipPath: 'polygon(0 100%, 45% 100%, 0 40%)'
        }}
      />
      {/* Franjas diagonales rojas - esquina superior derecha */}
      <div className="absolute -top-16 -right-16 w-80 h-64 opacity-70"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 16px, rgba(139,20,20,0.5) 16px, rgba(139,20,20,0.5) 24px)',
          clipPath: 'polygon(100% 0, 100% 55%, 40% 0)'
        }}
      />
      {/* Franjas diagonales rojas - esquina inferior derecha */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 opacity-90"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(153,20,20,0.55) 18px, rgba(153,20,20,0.55) 26px)',
          clipPath: 'polygon(100% 100%, 100% 40%, 40% 100%)'
        }}
      />

      {/* Panel de código de fondo (izquierda) */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-96 opacity-60 select-none pointer-events-none">
        <div className="bg-[#0a0a0a] border border-red-900/40 rounded-lg overflow-hidden shadow-2xl">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111] border-b border-red-900/30">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
          </div>
          <pre className="p-4 text-[13px] leading-6 font-mono">
            <code>
              <span className="text-neutral-500">1  </span>
              <span className="text-red-500">public class</span>{' '}
              <span className="text-white">Main</span> {'{'}
              {'\n'}
              <span className="text-neutral-500">2  </span>
              {'  '}
              <span className="text-red-500">public static void</span>{' '}
              <span className="text-white">main</span>(String[] args) {'{'}
              {'\n'}
              <span className="text-neutral-500">3  </span>
              {'    '}
              System.out.println(
              <span className="text-neutral-300">"Bienvenido a BugBuster"</span>);
              {'\n'}
              <span className="text-neutral-500">4  </span>
              {'  '}
              {'}'}
              {'\n'}
              <span className="text-neutral-500">5  </span>
              {'}'}
              {'\n\n'}
              <span className="text-neutral-500">6  </span>
              <span className="text-neutral-600">// Aprende. Practica. Construye.</span>
              {'\n'}
              <span className="text-neutral-500">7  </span>
              <span className="text-red-500">for</span> (int i = 0; i {'<'} 10; i++) {'{'}
              {'\n'}
              <span className="text-neutral-500">8  </span>
              {'  '}
              System.out.println(
              <span className="text-neutral-300">"Tu futuro en programación comienza aquí"</span>);
              {'\n'}
              <span className="text-neutral-500">9  </span>
              {'}'}
            </code>
          </pre>
        </div>
      </div>

      {/* Logo Java de fondo (derecha) */}
      <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col items-center opacity-90 select-none pointer-events-none">
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
          <path d="M70 10c20 20 15 30 0 45s-15 25 5 40" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M50 50c15 12 25 12 40 0" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="70" cy="100" rx="45" ry="16" stroke="#dc2626" strokeWidth="4" fill="none" />
          <path d="M35 108c-6 10 25 22 35 22s41-12 35-22" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M30 122c-8 12 28 26 40 26s48-14 40-26" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
        <span className="text-red-600 font-black text-5xl tracking-tight mt-2">Java</span>
      </div>

      {/* Card principal con esquinas cortadas */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-[#0c0c0c]/95 backdrop-blur-sm border border-red-800/70 p-9"
        style={{
          clipPath:
            'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)',
          boxShadow: '0 0 40px rgba(220,38,38,0.15), inset 0 0 60px rgba(0,0,0,0.4)'
        }}
      >
        {/* Esquinas rojas decorativas */}
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-red-600">{'>_'}</span>{' '}
            <span className="text-white">BUG</span>
            <span className="text-red-600">BUSTER</span>
          </h1>
          <p className="text-neutral-500 text-xs mt-2 uppercase tracking-[0.2em]">
            Authentication Terminal
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
              <UserIcon /> Username
            </label>
            <input
              className="w-full px-4 py-3 bg-[#141414] text-white placeholder-neutral-600 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 outline-none transition-all rounded-md"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
              <LockIcon /> Password
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 bg-[#141414] text-white placeholder-neutral-600 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 outline-none transition-all rounded-md pr-11"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-red-500"
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3.5 rounded-md transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.35)] uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>→</span> Iniciar Sesión
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-neutral-500 text-sm">¿Nuevo en BugBuster? </span>
          <a href="/register" className="text-red-500 hover:text-red-400 text-sm underline underline-offset-2">
            Crear una cuenta
          </a>
        </div>
      </form>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}
function EyeIcon({ off }: { off: boolean }) {
  return off ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.1A10.6 10.6 0 0112 5c6.5 0 10 7 10 7a13.6 13.6 0 01-3 3.9M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.2 3.6-.6" />
    </svg>
  );
}