import React, { useEffect, useRef } from 'react';
import { useCanvasContext } from './useCanvasContext';

const Canvas = ({ infocanvas, infoimage, textStyles, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infocanvas.height ?? 1200,
    infocanvas.width ?? 1200
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
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        const offsetX = infoimage.offsetX || 0;
        const offsetY = infoimage.offsetY || 0;

        const imageWidth = pic.width + offsetX;
        const imageHeight = pic.height + offsetY;

        const canvasAspectRatio = canvasWidth / canvasHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        let sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height;

        if (imageAspectRatio > canvasAspectRatio) {
          sourceWidth = imageHeight * canvasAspectRatio;
          sourceHeight = imageHeight;
          sourceX = (imageWidth - sourceWidth) / 2;
          sourceY = 0;
        } else {
          sourceWidth = imageWidth;
          sourceHeight = imageWidth / canvasAspectRatio;
          sourceX = 0;
          sourceY = (imageHeight - sourceHeight) / 2;
        }

        const zoom = infoimage.zoom || 1;
        width = canvasWidth * zoom;
        height = canvasHeight * zoom;
        x = (canvasWidth - width) / 2;
        y = (canvasHeight - height) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Очищаем холст перед отрисовкой

        ctx.drawImage(
          pic,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          x,
          y,
          width,
          height
        );
      };
    }

    textStyles.forEach((style) => {
      ctx.fillStyle = style.props.fillStyle;
      ctx.font = style.props.font;
      ctx.textAlign = style.props.textAlign;
      ctx.fillText(style.props.text, style.x, style.y);
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
