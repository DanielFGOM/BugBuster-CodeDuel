import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CodeEditor from '../components/CodeEditor';
import GameCanvas from '../components/GameCanvas';
import { useAuth } from '../hooks/useAuth';

interface Level {
  id: number;
  title: string;
  description: string;
  template: string;
  expectedOutput: string;
  hint: string;
}

export default function Game() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string; output?: string } | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      const res = await api.get('/game/levels');
      setLevels(res.data);
      if (res.data.length > 0) {
        const firstLevel = res.data[0];
        setCurrentLevel(firstLevel);
        setCode(firstLevel.template.replace('//USER_CODE', ''));
      }
    } catch (error) {
      toast.error("Error al cargar las misiones");
    }
  };

  const handleRunCode = async () => {
    if (!currentLevel) return;
    setResult(null); 
    try {
      const res = await api.post('/game/submit', { levelId: currentLevel.id, code });
      setResult(res.data);
      if (res.data.success) {
        toast.success('¡Misión Completada!');
      } else {
        toast.error('El código tiene errores o la salida no es la esperada.');
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Error en el servidor de compilación");
    }
  };

  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    setCode(level.template.replace('//USER_CODE', ''));
    setResult(null);
  };

  return (
    <div className="h-screen bg-[#f9fafa] text-[#20303c] flex flex-col font-sans overflow-hidden">
      
      {/* TOPBAR - Simplificado */}
      <header className="h-14 bg-white border-b border-[#E3E7E9] px-6 flex justify-between items-center shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F2A65A] flex items-center justify-center font-mono font-bold text-[#1B2A41] text-sm">&lt;/&gt;</div>
          <h1 className="text-lg font-extrabold text-[#1B2A41]">BugBuster</h1>
        </div>
        <button 
          onClick={logout} 
          className="text-xs font-bold uppercase tracking-wider bg-[#EEF3F6] hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg transition-all text-[#5b6b76]"
        >
          Salir
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - Misiones Flat List */}
        <aside className="w-64 bg-white border-r border-[#E3E7E9] p-4 flex flex-col">
          <div className="text-[11px] font-bold text-[#5b6b76] uppercase tracking-widest px-3 mb-3">Misiones</div>
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
            {levels.map((level, idx) => (
              <div 
                key={level.id} 
                onClick={() => selectLevel(level)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentLevel?.id === level.id 
                  ? 'bg-[#FFF3E7] text-[#1B2A41] border-l-4 border-[#F2A65A]' 
                  : 'hover:bg-[#F3F6F7] text-[#5b6b76] border-l-4 border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentLevel?.id === level.id ? 'bg-[#F2A65A] text-white' : 'bg-[#E9EDEF] text-[#5b6b76]'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold">{level.title}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* PANEL IZQUIERDO - Briefing (Hoja de Misión) */}
          <div className="w-[420px] p-7 border-r border-[#E3E7E9] overflow-y-auto bg-white">
            {currentLevel ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <p className="text-xs text-[#5b6b76] mb-1">Misión actual</p>
                <h1 className="text-2xl font-extrabold text-[#1B2A41] mb-6">{currentLevel.title}</h1>
                
                <div className="border border-[#E3E7E9] rounded-2xl p-6 space-y-6">
                  {/* 1. Concepto */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
                    <div>
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Concepto</div>
                      <p className="text-sm text-[#5b6b76] leading-relaxed">
                        {currentLevel.hint || "Aprende la sintaxis básica de Java para resolver este reto."}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[#E3E7E9] ml-6"></div>

                  {/* 2. Tarea */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
                    <div>
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Tu tarea</div>
                      <p className="text-sm text-[#5b6b76] leading-relaxed">
                        {currentLevel.description}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[#E3E7E9] ml-6"></div>

                  {/* 3. Ejemplo */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
                    <div>
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Ejemplo</div>
                      <div className="bg-[#20303c] text-[#7FE0A8] font-mono text-xs p-3 rounded-lg mt-2">
                        {`// Ejemplo sugerido\nSystem.out.println("Resultado");`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[#5b6b76] italic text-sm">Selecciona una misión...</div>
            )}
          </div>

          {/* PANEL DERECHO - Editor y Consola */}
          <div className="flex-1 flex flex-col bg-[#282a36]">
            {/* Editor Toolbar */}
            <div className="h-12 bg-[#1e1f29] flex justify-between items-center px-4 border-b border-[#191a21]">
              <div className="bg-[#44475a] text-[#f8f8f2] text-xs font-bold px-3 py-1 rounded-md">
                {currentLevel?.title.replace(/\s+/g, '_')}.java
              </div>
              <button 
                onClick={handleRunCode} 
                className="bg-[#50fa7b] hover:bg-[#42d668] text-[#282a36] text-xs font-extrabold px-4 py-1.5 rounded-md transition-all transform active:scale-95"
              >
                ▶ EJECUTAR
              </button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative">
              <CodeEditor value={code} onChange={setCode} />
              {result?.success && (
                <div className="absolute top-4 right-4 w-32 h-24 pointer-events-none animate-in zoom-in duration-300">
                   <GameCanvas levelId={currentLevel?.id || 0} result={result} />
                </div>
              )}
            </div>

            {/* Console Area */}
            <div className="h-48 bg-[#1e1f29] border-t border-[#191a21] p-4 flex flex-col">
              <div className="text-[10px] font-bold text-[#6272a4] uppercase tracking-widest mb-2">Salida del Sistema</div>
              <div className={`flex-1 font-mono text-sm overflow-y-auto custom-scrollbar ${
                result?.success ? 'text-[#50fa7b]' : result ? 'text-[#ff5555]' : 'text-[#6272a4]'
              }`}>
                {result ? (
                  <pre className="whitespace-pre-wrap">{result.output || result.message}</pre>
                ) : (
                  <span className="italic opacity-50">Presiona Ejecutar para ver el resultado...</span>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
