import { useState, useEffect } from 'react';
import { useAuthLogic } from '../hooks/useAuthLogic';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function AuthPage() {
  const { view, setView, formData, handleInputChange, executeLogin, executeRegister } = useAuthLogic();
  
  const steps = [
    { label: "Variables", code: "int vidas = 3;" },
    { label: "Condicionales", code: "if (nivel < 5) { subirDeNivel(); }" },
    { label: "Bucles", code: "for (int i = 0; i < 3; i++) { atacar(); }" },
    { label: "Clases", code: "class Jugador { int nivel = 1; }" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentCode = steps[currentStep].code;
    if (charIndex < currentCode.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentCode.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
        setDisplayText('');
        setCharIndex(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, charIndex]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7f8] p-6 font-['Plus_Jakarta_Sans',_sans-serif]">
      <div className="w-full max-w-[1000px] min-h-[590px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[24px] overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-br from-[#1B2A41] to-[#101c2c] text-white p-12 z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}>
          <div className="pr-20 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#F4A85A] text-[#1B2A41] rounded-lg flex items-center justify-center font-mono font-bold text-lg">&lt;/&gt;</div>
              <span className="text-xl font-extrabold">BugBuster</span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight mb-12 max-w-[320px]">Aprende Java desde cero y demuestra lo que sabes.</h1>
            <div className="flex justify-between w-full mb-12 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${idx <= currentStep ? 'bg-[#F4A85A] text-[#1B2A41]' : 'bg-white/10 text-white/50'}`}>{idx + 1}</div>
                  <span className={`mt-2 text-[10px] font-semibold ${idx === currentStep ? 'text-white' : 'text-white/60'}`}>{step.label}</span>
                </div>
              ))}
              <div className="absolute top-4 left-0 w-full h-[2px] bg-white/10 -z-0"></div>
              <div className="absolute top-4 left-0 h-[2px] bg-[#F4A85A] transition-all duration-1000 -z-0" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-[#F4A85A] min-h-[60px] border border-white/5">
              {displayText}<span className="inline-block w-2 h-4 bg-[#F4A85A] ml-1 animate-pulse align-middle"></span>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 flex flex-col justify-center">
          {view === 'login' ? (
            <form onSubmit={executeLogin} className="space-y-5">
              <h2 className="text-2xl font-extrabold mb-6 text-[#1B2A41]">Inicia sesión</h2>
              <div className="space-y-4">
                <div><label className="block text-xs text-gray-500 mb-1">Nombre de usuario</label><input name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:ring-2 ring-[#F4A85A] border border-transparent" required /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Contraseña</label><input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:ring-2 ring-[#F4A85A] border border-transparent" required /></div>
              </div>
              <button className="w-full bg-[#1B2A41] text-white p-3 rounded-lg font-bold hover:bg-[#24384f] transition-all active:scale-95">Entrar a BugBuster</button>
              <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400"><div className="h-px flex-1 bg-gray-200" /><span>o continúa con</span><div className="h-px flex-1 bg-gray-200" /></div>
              <GoogleSignInButton />
              <p className="text-center text-sm text-gray-500 mt-4">¿No tienes cuenta? <button type="button" onClick={() => setView('register')} className="text-[#F4A85A] font-bold hover:underline">Crea una</button></p>
            </form>
          ) : (
            <form onSubmit={executeRegister} className="space-y-5">
              <h2 className="text-2xl font-extrabold mb-6 text-[#1B2A41]">Crea tu cuenta</h2>
              <div className="space-y-4">
                <div><label className="block text-xs text-gray-500 mb-1">Nombre de usuario</label><input name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:ring-2 ring-[#F4A85A] border border-transparent" required /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Correo</label><input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:ring-2 ring-[#F4A85A] border border-transparent" required /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Contraseña</label><input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:ring-2 ring-[#F4A85A] border border-transparent" required /></div>
              </div>
              <button className="w-full bg-[#1B2A41] text-white p-3 rounded-lg font-bold hover:bg-[#24384f] transition-all active:scale-95">Crear cuenta</button>
              <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400"><div className="h-px flex-1 bg-gray-200" /><span>o continúa con</span><div className="h-px flex-1 bg-gray-200" /></div>
              <GoogleSignInButton />
              <p className="text-center text-sm text-gray-500 mt-4">¿Ya tienes cuenta? <button type="button" onClick={() => setView('login')} className="text-[#F4A85A] font-bold hover:underline">Inicia sesión</button></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
