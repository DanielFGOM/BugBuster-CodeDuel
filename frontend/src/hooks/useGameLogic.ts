import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { gameService, Level, SubmitResult } from '../services/gameService';

const DEV_UNLOCK_ALL = false; 

export function useGameLogic() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    loadGameData();
  }, []);

  const toPascalCase = (text: string) => {
    return text
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const loadGameData = async () => {
    try {
      const data = await gameService.fetchLevels();
      setLevels(data);
      const savedProgress = localStorage.getItem('bugbuster_progress');
      if (savedProgress) setCompletedLevels(JSON.parse(savedProgress));
      if (data.length > 0) {
        selectLevel(data[0]);
      }
    } catch (error) {
      toast.error("Error al cargar datos");
    }
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId <= 5) return true;
    // Un nivel está desbloqueado si todos los niveles del grupo anterior están completados.
    // Grupo 1: 1-5, Grupo 2: 6-10, etc.
    const groupIndex = Math.floor((levelId - 1) / 5);
    const requiredUntil = groupIndex * 5;
    for (let i = 1; i <= requiredUntil; i++) {
      if (!completedLevels.includes(i)) return false;
    }
    return true;
  };

  const selectLevel = (level: Level) => {
    if (!DEV_UNLOCK_ALL && !isLevelUnlocked(level.id)) {
      toast.error("Este nivel está bloqueado. ¡Completa los grupos anteriores primero!");
      return;
    }
    
    setCurrentLevel(level);
    setResult(null);

    const className = toPascalCase(level.title);
    const initialCode = `public class ${className} {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}`;
    
    const savedCode = localStorage.getItem(`bugbuster_code_${level.id}`);
    setCode(savedCode || initialCode);
  };

  const submitCode = async () => {
    if (!currentLevel) return;
    setResult(null);
    try {
      const res = await gameService.submitSolution(currentLevel.id, code);
      setResult(res);
      if (res.success) {
        toast.success('¡Misión superada!');
        if (!completedLevels.includes(currentLevel.id)) {
          const newProgress = [...completedLevels, currentLevel.id];
          setCompletedLevels(newProgress);
          localStorage.setItem('bugbuster_progress', JSON.stringify(newProgress));
          if (currentLevel.id % 5 === 0) {
            toast.success("🎉 ¡Felicidades! Has desbloqueado un nuevo grupo de misiones.");
          }
        }
      } else {
        toast.error(res.message || 'La salida no coincide');
      }
    } catch (error: any) {
      toast.error("Error en el servidor");
    }
  };

  useEffect(() => {
    if (currentLevel) {
      localStorage.setItem(`bugbuster_code_${currentLevel.id}`, code);
    }
  }, [code, currentLevel]);

  const resetCode = () => {
    if (!currentLevel) return;
    const className = toPascalCase(currentLevel.title);
    const initialCode = `public class ${className} {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}`;
    setCode(initialCode);
    localStorage.removeItem(`bugbuster_code_${currentLevel.id}`);
  };

  return {
    levels, currentLevel, code, setCode, result, submitCode, selectLevel, completedLevels, isLevelUnlocked, resetCode
  };
}
