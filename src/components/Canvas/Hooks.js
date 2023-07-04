import { useRef } from 'react';

export function useOnDraw() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  function setCanvasRef(ref) {
    canvasRef.current = ref;
  }
  function setSizeCtx() {
    ctxRef.current = canvasRef.current.getContext('2d');
    //Размеры холста
    // canvasRef.current.height = 1200;
    // canvasRef.current.width = 1200;
  }

  return {
    setCanvasRef,
    setSizeCtx,
  };
}
