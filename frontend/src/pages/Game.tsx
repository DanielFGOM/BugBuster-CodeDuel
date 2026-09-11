import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CodeEditor from '../components/CodeEditor';
import AgentChat from '../components/AgentChat';
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
    api.get('/game/levels').then(res => {
      setLevels(res.data);
      if (res.data.length) setCurrentLevel(res.data[0]);
    }).catch(() => toast.error("Error al conectar con el servidor"));
  }, []);

  const submitCode = async () => {
    if (!currentLevel) return;
    try {
      const res = await api.post('/game/submit', { levelId: currentLevel.id, code });
      setResult(res.data);
      if (res.data.success) toast.success('¡Código correcto! Bug eliminado.');
      else toast.error('El código no es correcto.');
    } catch (error) {
      toast.error('Error al enviar el código.');
    }
  };

  return (
    <div className="h-screen bg-[#F3F1EC] text-[#1E2233] flex flex-col font-['Inter'] overflow-hidden">
      <header className="h-16 bg-white border-b border-[#E7E4DC] flex justify-between items-center px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F0973D] flex items-center justify-center font-['IBM_Plex_Mono'] font-bold text-[#17233B] text-sm">&lt;/&gt;</div>
          <h1 className="text-xl font-bold text-[#2E4A78] font-['Space_Grotesk']">BugBuster <span className="text-xs font-normal text-slate-400 ml-2 uppercase tracking-widest">Agent Terminal</span></h1>
        </div>
        <button onClick={logout} className="text-xs font-bold uppercase tracking-widest bg-[#E7E4DC] hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-lg transition-all text-[#8A8A94]">Cerrar Sesión</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-[#2E4A78] text-white flex flex-col shadow-xl">
          <div className="p-6 border-b border-white/10 bg-[#1E304F]">
            <h3 className="text-xs font-bold text-[#F5CFA3] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F0973D] rounded-full animate-pulse"></span> Mission Log
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {levels.map(level => (
              <div 
                key={level.id} 
                onClick={() => { setCurrentLevel(level); setCode(''); setResult(null); }}
                className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 ${currentLevel?.id === level.id ? 'bg-[#F0973D] border-[#F0973D] text-[#17233B] shadow-lg scale-105' : 'bg-white/10 border-white/10 hover:bg-white/20 text-white/80'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-['IBM_Plex_Mono'] opacity-60">0{level.id}</span>
                  <span className="text-sm font-semibold">{level.title}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col p-8 gap-6 overflow-hidden">
          {currentLevel ? (
            <>
              <div className="bg-white border border-[#E7E4DC] p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-2 h-full bg-[#F0973D]"></div>
                <h2 className="text-2xl font-bold text-[#2E4A78] mb-2 font-['Space_Grotesk']">Misión: {currentLevel.title}</h2>
                <p className="text-[#8A8A94] leading-relaxed max-w-3xl text-sm">{currentLevel.description}</p>
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                <div className="flex flex-col gap-4 min-h-0">
                  <div className="flex-1 rounded-2xl overflow-hidden border border-[#E7E4DC] shadow-sm relative">
                    <CodeEditor value={code} onChange={setCode} />
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={submitCode} className="flex-1 bg-[#2E4A78] hover:bg-[#1E304F] text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-md uppercase tracking-wider font-['Space_Grotesk']">Ejecutar Código</button>
                    <button onClick={() => setCode(currentLevel.template.replace('//USER_CODE', ''))} className="px-6 bg-white hover:bg-gray-50 text-[#8A8A94] rounded-xl border border-[#E7E4DC] transition-all font-semibold">Reset</button>
                  </div>
                  {result && (
                    <div className={`p-4 rounded-xl border animate-in zoom-in-95 duration-300 ${result.success ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                      <div className="flex items-center gap-2 mb-1 font-bold uppercase text-xs">{result.success ? '✅ Éxito' : '❌ Error de Sistema'}</div>
                      <p className="text-sm">{result.message}</p>
                      {result.output && <pre className="mt-2 text-xs font-['IBM_Plex_Mono'] bg-white/50 p-2 rounded border border-black/5">{result.output}</pre>}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-6 min-h-0">
                  <div className="flex-1 bg-white rounded-2xl border border-[#E7E4DC] shadow-sm relative overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F0973D] animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-[#2E4A78] animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
                    </div>
                    <GameCanvas levelId={currentLevel.id} result={result} />
                  </div>
                  <div className="h-1/3 bg-white rounded-2xl border border-[#E7E4DC] shadow-sm overflow-hidden">
                    <AgentChat levelId={currentLevel.id} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#8A8A94] animate-pulse font-['IBM_Plex_Mono']">Cargando terminal...</div>
          )}
        </main>
      </div>
    </div>
  );
}
