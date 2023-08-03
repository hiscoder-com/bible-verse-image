import { drawBackgroundAndLogo } from './imageUtils';
import { drawText } from './textUtils';

export const drawElementsOnCanvas = async (ctx, elements) => {
  for (const style of elements) {
    switch (style.type) {
      case 'text':
        drawText(ctx, style);
        break;
      case 'background':
      case 'image':
        await drawBackgroundAndLogo(ctx, style);
      default:
        break;
    }
  }
};
