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

      let sourceX, sourceY, sourceWidth, sourceHeight;

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

      return { sourceX, sourceY, sourceWidth, sourceHeight };
    };

    if (infoimage.srcimage) {
      const pic = new Image();
      pic.src = infoimage.srcimage;
      pic.onload = function () {
        let { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } = {
          sourceX: 0,
          sourceY: 0,
          sourceWidth: pic.width,
          sourceHeight: pic.height,
          x: 0,
          y: 0,
          width: ctx.canvas.width,
          height: ctx.canvas.height,
        };

        if (infoimage.zoom === undefined) {
          ({ sourceX, sourceY, sourceWidth, sourceHeight } = centerImage(
            pic,
            ctx.canvas.width,
            ctx.canvas.height
          ));
        } else {
          const zoom = infoimage.zoom;
          width = pic.width * zoom;
          height = pic.height * zoom;
          x = (ctx.canvas.width - width) / 2;
          y = (ctx.canvas.height - height) / 2;
        }

        if (infoimage.offsetX !== undefined && infoimage.offsetY !== undefined) {
          x += infoimage.offsetX;
          y += infoimage.offsetY;
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

  return <canvas ref={setCanvasRef} {...props} />;
};

export default Canvas;
