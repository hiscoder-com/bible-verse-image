import React, { useEffect } from 'react';
import { useOnDraw } from './Hooks';

const Canvas = (props) => {
  const { canvasRef } = useOnDraw();
  const { organization, bibletext, reftext, nametranslate, srcimage } = props;

  const draw = (ctx) => {
    if (srcimage === undefined) {
      return;
    }

    const pic = new Image();
    pic.src = srcimage;
    pic.onload = function () {
      // Вписываем картинку в размер холста
      const x0 = 0;
      const y0 = 0;
      const x1 = 1200;
      const y1 = 1200;

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
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    // Our draw function
    const render = () => {
      draw(context);
      // Предоставляет разработчикам доступ к жизненному циклу фрейма,
      // позволяя выполнять операции перед вычислением стилей
      // и формированием макета (layout) документа браузером
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
