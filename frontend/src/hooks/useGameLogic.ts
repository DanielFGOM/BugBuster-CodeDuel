import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { gameService, Level, SubmitResult } from '../services/gameService';

const DEV_UNLOCK_ALL = false;

type OrderedLevel = Level & { orderNumber?: number };

export function useGameLogic() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    loadGameData();

    return () => {
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const getLevelOrder = (level: Level) => {
    return (level as OrderedLevel).orderNumber ?? level.id;
  };

  const toPascalCase = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const getInitialCode = (level: Level) => {
    const className = toPascalCase(level.title) || `Nivel${getLevelOrder(level)}`;
    return `public class ${className} {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}`;
  };

  const loadGameData = async () => {
    try {
      const data = await gameService.fetchLevels();
      const orderedData = [...data]
        .filter(level => getLevelOrder(level) >= 1 && getLevelOrder(level) <= 50)
        .sort((a, b) => getLevelOrder(a) - getLevelOrder(b));

      setLevels(orderedData);

      const savedProgress = localStorage.getItem('bugbuster_progress');
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          if (Array.isArray(parsed)) {
            setCompletedLevels(parsed.filter(value => Number.isInteger(value)));
          }
        } catch {
          localStorage.removeItem('bugbuster_progress');
        }
      }

      if (orderedData.length > 0) {
        selectLevel(orderedData[0], true);
      }
    } catch {
      toast.error('Error al cargar los niveles');
    }
  };

  const isLevelUnlocked = (levelId: number) => {
    const level = levels.find(item => item.id === levelId);
    const order = level ? getLevelOrder(level) : levelId;

    if (DEV_UNLOCK_ALL || order <= 5) return true;

    const groupIndex = Math.floor((order - 1) / 5);
    const requiredUntil = groupIndex * 5;
    for (let i = 1; i <= requiredUntil; i++) {
      if (!completedLevels.includes(i)) return false;
    }
    return true;
  };

  const selectLevel = (level: Level, bypassLock = false) => {
    if (!bypassLock && !DEV_UNLOCK_ALL && !isLevelUnlocked(level.id)) {
      toast.error('Este nivel está bloqueado. ¡Completa los niveles anteriores primero!');
      return;
    }

    setCurrentLevel(level);
    setResult(null);

    const savedCode = localStorage.getItem(`bugbuster_code_${level.id}`);
    setCode(savedCode || getInitialCode(level));
  };

  const advanceToNextLevel = (completedLevel: Level, nextCompleted: number[]) => {
    const currentOrder = getLevelOrder(completedLevel);
    const nextLevel = levels.find(level => getLevelOrder(level) === currentOrder + 1);

    if (!nextLevel) {
      toast.success('🏆 ¡Has completado los 50 niveles de BugBuster!');
      return;
    }

    const nextOrder = getLevelOrder(nextLevel);
    const nextUnlocked = nextOrder <= 5 || nextCompleted.includes(currentOrder) || nextCompleted.length >= currentOrder;

    if (!nextUnlocked) {
      return;
    }

    advanceTimerRef.current = window.setTimeout(() => {
      const savedCode = localStorage.getItem(`bugbuster_code_${nextLevel.id}`);
      setCurrentLevel(nextLevel);
      setCode(savedCode || getInitialCode(nextLevel));
      setResult(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const submitCode = async () => {
    if (!currentLevel || isSubmitting) return;

    setResult(null);
    setIsSubmitting(true);

    try {
      const res = await gameService.submitSolution(currentLevel.id, code);
      setResult(res);

      if (res.success) {
        toast.success('¡Misión superada!');

        const currentOrder = getLevelOrder(currentLevel);
        const newProgress = completedLevels.includes(currentOrder)
          ? completedLevels
          : [...completedLevels, currentOrder].sort((a, b) => a - b);

        if (!completedLevels.includes(currentOrder)) {
          setCompletedLevels(newProgress);
          localStorage.setItem('bugbuster_progress', JSON.stringify(newProgress));
        }

        if (currentOrder % 5 === 0 && currentOrder < 50) {
          toast.success('🎉 ¡Nuevo grupo de misiones desbloqueado!');
        }

        if (currentOrder < 50) {
          toast('➡️ Preparando la siguiente misión...', {
            icon: '⚡',
            duration: 800
          });
          advanceToNextLevel(currentLevel, newProgress);
        }
      } else {
        toast.error(res.message || 'La salida no coincide');
      }
    } catch (error: any) {
      const message = error?.response?.data;
      toast.error(typeof message === 'string' ? message : 'Error en el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentLevel) {
      localStorage.setItem(`bugbuster_code_${currentLevel.id}`, code);
    }
  }, [code, currentLevel]);

  const resetCode = () => {
    if (!currentLevel) return;
    const initialCode = getInitialCode(currentLevel);
    setCode(initialCode);
    localStorage.removeItem(`bugbuster_code_${currentLevel.id}`);
  };

  return {
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
  };
}
