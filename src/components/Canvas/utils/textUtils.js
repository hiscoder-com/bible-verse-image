import { addWidthToParts, parseText } from './parseUtils.mjs';

export const drawText = async (ctx, style) => {
  style.props.fontStyle = style.props.fontStyle ?? 'normal';
  style.props.fontSize = style.props.fontSize ?? 15;
  style.props.font = style.props.font ?? 'Helvetica, Arial, sans-serif';
  style.props.lineHeight = style.props.lineHeight ?? 1.2 * style.props.fontSize;

  style.props.blockWidth = style.props.blockWidth ?? 450;
  style.props.alignment = style.props.alignment ?? 'left';

  const parts = parseText(style.text ?? '');
  const lines = createLinesFromWords(ctx, style, parts);
  drawLines(ctx, lines, style);
};

const createLinesFromWords = (ctx, style, words) => {
  let {
    x,
    y,
    props: { blockWidth, lineHeight, alignment },
  } = style;

  let currentLine = { x, y, words: [] };
  let currentLineWidth = 0;
  const lines = [];
  for (const word of words) {
    if (word.selected) {
      ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${word.attributes.font}`;
    } else {
      ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
    }
    word.width = parseInt(ctx.measureText(word.text).width);

    if (currentLineWidth + word.width <= blockWidth) {
      currentLine.words.push(word);
      currentLineWidth += word.width;
    } else {
      lines.push(currentLine);
      currentLine = { x, y: currentLine.y + lineHeight, words: [word] };
      currentLineWidth = word.width;
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
    line.x += parseInt(offsetX);
  }

  return lines;
};

const drawLines = (ctx, lines, style) => {
  for (const line of lines) {
    let x = line.x;

    const y = line.y;

    for (const word of line.words) {
      if (word.selected) {
        drawWordInRectangle(ctx, word, x, y, word.attributes, style);
      } else if (word.text !== ' ') {
        ctx.fillStyle = style.props.fillStyle;
        ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
        ctx.fillText(word.text, x, y);
      }
      x += word.width;
    }
  }
};

export const drawWordInRectangle = (ctx, word, x, y, attributes, style) => {
  const { text, width } = word;

  const { backgroundColor, textColor, font } = attributes;
  const {
    props: { fontSize, fontStyle },
  } = style;
  ctx.fillStyle = backgroundColor;
  ctx.font = `${fontStyle} ${fontSize}px ${font}`;
  ctx.fillRect(x, y - fontSize * 1.2, width, fontSize * 1.4);
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
};
