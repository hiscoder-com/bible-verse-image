import { drawBackgroundAndLogo } from './imageUtils';
import { drawRectangle, drawLine, drawTriangle } from './figureUtils';
import { drawText } from './textUtils';

export const drawElementsOnCanvas = async (ctx, elements) => {
  for (const style of elements) {
    switch (style.type) {
      case 'text':
        drawText(ctx, style);
        break;
      case 'rectangle':
        drawRectangle(ctx, style);
        break;
      case 'triangle':
        drawTriangle(ctx, style);
        break;
      case 'line':
        drawLine(ctx, style);
        break;
      case 'background':
      case 'image':
        await drawBackgroundAndLogo(ctx, style);
        break;
    }
  }
};
