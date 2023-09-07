import { drawBackgroundAndLogo } from './utils/imageUtils';
import { drawRectangle, drawLine, drawTriangle, drawOval } from './utils/figureUtils';
import { drawText } from './utils/textUtils';

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
      case 'oval':
        drawOval(ctx, style);
        break;
      case 'background':
      case 'image':
        await drawBackgroundAndLogo(ctx, style);
        break;
    }
  }
};
