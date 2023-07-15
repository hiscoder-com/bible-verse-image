import React, { useEffect } from 'react';
import { useCanvasContext } from './useCanvasContext';

const Canvas = ({ infocanvas, infoimage, elementStyles, ...props }) => {
  const { contextRef, setCanvasRef } = useCanvasContext(
    infocanvas.height ?? 1200,
    infocanvas.width ?? 1200
  );

  const draw = () => {
    const ctx = contextRef?.current;
    if (!ctx) {
      return;
    }

    const calculateImageParameters = (pic, ctx, infoimage) => {
      let sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height;

      sourceX = 0;
      sourceY = 0;
      sourceWidth = pic.width;
      sourceHeight = pic.height;
      x = 0;
      y = 0;
      width = ctx.canvas.width;
      height = ctx.canvas.height;

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

      return { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height };
    };

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
        const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } =
          calculateImageParameters(pic, ctx, infoimage);
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

    elementStyles.forEach((style) => {
      switch (style.type) {
        case 'image':
          const logo = new Image();
          logo.src = style.props.url;

          logo.onload = function () {
            const logoX = style.x;
            const logoY = style.y;
            if (style.props.zoom) {
              const zoom = style.props.zoom;
              const logoWidth = logo.width * zoom;
              const logoHeight = logo.height * zoom;

              ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
            } else {
              ctx.drawImage(logo, logoX, logoY);
            }
          };
          break;
        case 'text':
          ctx.fillStyle = style.props.fillStyle;
          ctx.font = style.props.font;
          ctx.textAlign = style.props.textAlign;
          ctx.fillText(style.props.text, style.x, style.y);
          break;
        default:
          break;
      }
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
