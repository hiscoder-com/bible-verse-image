import { addWidthToParts, parseText } from './parseUtils.mjs';

export const drawText = async (ctx, style) => {
  ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;

  const parts = parseText(style.props.text);
  addWidthToParts(ctx, parts);

  const lines = createLinesFromWords(style, parts);
  drawLines(ctx, lines, style);
};

const createLinesFromWords = (style, words) => {
  const {
    x,
    y,
    props: { blockWidth, alignment },
  } = style;

  const fontHeight = style.props.fontSize;
  const lineHeight = style.props.lineHeight ?? 1.2 * fontHeight;

  let currentLine = { x, y, words: [] };
  let currentLineWidth = 0;
  const lines = [];

  for (const word of words) {
    const wordWidth = word.width;

    if (currentLineWidth + wordWidth <= blockWidth) {
      currentLine.words.push(word);
      currentLineWidth += wordWidth;
    } else {
      lines.push(currentLine);
      currentLine = { x: 0, y: currentLine.y + lineHeight, words: [word] };
      currentLineWidth = wordWidth;
    }
  }

  if (currentLine.words.length > 0) {
    lines.push(currentLine);
  }

  for (const line of lines) {
    let offsetX = 0;
    switch (alignment) {
      case 'center':
        offsetX =
          (blockWidth - line.words.reduce((sum, word) => sum + word.width, 0)) / 2;
        break;
      case 'right':
        offsetX = blockWidth - line.words.reduce((sum, word) => sum + word.width, 0);
        break;
      default:
        break;
    }
    line.x = offsetX;
  }

  return lines;
};

const drawLines = (ctx, lines, style) => {
  for (const line of lines) {
    const totalLineWidth = line.words.reduce((sum, word) => sum + word.width, 0);
    let x;

    switch (style.props.alignment) {
      case 'center':
        x = (ctx.canvas.width - totalLineWidth) / 2;
        break;
      case 'right':
        x = ctx.canvas.width - totalLineWidth;
        break;
      default:
        x = 0;
        break;
    }

    const y = line.y;

    for (const word of line.words) {
      if (word.selected) {
        // Рисование выделенного слова
        drawWordInRectangle(
          ctx,
          word.text,
          x,
          y + 40, // offsetY
          word.attributes,
          style
        );
      } else if (word.text !== ' ') {
        // Рисование обычного слова
        ctx.fillStyle = style.props.fillStyle;
        ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
        ctx.fillText(word.text, x, y);
      }

      x += word.width; // Смещение x на ширину слова
    }
  }
};

export const drawWordInRectangle = async (ctx, text, x, y, attributes, style) => {
  const { backgroundColor, textColor, font, verticalAlignment } = attributes;
  const {
    props: { fontSize, fontStyle, alignment },
  } = style;

  ctx.fillStyle = backgroundColor;
  ctx.font = `${fontStyle} ${fontSize}px ${font}`;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize;
  const padding = 10;
  const rectWidth = textWidth + 2 * padding;
  const rectHeight = textHeight + 2 * padding;
  let rectX = rectWidth - x;
  switch (alignment) {
    case 'center':
      rectX = style.props.blockWidth - rectWidth / 2;
      break;
    case 'right':
      rectX = style.props.blockWidth + rectWidth + padding;
      break;
    default:
      rectX = rectWidth - x;
      break;
  }

  let rectY = y;
  switch (verticalAlignment) {
    case 'middle':
      rectY = y - rectHeight / 2;
      break;
    case 'bottom':
      rectY = y - rectHeight;
      break;
    default:
      break;
  }

  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  ctx.fillStyle = textColor;
  ctx.fillText(text, rectX + padding, rectY + padding + textHeight / 1.3);
};
