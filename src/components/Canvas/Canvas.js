import React, { useEffect, useCallback } from 'react';
import { useCanvasContext } from './useCanvasContext';
import { drawImageOnCanvas, drawElementsOnCanvas } from './canvasHelpers';

const Canvas = ({ infocanvas, backgroundimage, elements, ...props }) => {
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

    if (backgroundimage.srcimage) {
      await drawImageOnCanvas(ctx, backgroundimage);
    }
    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'image')
    );

    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'text')
    );
  }, [contextRef, backgroundimage, elements]);

  useEffect(() => {
    draw();
  }, [infocanvas, backgroundimage, elements]);
  return <canvas ref={setCanvasRef} {...props} />;
};

export default Canvas;
