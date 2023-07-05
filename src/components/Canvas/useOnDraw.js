import { useEffect, useRef } from 'react';

export function useOnDraw(sizeImage) {
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
      canvasRef.current.height = sizeImage;
      canvasRef.current.width = sizeImage;
      contextRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  return {
    canvasRef,
    contextRef,
    setCanvasRef,
  };
}
