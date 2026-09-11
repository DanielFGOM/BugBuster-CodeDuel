import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AuthPage() {
  // ==========================================================================
  // LÓGICA EXISTENTE (NO MODIFICADA)
  // ==========================================================================
  const [view, setView] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data);
      toast.success('¡Bienvenido de nuevo, Agente!');
      setTimeout(() => navigate('/game'), 1000);
    } catch (error: any) {
      toast.error(error.response?.data || 'Error de autenticación');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      toast.success('Cuenta creada con éxito. Ahora inicia sesión.');
      setTimeout(() => setView('login'), 1500);
    } catch (error: any) {
      toast.error(error.response?.data || 'Error en el registro');
    }
  };

  // ==========================================================================
  // LÓGICA NUEVA (SOLO PARA LA ANIMACIÓN VISUAL)
  // ==========================================================================
  const steps = [
    { label: "Variables", code: "int nivel = 1;" },
    { label: "Condicionales", code: "if (nivel < 5) { subirDeNivel(); }" },
    { label: "Bucles", code: "for (int i = 0; i < 3; i++) {}" },
    { label: "Clases", code: "class Heroe { String nombre; }" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const currentCode = steps[currentStep].code;
    let i = 0;
    
    const timer = setInterval(() => {
      if (!isErasing) {
        // Efecto Escribir
        setDisplayText(currentCode.slice(0, i + 1));
        i++;
        if (i === currentCode.length) {
          setTimeout(() => setIsErasing(true), 1500); // Espera antes de borrar
        }
      } else {
        // Efecto Borrar
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length === 0) {
          setIsErasing(false);
          setCurrentStep((prev) => (prev + 1) % steps.length);
          i = 0;
        }
      }
    }, isErasing ? 30 : 60);

    return () => clearInterval(timer);
  }, [currentStep, isErasing, displayText]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7f8] p-6 font-sans">
      
      <div className="w-full max-w-[1000px] min-h-[590px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(27,42,65,0.12)]">
        
        {/* =========================
            PARTE IZQUIERDA
        ========================= */}
        <div 
          className="relative bg-gradient-to-br from-[#1B2A41] to-[#101c2c] text-white p-12 lg:p-14 z-10"
          style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}
        >
          {/* Logo BugBuster */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[38px] h-[38px] bg-[#F2A65A] text-[#1B2A41] rounded-[9px] flex items-center justify-center font-mono font-extrabold text-base">
              &lt;/&gt;
            </div>
            <span className="text-lg font-extrabold">BugBuster</span>
          </div>

          {/* Título */}
          <h1 className="text-[32px] font-extrabold leading-[1.28] mb-12 max-w-[350px]">
            Aprende Java desde cero y demuestra lo que sabes.
          </h1>

          {/* Ruta de Aprendizaje */}
          <div className="font-mono text-sm text-[#F2A65A] mb-4">
            tu ruta de aprendizaje
          </div>

          <div className="flex items-start justify-between w-full mb-10">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Grupo del Paso */}
                <div className={`flex flex-col items-center w-[70px] shrink-0 ${idx === currentStep ? 'text-white' : ''}`}>
                  <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-extrabold transition-all duration-400 ${
                    idx < currentStep ? 'bg-[#3CB878] text-white' : 
                    idx === currentStep ? 'bg-[#F2A65A] text-[#1B2A41] scale-110' : 
                    'bg-white/10 text-[#9FB0BF]'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`mt-[10px] text-[11px] font-semibold transition-colors duration-400 ${
                    idx === currentStep ? 'text-white' : 'text-[#8FA0AE]'
                  }`}>
                    {step.label}
                  </span>
                </div>

                {/* Guion entre pasos */}
                {idx < steps.length - 1 && (
                  <div className="w-[28px] h-[34px] flex items-center justify-center text-white/40 text-lg font-bold shrink-0">
                    -
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Caja de Código (Terminal) */}
          <div className="mt-10 w-full bg-black/30 rounded-[9px] p-4 font-mono text-sm text-[#F2A65A] min-h-[48px] whitespace-nowrap overflow-hidden">
            <span>{displayText}</span>
            <span className="inline-block w-[7px] h-[15px] bg-[#F2A65A] ml-1 animate-pulse align-middle"></span>
          </div>
        </div>

        {/* =========================
            PARTE DERECHA
        ========================= */}
        <div className="bg-white p-12 lg:p-14 flex flex-col justify-center">
          {view === 'login' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-7 text-[#1B2A41]">Inicia sesión</h2>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs text-[#5b6b76] mb-1.5">Nombre de usuario</label>
                  <input 
                    type="text"
                    className="w-full bg-[#EEF3F6] border border-transparent rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#F2A65A]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5b6b76] mb-1.5">Contraseña</label>
                  <input 
                    type="password"
                    className="w-full bg-[#EEF3F6] border border-transparent rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#F2A65A]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="w-full bg-[#1B2A41] text-white p-3.5 rounded-lg font-bold text-sm transition-all hover:bg-[#24384f] active:scale-[0.99]">
                  Entrar a BugBuster
                </button>
              </form>

              <div className="text-center mt-4 text-sm text-[#5b6b76]">
                ¿No tienes cuenta? <button onClick={() => setView('register')} className="text-[#E38F3D] font-bold hover:underline">Crea una</button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-7 text-[#1B2A41]">Crea tu cuenta</h2>
              
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-xs text-[#5b6b76] mb-1.5">Nombre de usuario</label>
                  <input 
                    type="text"
                    className="w-full bg-[#EEF3F6] border border-transparent rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#F2A65A]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5b6b76] mb-1.5">Correo electrónico</label>
                  <input 
                    type="email"
                    className="w-full bg-[#EEF3F6] border border-transparent rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#F2A65A]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5b6b76] mb-1.5">Contraseña</label>
                  <input 
                    type="password"
                    className="w-full bg-[#EEF3F6] border border-transparent rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#F2A65A]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="w-full bg-[#1B2A41] text-white p-3.5 rounded-lg font-bold text-sm transition-all hover:bg-[#24384f] active:scale-[0.99]">
                  Crear cuenta
                </button>
              </form>

              <div className="text-center mt-4 text-sm text-[#5b6b76]">
                ¿Ya tienes cuenta? <button onClick={() => setView('login')} className="text-[#E38F3D] font-bold hover:underline">Inicia sesión</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
