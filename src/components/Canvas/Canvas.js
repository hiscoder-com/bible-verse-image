import React, { useEffect } from 'react';
import { useOnDraw } from './useOnDraw';

const Canvas = (props) => {
  const { organization, bibletext, reftext, nametranslate, srcimage, sizeImage } = props;
  const { canvasRef, contextRef } = useOnDraw(sizeImage);

  const draw = () => {
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }

    if (srcimage === undefined) {
      return;
    }

    const pic = new Image();
    pic.src = srcimage;
    pic.onload = function () {
      const x0 = 0;
      const y0 = 0;
      const x1 = sizeImage;
      const y1 = sizeImage;

      ctx.drawImage(pic, x0, y0, x1, y1);
    };

    ctx.fillStyle = 'white';
    ctx.font = 'small-caps 30px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(organization, 70, 70);

    ctx.font = 'small-caps 120px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(bibletext, 600, 550);

    ctx.font = 'small-caps 40px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(reftext, 600, 650);

    ctx.font = 'small-caps 40px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(nametranslate, 600, 1150);
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
