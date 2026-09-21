import { useAuth } from '../hooks/useAuth';
import { useGameLogic } from '../hooks/useGameLogic';
import CodeEditor from '../components/CodeEditor';
import GameCanvas from '../components/GameCanvas';

export default function Game() {
  const { logout } = useAuth();
  const { levels, currentLevel, code, setCode, result, submitCode, selectLevel, completedLevels, resetCode } = useGameLogic();

  const getExampleForLevel = (id: number) => {
    const examples: Record<number, string> = {
      1: 'System.out.println("Bienvenido a Java");',
      2: 'int edad = 20;\nSystem.out.println(edad);',
      3: 'String ciudad = "Madrid";\nSystem.out.println(ciudad);',
      4: 'double pi = 3.14;\nSystem.out.println(pi);',
      5: 'int res = 10 * 2;\nSystem.out.println(res);',
      6: 'String saludo = "Hola " + "Mundo";\nSystem.out.println(saludo);',
      7: 'boolean esDia = true;\nSystem.out.println(esDia);',
      8: 'final int MAX = 100;\nSystem.out.println(MAX);',
      9: 'double d = 5.5;\nint i = (int)d;\nSystem.out.println(i);',
      10: 'int resto = 10 % 3;\nSystem.out.println(resto);',
    };
    return examples[id] || '// Ejemplo: System.out.println("Tu código aquí");';
  };

  const categories = [
    { name: "Sintaxis Básica", range: [1, 12] },
    { name: "Flujo de Control", range: [13, 25] },
    { name: "Estructuras de Datos", range: [26, 35] },
    { name: "OOP y Clases", range: [36, 50] },
  ];

  return (
    <div className="h-screen bg-[#f9fafa] text-[#20303c] flex flex-col font-sans overflow-hidden">
      <header className="h-14 bg-white border-b border-[#E3E7E9] px-6 flex justify-between items-center shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F2A65A] flex items-center justify-center font-mono font-bold text-[#1B2A41] text-sm">&lt;/&gt;</div>
          <h1 className="text-lg font-extrabold text-[#1B2A41] font-['Space_Grotesk']">BugBuster</h1>
        </div>
        <button onClick={logout} className="text-xs font-bold uppercase tracking-wider bg-[#EEF3F6] hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-lg transition-all text-[#5b6b76]">Salir</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-white border-r border-[#E3E7E9] p-4 flex flex-col">
          <div className="text-[11px] font-bold text-[#5b6b76] uppercase tracking-widest px-3 mb-4">Mapa de Misiones</div>
          <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
            {categories.map(cat => (
              <div key={cat.name} className="space-y-2">
                <h3 className="text-xs font-bold text-[#1B2A41] px-3 mb-2 opacity-60">{cat.name}</h3>
                <div className="space-y-1">
                  {levels
                    .filter(l => l.id >= cat.range[0] && l.id <= cat.range[1])
                    .map((level) => {
                      const isCompleted = completedLevels.includes(level.id);
                      const isLocked = level.id > 1 && !completedLevels.includes(level.id - 1);
                      const isActive = currentLevel?.id === level.id;

                      return (
                        <div 
                          key={level.id} 
                          onClick={() => !isLocked && selectLevel(level)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            isActive ? 'bg-[#FFF3E7] text-[#1B2A41] border-l-4 border-[#F2A65A]' : 
                            isLocked ? 'opacity-50 cursor-not-allowed text-gray-400 border-l-4 border-transparent' : 
                            'hover:bg-[#F3F6F7] text-[#5b6b76] border-l-4 border-transparent'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive ? 'bg-[#F2A65A] text-white' : isCompleted ? 'bg-green-500 text-white' : isLocked ? 'bg-gray-300 text-gray-600' : 'bg-[#E9EDEF] text-[#5b6b76]'
                          }`}>
                            {isLocked ? '🔒' : level.id}
                          </div>
                          <span className="text-sm font-semibold">{level.title}</span>
                          {isCompleted && <span className="ml-auto text-green-500 text-xs">✓</span>}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex overflow-hidden">
          <div className="w-[420px] p-7 border-r border-[#E3E7E9] overflow-y-auto bg-white">
            {currentLevel ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <p className="text-xs text-[#5b6b76] mb-1">Misión actual</p>
                <h1 className="text-2xl font-extrabold text-[#1B2A41] mb-6">{currentLevel.title}</h1>
                <div className="border border-[#E3E7E9] rounded-2xl p-6 space-y-6 bg-gray-50/50 shadow-sm">
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1">1</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Concepto</div>
                      <p className="text-sm text-[#5b6b76] leading-relaxed text-justify">{currentLevel.hint}</p>
                    </div>
                  </div>
                  <div className="h-px bg-[#E3E7E9] ml-6"></div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1">2</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Tu tarea</div>
                      <p className="text-sm text-[#1B2A41] font-medium leading-relaxed">{currentLevel.description}</p>
                    </div>
                  </div>
                  <div className="h-px bg-[#E3E7E9] ml-6"></div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1B2A41] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1">3</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold uppercase text-[#E38F3D] mb-1 tracking-wider">Ejemplo</div>
                      <div className="bg-[#20303c] text-[#7FE0A8] font-mono text-xs p-4 rounded-xl mt-2 shadow-inner whitespace-pre-wrap leading-relaxed">
                        {getExampleForLevel(currentLevel.id)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[#5b6b76] italic text-sm">Selecciona una misión...</div>
            )}
          </div>

          <div className="flex-1 flex flex-col bg-[#282a36]">
            <div className="h-12 bg-[#1e1f29] flex justify-between items-center px-4 border-b border-[#191a21]">
              <div className="flex items-center gap-3">
                <div className="bg-[#44475a] text-[#f8f8f2] text-xs font-bold px-3 py-1 rounded-md">Main.java</div>
                <button onClick={resetCode} className="text-[10px] text-gray-400 hover:text-white underline">Restablecer</button>
              </div>
              <button onClick={submitCode} className="bg-[#50fa7b] hover:bg-[#42d668] text-[#282a36] text-xs font-extrabold px-4 py-1.5 rounded-md transition-all transform active:scale-95 shadow-lg">EJECUTAR</button>
            </div>
            <div className="flex-1 relative">
              <CodeEditor value={code} onChange={setCode} />
              {result?.success && (
                <div className="absolute top-4 right-4 w-32 h-24 pointer-events-none animate-in zoom-in duration-300">
                   <GameCanvas levelId={currentLevel?.id || 0} result={result} />
                </div>
              )}
            </div>
            <div className="h-48 bg-[#1e1f29] border-t border-[#191a21] p-4 flex flex-col">
              <div className="text-[10px] font-bold text-[#6272a4] uppercase tracking-widest mb-2">Salida del Sistema</div>
              <div className={`flex-1 font-mono text-sm overflow-y-auto custom-scrollbar ${result?.success ? 'text-[#50fa7b]' : result ? 'text-[#ff5555]' : 'text-[#6272a4]'}`}>
                {result ? (
                  <pre className="whitespace-pre-wrap">{result.output || result.message}</pre>
                ) : (
                  <span className="italic opacity-50">Escribe tu código y presiona Ejecutar para ver el resultado...</span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
