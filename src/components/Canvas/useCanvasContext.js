import { useEffect, useRef } from 'react';

export function useCanvasContext(height = 1200, width = 1200) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  function setCanvasRef(ref) {
    if (ref && !canvasRef.current) {
      canvasRef.current = ref;
      canvasRef.current.height = height;
      canvasRef.current.width = width;
      contextRef.current = ref.getContext('2d');
    }
  }

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.height = height;
      canvasRef.current.width = width;
    }
  }, [height, width]);

  return {
    contextRef,
    setCanvasRef,
  };
}
