import { useEffect, useState } from 'react';
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
    }).catch(() => alert("Error loading levels"));
  }, []);

  const submitCode = async () => {
    if (!currentLevel) return;
    try {
      const res = await api.post('/game/submit', { levelId: currentLevel.id, code });
      setResult(res.data);
    } catch (error) {
      setResult({ success: false, message: "Submission error. Check connection." });
    }
  };

  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    setCode('');
    setResult(null);
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col font-sans overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg rotate-45 shadow-[0_0_10px_#22d3ee]"></div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase">
            Bug<span className="text-cyan-400">Buster</span> <span className="text-xs font-normal text-slate-500 ml-2">v1.0.4-stable</span>
          </h1>
        </div>
        <button onClick={logout} className="text-xs font-bold uppercase tracking-widest bg-slate-800 hover:bg-red-900/40 hover:text-red-400 px-4 py-2 rounded-md border border-slate-700 transition-all">
          Disconnect Session
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Level Sidebar */}
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mission Log</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {levels.map(level => (
              <div 
                key={level.id} 
                onClick={() => selectLevel(level)}
                className={`group cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                  currentLevel?.id === level.id 
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' 
                  : 'bg-slate-800/40 border-transparent hover:border-slate-600 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono opacity-50">0{level.id}</span>
                  <span className="text-sm font-semibold">{level.title}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main War Room */}
        <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden relative">
          {currentLevel ? (
            <>
              {/* Mission Card */}
              <div className="bg-slate-900 border-l-4 border-cyan-500 p-5 rounded-r-xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">Mission:</span> {currentLevel.title}
                </h2>
                <p className="text-slate-400 leading-relaxed max-w-3xl">{currentLevel.description}</p>
              </div>

              {/* Workspace Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Editor Section */}
                <div className="flex flex-col gap-4 min-h-0">
                  <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
                    <CodeEditor value={code} onChange={setCode} />
                  </div>
                  
                  <div className="flex gap-3 shrink-0">
                    <button onClick={submitCode} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)] uppercase tracking-wider">
                      Execute Code
                    </button>
                    <button 
                      onClick={() => setCode(currentLevel.template.replace('//USER_CODE', ''))} 
                      className="px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all shrink-0"
                    >
                      Reset
                    </button>
                  </div>

                  {result && (
                    <div className={`p-4 rounded-xl border animate-in zoom-in-95 duration-300 ${
                      result.success 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500 text-red-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-1 font-bold uppercase text-xs">
                        {result.success ? '✅ Success' : '❌ System Error'}
                      </div>
                      <p className="text-sm">{result.message}</p>
                      {result.output && <pre className="mt-2 text-xs font-mono bg-black/40 p-2 rounded border border-white/10">{result.output}</pre>}
                    </div>
                  )}
                </div>

                {/* Visualizer Section */}
                <div className="flex flex-col gap-6 min-h-0">
                  <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></div>
                    </div>
                    <GameCanvas levelId={currentLevel.id} result={result} />
                  </div>
                  
                  <div className="h-1/3 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                    <AgentChat levelId={currentLevel.id} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 animate-pulse">
              Loading secure terminal...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
