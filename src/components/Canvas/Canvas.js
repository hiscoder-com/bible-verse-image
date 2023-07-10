import React, { useEffect, useRef } from 'react';
import { useCanvasContext } from './useCanvasContext';

const Canvas = ({ infocanvas, infoimage, textStyles, ...props }) => {
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
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
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

  return (
    <canvas
      ref={setCanvasRef}
      {...props}
      style={{ width: infocanvas.width, height: infocanvas.height }}
    />
  );
};

export default Canvas;
