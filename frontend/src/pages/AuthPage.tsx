import { useState, useEffect } from 'react';
import { useAuthLogic } from '../hooks/useAuthLogic';

export default function AuthPage() {
  const { view, setView, formData, handleInputChange, executeLogin, executeRegister } = useAuthLogic();
  
  const steps = [
    { label: "Variables", code: "int nivel = 1;" },
    { label: "Condicionales", code: "if (nivel < 5) { subir(); }" },
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
        // EFECTO ESCRIBIR
        setDisplayText(currentCode.slice(0, i + 1));
        i++;
        if (i === currentCode.length) {
          // Pausa al final antes de borrar
          setTimeout(() => setIsErasing(true), 1500);
        }
      } else {
        // EFECTO BORRAR
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length === 0) {
          setIsErasing(false);
          setCurrentStep((prev) => (prev + 1) % steps.length);
          i = 0;
        }
      }
    }, isErasing ? 30 : 70);

    return () => clearInterval(timer);
  }, [currentStep, isErasing, displayText]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7f8] p-6 font-sans">
      <div className="w-full max-w-[1000px] min-h-[590px] grid grid-cols-1 lg:grid-//cols-2 bg-white rounded-[20px] overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-br from-[#1B2A41] to-[#101c2c] text-white p-12 z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#F2A65A] text-[#1B2A41] rounded-lg flex items-center justify-center font-mono font-bold text-lg">&lt;/&gt;</div>
            <span className="text-xl font-extrabold">BugBuster</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight mb-12 max-w-[350px]">Aprende Java desde cero y demuestra lo que sabes.</h1>
          <div className="font-mono text-sm text-[#F2A65A] mb-4">tu ruta de aprendizaje</div>
          
          <div className="flex items-start justify-between w-full mb-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-0">
                <div className="flex flex-col items-center w-[70px]">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    idx < currentStep ? 'bg-[#3CB878] text-white' : 
                    idx === currentStep ? 'bg-[#F2A65A] text-[#1B2A41] scale-110' : 
                    'bg-white/10 text-white/50'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 ${idx === currentStep ? 'text-white' : 'text-white/60'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && <div className="w-6 flex items-center justify-center text-white/30 font-bold">-</div>}
              </div>
            ))}
          </div>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-[#F2A65A] min-h-[50px] overflow-hidden">
            {displayText}
            <span className="inline-block w-1 h-4 bg-[#F2A65A] ml-1 animate-pulse align-middle"></span>
          </div>
        </div>

        <div className="bg-white p-12 flex flex-col justify-center">
          {view === 'login' ? (
            <form onSubmit={executeLogin} className="space-y-5">
              <h2 className="text-2xl font-extrabold mb-6 text-[#1B2A41]">Inicia sesión</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Usuario</label>
                  <input name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:border-[#F2A65A] border border-transparent" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Contraseña</label>
                  <input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:border-[#F2A65A] border border-transparent" required />
                </div>
              </div>
              <button className="w-full bg-[#1B2A41] text-white p-3 rounded-lg font-bold hover:bg-[#24384f] transition-all active:scale-95">Entrar a BugBuster</button>
              <p className="text-center text-sm text-gray-500 mt-4">¿No tienes cuenta? <button type="button" onClick={() => setView('register')} className="text-[#E38F3D] font-bold hover:underline">Crea una</button></p>
            </form>
          ) : (
            <form onSubmit={executeRegister} className="space-y-5">
              <h2 className="text-2xl font-extrabold mb-6 text-[#1B2A41]">Crea tu cuenta</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Usuario</label>
                  <input name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:border-[#F2A65A] border border-transparent" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Correo</label>
                  <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:border-[#F2A65A] border border-transparent" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Contraseña</label>
                  <input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full bg-[#EEF3F6] rounded-lg p-3 text-sm outline-none focus:border-[#F2A65A] border border-transparent" required />
                </div>
              </div>
              <button className="w-full bg-[#1B2A41] text-white p-3 rounded-lg font-bold hover:bg-[#24384f] transition-all active:scale-95">Crear cuenta</button>
              <p className="text-center text-sm text-gray-500 mt-4">¿Ya tienes cuenta? <button type="button" onClick={() => setView('login')} className="text-[#E38F3D] font-bold hover:underline">Inicia sesión</button></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
