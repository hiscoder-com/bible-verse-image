import React, { useEffect } from 'react';
import { useCanvasContext } from './useCanvasContext';

const Canvas = ({ infoimage, textStyles, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infoimage.height ?? 1200,
    infoimage.width ?? 1200
  );

  const draw = () => {
    const ctx = contextRef?.current;
    if (!ctx) {
      return;
    }
    if (infoimage.srcimage) {
      const pic = new Image();
      pic.src = infoimage.srcimage;
      pic.onload = function () {
        const x0 = 0;
        const y0 = 0;
        const x1 = infoimage.widthmage;
        const y1 = infoimage.heightimage;

        ctx.drawImage(pic, x0, y0, x1, y1);
      };
    }
    textStyles.forEach((style) => {
      ctx.fillStyle = style.fillStyle;
      ctx.font = style.font;
      ctx.textAlign = style.textAlign;
      ctx.fillText(style.text, style.x, style.y);
    });
  };

  useEffect(() => {
    let animationFrameId;

    const render = () => {
      draw();
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={setCanvasRef} {...props} />;
};

export default Canvas;
