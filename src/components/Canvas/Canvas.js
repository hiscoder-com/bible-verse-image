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

    const centerImage = (pic, canvasWidth, canvasHeight) => {
      const imageWidth = pic.width;
      const imageHeight = pic.height;

      const canvasAspectRatio = canvasWidth / canvasHeight;
      const imageAspectRatio = imageWidth / imageHeight;

      let sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height;

      if (imageAspectRatio > canvasAspectRatio) {
        sourceWidth = imageHeight * canvasAspectRatio;
        sourceHeight = imageHeight;
        sourceX = (imageWidth - sourceWidth) / 2;
        sourceY = 0;

        x = 0;
        y = 0;
        width = canvasWidth;
        height = canvasHeight;
      } else {
        sourceWidth = imageWidth;
        sourceHeight = imageWidth / canvasAspectRatio;
        sourceX = 0;
        sourceY = (imageHeight - sourceHeight) / 2;

        x = 0;
        y = 0;
        width = canvasWidth;
        height = canvasHeight;
      }

      return { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height };
    };

    if (infoimage.srcimage) {
      const pic = new Image();
      pic.src = infoimage.srcimage;
      pic.onload = function () {
        const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } =
          centerImage(pic, ctx.canvas.width, ctx.canvas.height);

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
