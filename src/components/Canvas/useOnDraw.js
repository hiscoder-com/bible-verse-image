import { useEffect, useRef } from 'react';

export function useOnDraw() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  function setCanvasRef(ref) {
    canvasRef.current = ref;
    if (ref) {
      contextRef.current = ref.getContext('2d');
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = 1200;
      canvasRef.current.width = 1200;
      contextRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  return {
    canvasRef,
    contextRef,
    setCanvasRef,
  };
}
