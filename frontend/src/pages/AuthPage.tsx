import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

// --- Componente de Notificación Interno (Para no depender de librerías externas) ---
function Notification({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  return (
    <div className={`fixed top-5 right-5 z-[100] px-6 py-3 rounded-lg shadow-2xl text-white text-sm font-medium animate-in fade-in slide-in-from-right-5 duration-300 ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {message}
    </div>
  );
}

export default function AuthPage() {
  // Estados de la vista y formulario
  const [view, setView] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para notificaciones
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Función para disparar notificaciones
  const showNotify = (msg: string, type: 'success' | 'error') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Lógica de la Terminal Animada (Exactamente como la pediste) ---
  const [text, setText] = useState('');
  const [step, setStep] = useState(0);
  const snippets = [
    'int nivel = 1;',
    'if (nivel < 5) { subir(); }',
    'for (int i = 0; i < 3; i++) {}',
    'public class Jugador { }'
  ];

  useEffect(() => {
    let i = 0;
    const currentSnippet = snippets[step % snippets.length];
    const interval = setInterval(() => {
      setText(currentSnippet.slice(0, i));
      i++;
      if (i > currentSnippet.length) {
        clearInterval(interval);
        setTimeout(() => setStep(s => s + 1), 1000);
      }
    }, 42); // Velocidad exacta de tu código original
    return () => clearInterval(interval);
  }, [step]);

  // --- Lógica de Autenticación ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data); // Actualiza el contexto global (instantáneo)
      showNotify('¡Bienvenido de nuevo, Agente!', 'success');
      setTimeout(() => navigate('/game'), 1000);
    } catch (error: any) {
      showNotify(error.response?.data || 'Error de autenticación', 'error');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      showNotify('Cuenta creada con éxito. Ahora inicia sesión.', 'success');
      setTimeout(() => setView('login'), 1500);
    } catch (error: any) {
      showNotify(error.response?.data || 'Error en el registro', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F1EC] p-6 font-sans">
      {/* Renderizado de la notificación si existe */}
      {notification && <Notification message={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

      <div className="relative w-full max-w-[1000px] min-h-[560px] rounded-[18px] overflow-hidden bg-white border border-[#E7E4DC]">

        {/* PANEL IZQUIERDO (Copiado exactamente de tu HTML) */}
        <div 
          className="absolute inset-y-0 left-0 w-[56%] bg-gradient-to-br from-[#2E4A78] via-[#1E304F] to-[#121D33] text-white flex flex-col justify-between px-10 py-10 pr-16 overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0% 100%)' }}
        >
          <div className="absolute w-72 h-72 rounded-full bg-[#4A6BA8]/25 blur-3xl -top-16 -left-16 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F0973D] flex items-center justify-center font-mono font-semibold text-[#17233B] text-sm">&lt;/&gt;</div>
              <span className="font-bold text-[17px]">BugBuster</span>
            </div>
            <h1 className="font-semibold text-[22px] leading-snug mt-5 max-w-[19ch]">
              Aprende Java desde cero y demuestra lo que sabes.
            </h1>
          </div>

          {/* Ruta de aprendizaje animada */}
          <div className="relative z-10 w-full">
            <p className="font-mono text-[10px] text-[#F5CFA3] mb-4 tracking-wide">tu ruta de aprendizaje</p>
            <div className="flex items-center justify-between mb-8">
              {[
                { id: 1, name: 'Variables' },
                { id: 2, name: 'Condicionales' },
                { id: 3, name: 'Bucles' },
                { id: 4, name: 'Clases' }
              ].map((node, idx) => {
                const isActive = (step % 4) === idx;
                return (
                  <React.Fragment key={node.id}>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold transition-all duration-300 ${isActive ? 'bg-[#F0973D] text-[#17233B] shadow-[0_0_0_4px_rgba(240,151,61,0.25)]' : 'bg-white/15 border border-white/25 text-[#DCE4F2]'}`}>
                        {node.id}
                      </div>
                      <span className={`text-[10px] text-center transition-colors duration-300 ${isActive ? 'text-[#DCE4F2]' : 'text-[#9FB0CE]'}`}>{node.name}</span>
                    </div>
                    {idx < 3 && <div className="h-px flex-1 bg-white/20 -mt-6" />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="bg-black/25 rounded-lg px-3.5 py-3 font-mono text-[11.5px] leading-relaxed whitespace-nowrap overflow-hidden">
              <span className="text-[#F5CFA3]">{text}</span>
              <span className="inline-block w-1 h-3 bg-white animate-pulse ml-1 align-middle"></span>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO (Copiado exactamente de tu HTML) */}
        <div className="ml-[56%] px-14 py-14 min-h-[560px] flex flex-col justify-center">
          {view === 'login' ? (
            <div className="block animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="font-semibold text-[21px] text-[#1E2233] mb-7">Inicia sesión</h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="mb-5">
                  <label className="block text-xs text-[#8A8A94] mb-1.5">Correo</label>
                  <input 
                    type="text" 
                    placeholder="Escribe tu correo aquí"
                    className="w-full py-2.5 border-0 border-b border-[#E7E4DC] bg-transparent text-sm text-[#1E2233] placeholder-[#BAB8B0] focus:border-[#243A5E] outline-none transition-colors"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-xs text-[#8A8A94] mb-1.5">Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="Escribe tu contraseña aquí"
                    className="w-full py-2.5 border-0 border-b border-[#E7E4DC] bg-transparent text-sm text-[#1E2233] placeholder-[#BAB8B0] focus:border-[#243A5E] outline-none transition-colors"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#8A8A94] my-2 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-auto" /> Recordarme
                  </label>
                  <a href="#" className="text-[#243A5E]">Olvidé mi contraseña</a>
                </div>
                <button className="w-full py-3 rounded-lg bg-[#243A5E] hover:bg-[#17233B] border border-[#243A5E] hover:border-[#17233B] text-white text-sm font-semibold transition-colors">
                  Entrar a BugBuster
                </button>
              </form>
              <p className="text-center text-[12.5px] text-[#8A8A94] mt-5">
                ¿No tienes una cuenta? 
                <button onClick={() => setView('register')} className="text-[#E2833D] font-semibold ml-1 hover:underline">Crea una</button>
              </p>
            </div>
          ) : (
            <div className="block animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="font-semibold text-[21px] text-[#1E2233] mb-7">Crea tu cuenta</h2>
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="mb-5">
                  <label className="block text-xs text-[#8A8A94] mb-1.5">Nombre de usuario</label>
                  <input 
                    type="text" 
                    placeholder="Escribe tu nombre de usuario aquí"
                    className="w-full py-2.5 border-0 border-b border-[#E7E4DC] bg-transparent text-sm text-[#1E2233] placeholder-[#BAB8B0] focus:border-[#243A5E] outline-none transition-colors"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-xs text-[#8A8A94] mb-1.5">Correo</label>
                  <input 
                    type="email" 
                    placeholder="Escribe tu correo aquí"
                    className="w-full py-2.5 border-0 border-b border-[#E7E4DC] bg-transparent text-sm text-[#1E2233] placeholder-[#BAB8B0] focus:border-[#243A5E] outline-none transition-colors"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-xs text-[#8A8A94] mb-1.5">Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="Mínimo 8 caracteres"
                    className="w-full py-2.5 border-0 border-b border-[#E7E4DC] bg-transparent text-sm text-[#1E2233] placeholder-[#BAB8B0] focus:border-[#243A5E] outline-none transition-colors"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="w-full py-3 rounded-lg bg-[#243A5E] hover:bg-[#17233B] border border-[#243A5E] hover:border-[#17233B] text-white text-sm font-semibold transition-colors">
                  Crear cuenta
                </button>
              </form>
              <p className="text-center text-[12.5px] text-[#8A8A94] mt-5">
                ¿Ya tienes cuenta? 
                <button onClick={() => setView('login')} className="text-[#E2833D] font-semibold ml-1 hover:underline">Inicia sesión</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
