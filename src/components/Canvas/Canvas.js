import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const { organization, bibleText, refText, nameTranslate, srcImage } = props;

  const draw = (ctx) => {
    const pic = new Image();
    pic.src = srcImage;
    pic.onload = function () {
      //Вписываем картинку в размер холста

      //источник картинки
      const srs = pic;
      const x0 = 0;
      const y0 = 0;
      const x1 = 1200;
      const y1 = 1200;

      ctx.drawImage(srs, x0, y0, x1, y1);
    };

    ctx.fillStyle = 'white';
    ctx.font = 'small-caps 30px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(organization, 70, 70);

    ctx.font = 'small-caps 120px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(bibleText, 600, 550);

    ctx.font = 'small-caps 40px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(refText, 600, 650);

    ctx.font = 'small-caps 40px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(nameTranslate, 600, 1150);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    //Размеры холста
    canvas.height = 1200;
    canvas.width = 1200;
    let animationFrameId;

    //Our draw came here
    const render = () => {
      draw(context);
      //предоставляет разработчикам доступ к жизненному циклу фрейма,
      //позволяя выполнять операции перед вычислением стилей
      //и формированием макета (layout) документа браузером
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
