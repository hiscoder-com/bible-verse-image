import { useEffect, useRef } from 'react';

export function useCanvasContext(height, width) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  function setCanvasRef(ref) {
    canvasRef.current = ref;
    canvasRef.current.height = height;
    canvasRef.current.width = width;
    contextRef.current = ref.getContext('2d');
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = height;
      canvasRef.current.width = width;
    }
  }, [height, width]);

  return {
    contextRef,
    setCanvasRef,
  };
}
