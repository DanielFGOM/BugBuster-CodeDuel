import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { gameService, Level, SubmitResult } from '../services/gameService';

export function useGameLogic() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      const data = await gameService.fetchLevels();
      setLevels(data);
      if (data.length > 0) {
        setCurrentLevel(data[0]);
        setCode(data[0].template);
      }
    } catch (error) {
      toast.error("Error al cargar misiones");
    }
  };

  const submitCode = async () => {
    if (!currentLevel) return;
    setResult(null);
    try {
      const res = await gameService.submitSolution(currentLevel.id, code);
      setResult(res);
      if (res.success) toast.success('¡Misión superada!');
      else toast.error('La salida no coincide');
    } catch (error: any) {
      toast.error(error.response?.data || "Error en el servidor");
    }
  };

  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    setCode(level.template);
    setResult(null);
  };

  return { levels, currentLevel, code, setCode, result, submitCode, selectLevel };
}
