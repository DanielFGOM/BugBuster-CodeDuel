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
    // Dibujar personaje (pixel art básico)
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(40, 40, 30, 30); // jugador
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(130, 40, 30, 30); // enemigo (bug)

    if (result) {
      ctx.font = '20px sans-serif';
      ctx.fillStyle = result.success ? 'lime' : 'red';
      ctx.fillText(result.success ? '💥 GOLPE!' : '😵 Fallo', 70, 100);
    }
  }, [levelId, result]);

  return <canvas ref={canvasRef} width={200} height={150} className="border border-gray-600 rounded bg-black" />;
}