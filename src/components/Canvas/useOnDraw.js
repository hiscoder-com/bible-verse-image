import { useEffect, useRef } from 'react';

export function useOnDraw(height, width) {
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
      canvasRef.current.height = height;
      canvasRef.current.width = width;
      contextRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  return {
    canvasRef,
    contextRef,
    setCanvasRef,
  };
}
