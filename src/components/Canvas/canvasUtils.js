import { drawImage } from './imageUtils';
import { drawText } from './textUtils';

export const drawElementsOnCanvas = (ctx, elements) => {
  elements.forEach((style) => {
    switch (style.type) {
      case 'image':
        drawImage(ctx, style);
        break;
      case 'text':
        drawText(ctx, style);
        break;
      default:
        break;
    }
  });
};
