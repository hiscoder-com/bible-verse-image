import React, { useEffect } from 'react';
import { useOnDraw } from './useOnDraw';

const Canvas = (props) => {
  const { infoImage, textStyles } = props;
  const { canvasRef, contextRef } = useOnDraw(infoImage.sizeimage);

  const draw = () => {
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }

    if (infoImage.srcimage === undefined) {
      return;
    }

    const pic = new Image();
    pic.src = infoImage.srcimage;
    pic.onload = function () {
      const x0 = 0;
      const y0 = 0;
      const x1 = infoImage.sizeimage;
      const y1 = infoImage.sizeimage;

      ctx.drawImage(pic, x0, y0, x1, y1);
    };

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

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
