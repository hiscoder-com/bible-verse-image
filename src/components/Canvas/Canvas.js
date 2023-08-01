import React, { useEffect, useCallback } from 'react';
import { useCanvasContext } from './useCanvasContext';
import { drawImageOnCanvas, drawElementsOnCanvas } from './canvasHelpers';

const Canvas = ({ infocanvas, infoimage, elements, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infocanvas.height ?? 1200,
    infocanvas.width ?? 1200
  );

  const draw = useCallback(async () => {
    console.log('Drawing...');
    const ctx = contextRef?.current;
    if (!ctx) {
      return;
    }

    if (infoimage.srcimage) {
      await drawImageOnCanvas(ctx, infoimage.srcimage, infoimage);
    }
    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'image')
    );

    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'text')
    );
  }, [contextRef, infoimage, elements]);

  useEffect(() => {
    draw();
  }, [infocanvas, infoimage, elements]);
  return <canvas ref={setCanvasRef} {...props} />;
};

export default Canvas;
