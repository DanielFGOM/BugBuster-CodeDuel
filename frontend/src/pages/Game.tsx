import { useAuth } from '../hooks/useAuth';
import type { Level } from '../services/gameService';
import { useGameLogic } from '../hooks/useGameLogic';
import CodeEditor from '../components/CodeEditor';
import GameCanvas from '../components/GameCanvas';
import AgentChat from '../components/AgentChat';

export default function Game() {
  const { logout } = useAuth();
  const {
    levels,
    currentLevel,
    code,
    setCode,
    result,
    submitCode,
    selectLevel,
    completedLevels,
    isLevelUnlocked,
    resetCode,
    isSubmitting
  } = useGameLogic();

  const getLevelOrder = (level: { id: number; orderNumber?: number }) => level.orderNumber ?? level.id;

  const getFileName = (title: string) => {
    const fileName = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');

    return `${fileName || 'Main'}.java`;
  };

  const getExampleForLevel = (id: number) => {
    const examples: Record<number, string> = {
      1: 'System.out.println("Hola Mundo");',
      2: 'int edad = 25;\nSystem.out.println(edad);',
      3: 'String nombre = "Juan";\nSystem.out.println(nombre);',
      4: 'int a = 10;\nint b = 5;\nSystem.out.println(a + b);',
      5: 'int numero = 8;\nif (numero > 5) {\n    System.out.println("Mayor");\n} else {\n    System.out.println("Menor");\n}',
      6: 'int numero = 7;\nif (numero % 2 == 0) {\n    System.out.println("Par");\n} else {\n    System.out.println("Impar");\n}',
      7: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
      8: 'int i = 1;\nwhile (i <= 3) {\n    System.out.println(i);\n    i++;\n}',
      9: 'static void saludar() {\n    System.out.println("Hola Mundo");\n}\n\n// Dentro de main:\nsaludar();',
      10: 'int[] numeros = {10, 20, 30};\nSystem.out.println(numeros[0]);',
      11: 'double precio = 19.99;\nSystem.out.println(precio);',
      12: 'char inicial = \'B\';\nSystem.out.println(inicial);',
      13: 'boolean activo = true;\nSystem.out.println(activo);',
      14: 'int a = 20;\nint b = 6;\nSystem.out.println(a - b);',
      15: 'int contador = 4;\ncontador++;\nSystem.out.println(contador);',
      16: 'int numero = 10;\nif (numero > 5) {\n    System.out.println("Mayor");\n}',
      17: 'int numero = 3;\nif (numero > 5) {\n    System.out.println("Mayor");\n} else {\n    System.out.println("Menor");\n}',
      18: 'int numero = 2;\nif (numero == 1) {\n    System.out.println("Uno");\n} else if (numero == 2) {\n    System.out.println("Dos");\n} else {\n    System.out.println("Otro");\n}',
      19: 'int dia = 1;\nswitch (dia) {\n    case 1:\n        System.out.println("Lunes");\n        break;\n}',
      20: 'int suma = 0;\nfor (int i = 1; i <= 5; i++) {\n    suma += i;\n}\nSystem.out.println(suma);',
      21: 'int i = 3;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}',
      22: 'int i = 0;\ndo {\n    System.out.println("Hola");\n    i++;\n} while (i < 1);',
      23: 'for (int i = 1; i <= 5; i++) {\n    if (i == 4) break;\n    System.out.println(i);\n}',
      24: 'for (int i = 1; i <= 4; i++) {\n    if (i == 2) continue;\n    System.out.println(i);\n}',
      25: 'for (int fila = 1; fila <= 2; fila++) {\n    for (int columna = 1; columna <= 1; columna++) {\n        System.out.println("1-1");\n    }\n}',
      26: 'int edad = 20;\nboolean tieneID = true;\nif (edad >= 18 && tieneID) {\n    System.out.println("Acceso concedido");\n}',
      27: 'int codigo = 0;\nboolean activo = true;\nif (codigo == 0 || activo) {\n    System.out.println("Disponible");\n}',
      28: 'boolean conectado = false;\nif (!conectado) {\n    System.out.println("Sin conexión");\n}',
      29: 'int numero = 4;\nString resultado = numero % 2 == 0 ? "Par" : "Impar";\nSystem.out.println(resultado);',
      30: 'int[] numeros = {5, 10, 15};\nint suma = 0;\nfor (int numero : numeros) {\n    suma += numero;\n}\nSystem.out.println(suma);',
      31: 'int[] numeros = {2, 4, 6};\nfor (int numero : numeros) {\n    System.out.println(numero);\n}',
      32: 'int[] numeros = {3, 9, 5, 7};\nint mayor = numeros[0];\nfor (int numero : numeros) {\n    if (numero > mayor) mayor = numero;\n}\nSystem.out.println(mayor);',
      33: 'String texto = "BugBuster";\nSystem.out.println(texto.length());',
      34: 'String texto = "java";\nSystem.out.println(texto.toUpperCase());',
      35: 'import java.util.ArrayList;\n\nArrayList<String> lenguajes = new ArrayList<>();\nlenguajes.add("Java");\nlenguajes.add("Python");\nSystem.out.println(lenguajes.get(1));',
      36: 'import java.util.ArrayList;\n\nArrayList<String> lista = new ArrayList<>();\nlista.add("A");\nlista.add("B");\nlista.add("C");\nlista.remove("A");\nSystem.out.println(lista);',
      37: 'import java.util.HashMap;\n\nHashMap<String, String> mapa = new HashMap<>();\nmapa.put("Java", "Genial");\nSystem.out.println(mapa.get("Java"));',
      38: 'class Persona {\n    String nombre;\n}\n\n// En main:\nPersona persona = new Persona();\npersona.nombre = "Juan";\nSystem.out.println(persona.nombre);',
      39: 'class Coche {\n    String marca;\n}\n\n// En main:\nCoche coche = new Coche();\ncoche.marca = "Toyota";\nSystem.out.println(coche.marca);',
      40: 'class Usuario {\n    String nombre;\n\n    Usuario(String nombre) {\n        this.nombre = nombre;\n    }\n}\n\n// En main:\nUsuario usuario = new Usuario("Admin");\nSystem.out.println(usuario.nombre);',
      41: 'class Calculadora {\n    int sumar(int a, int b) {\n        return a + b;\n    }\n}\n\n// En main:\nCalculadora calc = new Calculadora();\nSystem.out.println(calc.sumar(4, 6));',
      42: 'class Jugador {\n    static int contador = 0;\n\n    Jugador() {\n        contador++;\n    }\n}\n\n// En main:\nnew Jugador();\nnew Jugador();\nSystem.out.println(Jugador.contador);',
      43: 'class Jugador {\n    private int edad;\n\n    public void setEdad(int edad) {\n        this.edad = edad;\n    }\n\n    public int getEdad() {\n        return edad;\n    }\n}\n\n// En main:\nJugador jugador = new Jugador();\njugador.setEdad(20);\nSystem.out.println(jugador.getEdad());',
      44: 'class Animal {\n    void comer() {\n        System.out.println("Come");\n    }\n}\n\nclass Perro extends Animal {}\n\n// En main:\nPerro perro = new Perro();\nperro.comer();',
      45: 'class Animal {\n    void hacerSonido() {\n        System.out.println("Sonido");\n    }\n}\n\nclass Perro extends Animal {\n    @Override\n    void hacerSonido() {\n        System.out.println("Guau");\n    }\n}\n\n// En main:\nnew Perro().hacerSonido();',
      46: 'interface Volable {\n    void volar();\n}\n\nclass Avion implements Volable {\n    public void volar() {\n        System.out.println("Volando");\n    }\n}\n\n// En main:\nnew Avion().volar();',
      47: 'class Animal {\n    void hacerSonido() {\n        System.out.println("Animal");\n    }\n}\n\nclass Perro extends Animal {\n    @Override\n    void hacerSonido() {\n        System.out.println("Guau");\n    }\n}\n\nclass Gato extends Animal {\n    @Override\n    void hacerSonido() {\n        System.out.println("Miau");\n    }\n}\n\n// En main:\nAnimal a = new Perro();\na.hacerSonido();\na = new Gato();\na.hacerSonido();',
      48: 'abstract class Forma {\n    abstract void dibujar();\n}\n\nclass Circulo extends Forma {\n    @Override\n    void dibujar() {\n        System.out.println("Circulo");\n    }\n}\n\n// En main:\nnew Circulo().dibujar();',
      49: 'try {\n    int resultado = 10 / 0;\n    System.out.println(resultado);\n} catch (ArithmeticException e) {\n    System.out.println("Error");\n}',
      50: 'class Calculadora {\n    static int sumar(int a, int b) {\n        return a + b;\n    }\n}\n\n// En main:\nSystem.out.println(Calculadora.sumar(40, 60));'
    };

    return examples[id] || '// Ejemplo de Java para este nivel';
  };

  const categories = [
    { name: 'Sintaxis Básica', range: [1, 12] },
    { name: 'Flujo de Control', range: [13, 25] },
    { name: 'Estructuras de Datos', range: [26, 35] },
    { name: 'OOP y Clases', range: [36, 50] }
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
                    .filter(level => {
                      const order = getLevelOrder(level as Level & { orderNumber?: number });
                      return order >= cat.range[0] && order <= cat.range[1];
                    })
                    .map(level => {
                      const order = getLevelOrder(level as Level & { orderNumber?: number });
                      const isDone = completedLevels.includes(order);
                      const isLocked = !isLevelUnlocked(level.id);
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
                            isActive ? 'bg-[#F2A65A] text-white' : isDone ? 'bg-green-500 text-white' : isLocked ? 'bg-gray-300 text-gray-600' : 'bg-[#E9EDEF] text-[#5b6b76]'
                          }`}>
                            {isLocked ? '🔒' : order}
                          </div>
                          <span className="text-sm font-semibold">{level.title}</span>
                          {isDone && <span className="ml-auto text-green-500 text-xs">✓</span>}
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
                <p className="text-xs text-[#5b6b76] mb-1">Misión {getLevelOrder(currentLevel)} de 50</p>
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
                        {getExampleForLevel(getLevelOrder(currentLevel))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[#5b6b76] italic text-sm">Selecciona una misión...</div>
            )}
          </div>

          <div className="flex-1 flex flex-col bg-[#282a36] min-w-0">
            <div className="h-12 bg-[#1e1f29] flex justify-between items-center px-4 border-b border-[#191a21] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-[#44475a] text-[#f8f8f2] text-xs font-bold px-3 py-1 rounded-md truncate max-w-[240px]">
                  {currentLevel ? getFileName(currentLevel.title) : 'Main.java'}
                </div>
                <button onClick={resetCode} disabled={!currentLevel || isSubmitting} className="text-[10px] text-gray-400 hover:text-white underline disabled:opacity-40">Restablecer</button>
              </div>
              <button onClick={submitCode} disabled={!currentLevel || isSubmitting} className="bg-[#50fa7b] hover:bg-[#42d668] disabled:opacity-50 disabled:cursor-wait text-[#282a36] text-xs font-extrabold px-4 py-1.5 rounded-md transition-all transform active:scale-95 shadow-lg">
                {isSubmitting ? 'EJECUTANDO...' : 'EJECUTAR'}
              </button>
            </div>

            <div className="flex-1 min-h-0 relative">
              <CodeEditor value={code} onChange={setCode} />
              {result?.success && (
                <div className="absolute top-4 right-4 w-32 h-24 pointer-events-none animate-in zoom-in duration-300">
                  <GameCanvas levelId={currentLevel?.id || 0} result={result} />
                </div>
              )}
            </div>

            <div className="h-44 bg-[#1e1f29] border-t border-[#191a21] p-4 flex flex-col shrink-0">
              <div className="text-[10px] font-bold text-[#6272a4] uppercase tracking-widest mb-2">Salida del Sistema</div>
              <div className={`flex-1 font-mono text-sm overflow-y-auto custom-scrollbar ${result?.success ? 'text-[#50fa7b]' : result ? 'text-[#ff5555]' : 'text-[#6272a4]'}`}>
                {result ? (
                  <pre className="whitespace-pre-wrap">{result.output || result.message}</pre>
                ) : (
                  <span className="italic opacity-50">Escribe tu código y presiona Ejecutar para ver el resultado...</span>
                )}
              </div>
            </div>

            <div className="h-60 border-t border-[#E3E7E9] bg-white shrink-0 overflow-hidden">
              {currentLevel ? <AgentChat key={currentLevel.id} levelId={currentLevel.id} /> : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
