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

  useEffect(() => {
    if (!currentLevel) return;
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`bugbuster_code_${currentLevel.id}`, code);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [code, currentLevel]);

  const resetCode = () => {
    if (!currentLevel) return;
    if (confirm("¿Estás seguro de que quieres borrar tu progreso en este nivel?")) {
      const initialCode = currentLevel.template.replace('//USER_CODE', '// Aquí escribe tu código');
      setCode(initialCode);
      localStorage.removeItem(`bugbuster_code_${currentLevel.id}`);
    }
  };

  const selectLevel = (level: Level) => {
    if (!DEV_UNLOCK_ALL) {
      const prevLevelId = level.id - 1;
      if (prevLevelId > 0 && !completedLevels.includes(prevLevelId)) {
        toast.error(`Completa primero el nivel ${prevLevelId}`);
        return;
      }
    }
    
    setCurrentLevel(level);
    setResult(null);
    const saved = localStorage.getItem(`bugbuster_code_${level.id}`);
    setCode(saved || level.template.replace('//USER_CODE', '// Aquí escribe tu código'));
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
        }
      } else {
        toast.error(res.message || 'La salida no coincide');
      }
    } catch (error: any) {
      toast.error("Error en el servidor");
    }
  };

  return {
    levels, currentLevel, code, setCode, result, submitCode, selectLevel, completedLevels, resetCode
  };
}
