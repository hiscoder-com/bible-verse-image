import React, { useEffect, useState } from 'react';
import { useCanvasContext } from './useCanvasContext';
import {
  drawImageOnCanvas,
  drawElementsOnCanvas,
  calculateImageParameters,
  drawWrappedText,
} from './canvasHelpers';

const Canvas = ({ infocanvas, infoimage, elements, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infocanvas.height ?? 1200,
    infocanvas.width ?? 1200
  );

  const draw = async () => {
    console.log('Drawing...');
    const ctx = contextRef?.current;
    if (!ctx) {
      return;
    }

    if (infoimage.srcimage) {
      await drawImageOnCanvas(
        ctx,
        infoimage.srcimage,
        infoimage,
        calculateImageParameters
      );
    }
    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'image'),
      drawWrappedText
    );

    drawElementsOnCanvas(
      ctx,
      elements.filter((style) => style.type === 'text'),
      drawWrappedText
    );
  };

  useEffect(() => {
    draw();
  }, [infocanvas, infoimage, elements]);
  return <canvas ref={setCanvasRef} {...props} />;
};

export default Canvas;
