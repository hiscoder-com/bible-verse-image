import React, { useEffect } from 'react';
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
        const canvasWidth = contextRef.current.canvas.width;
        const canvasHeight = contextRef.current.canvas.height;
        const imageWidth = pic.width;
        const imageHeight = pic.height;

        const canvasAspectRatio = canvasWidth / canvasHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        let x, y, width, height;

        if (imageAspectRatio > canvasAspectRatio) {
          width = canvasWidth;
          height = canvasWidth / imageAspectRatio;
          x = 0;
          y = (canvasHeight - height) / 2;
        } else {
          width = canvasHeight * imageAspectRatio;
          height = canvasHeight;
          x = (canvasWidth - width) / 2;
          y = 0;
        }
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
