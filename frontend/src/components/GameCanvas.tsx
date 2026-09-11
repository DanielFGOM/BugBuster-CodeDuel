import { useEffect, useRef } from 'react';

interface Props {
  levelId: number;
  result: { success: boolean } | null;
}

export default function GameCanvas({ levelId, result }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujo simple de recompensa
    ctx.fillStyle = '#50fa7b';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('✅ BUG FIX!', 40, 75);
    
    ctx.fillStyle = '#f8f8f2';
    ctx.fillRect(20, 85, 160, 5);
    ctx.fillStyle = '#50fa7b';
    ctx.fillRect(20, 85, 160, 5); // Animación simplificada
  }, [levelId, result]);

  return <canvas ref={canvasRef} width={200} height={120} className="rounded-lg bg-black/50 border border-white/10" />;
}
