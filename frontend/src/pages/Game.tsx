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
    });
  }, []);

  const submitCode = async () => {
    if (!currentLevel) return;
    try {
      const res = await api.post('/game/submit', { levelId: currentLevel.id, code });
      setResult(res.data);
    } catch (error) {
      alert('Error enviando código');
    }
  };

  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    setCode('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚔️ BugBuster</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">Salir</button>
      </header>

      <div className="flex flex-1">
        {/* Lista de niveles */}
        <div className="w-48 bg-gray-800 p-4">
          <h3 className="font-bold mb-2">Niveles</h3>
          {levels.map(level => (
            <div key={level.id} className="cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => selectLevel(level)}>
              {level.title}
            </div>
          ))}
        </div>

        {/* Área de juego */}
        <div className="flex-1 p-4 flex flex-col">
          {currentLevel && (
            <>
              <div className="bg-gray-800 p-4 rounded mb-4">
                <h2 className="text-2xl">{currentLevel.title}</h2>
                <p>{currentLevel.description}</p>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <CodeEditor value={code} onChange={setCode} />
                  <div className="mt-2 flex gap-2">
                    <button onClick={submitCode} className="bg-green-600 px-4 py-1 rounded">Enviar</button>
                    <button onClick={() => setCode(currentLevel.template.replace('//USER_CODE', ''))} className="bg-gray-600 px-4 py-1 rounded">Restaurar base</button>
                  </div>
                  {result && (
                    <div className={`mt-2 p-2 rounded ${result.success ? 'bg-green-700' : 'bg-red-700'}`}>
                      <p>{result.message}</p>
                      {result.output && <pre className="text-sm">{result.output}</pre>}
                    </div>
                  )}
                </div>
                <div>
                  <GameCanvas levelId={currentLevel.id} result={result} />
                </div>
              </div>

              <div className="mt-4">
                <AgentChat levelId={currentLevel.id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}