import { addWidthToParts, parseText } from './parseUtils.mjs';

export const drawText = async (ctx, style) => {
  ctx.font = `${style.props.fontStyle ?? 'small-caps'} ${style.props.fontSize ?? 15}px ${
    style.props.font ?? 'Helvetica, Arial, sans-serif'
  }`;

  const parts = parseText(style.text ?? '');
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

  const fontHeight = style.props.fontSize ?? 15;
  const lineHeight = style.props.lineHeight ?? 1.2 * fontHeight;
  blockWidth = blockWidth ?? 450;
  alignment = alignment ?? 'left';

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
        drawWordInRectangle(ctx, word.text, x, y, word.attributes, style);
      } else if (word.text !== ' ') {
        ctx.fillStyle = style.props.fillStyle;
        ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
        ctx.fillText(word.text, x, y);
      }
      x += word.width;
    }
  }
};

export const drawWordInRectangle = (ctx, text, x, y, attributes, style) => {
  const { backgroundColor, textColor, font, verticalAlignment } = attributes;
  const {
    props: { fontSize, fontStyle, alignment },
  } = style;
  const lineHeight = style.props.lineHeight ?? 1.2 * fontHeight;
  y = y - lineHeight / 2;
  ctx.fillStyle = backgroundColor;
  ctx.font = `${fontStyle} ${fontSize}px ${font}`;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize;
  const padding = 10;
  const rectWidth = textWidth + 2 * padding;
  const rectHeight = textHeight + 2 * padding;

  let rectX = x;
  switch (alignment) {
    case 'center':
      rectX = x - rectWidth / 2 + textWidth / 2;
      break;
    case 'right':
      rectX = x - rectWidth + textWidth;
      break;
    default:
      break;
  }

  let rectY;
  switch (verticalAlignment) {
    case 'middle':
      rectY = y - rectHeight / 2;
      break;
    case 'bottom':
      rectY = y - rectHeight;
      break;
    default:
      rectY = y;
      break;
  }

  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  ctx.fillStyle = textColor;
  ctx.fillText(text, rectX + padding, rectY + padding + textHeight / 1.3);
};
