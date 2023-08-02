import React, { useEffect } from 'react';
import { useCanvasContext } from './useCanvasContext';
import { drawElementsOnCanvas } from './canvasUtils';

// eslint-disable-next-line react/display-name
const Canvas = React.memo(({ infocanvas, elements, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infocanvas.height ?? 1200,
    infocanvas.width ?? 1200
  );

  useEffect(() => {
    const draw = async () => {
      console.log('Drawing...');
      const ctx = contextRef?.current;
      if (!ctx) {
        return;
      }
      await drawElementsOnCanvas(ctx, elements);
    };

    draw();
  }, [elements]);

  return <canvas ref={setCanvasRef} {...props} />;
});

export default Canvas;
