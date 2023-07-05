import { useEffect, useRef } from 'react';

export function useOnDraw() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Размеры холста
      canvasRef.current.height = 1200;
      canvasRef.current.width = 1200;
    }
  }, []);

  return {
    canvasRef,
  };
}
