import { parseText } from './parseUtils.js';

export const drawText = async (ctx, style) => {
  style.props.fontStyle = style.props.fontStyle ?? 'normal';
  style.props.fontSize = style.props.fontSize ?? 16;
  style.props.font = style.props.font ?? 'Helvetica, Arial, sans-serif';
  style.props.lineHeight = style.props.lineHeight ?? 1.2 * style.props.fontSize;

  style.props.blockWidth = style.props.blockWidth ?? 450;
  style.props.alignment = style.props.alignment ?? 'left';
  style.props.fillStyle = style.props.fillStyle ?? 'black';
  style.props.letterSpacing = style.props.letterSpacing ?? 10;
  style.props.filter = style.props.filter ?? '';

  style.text = style.text ?? '';
  style.text = style.text.replace(/\r/g, '');
  style.text = style.text.replace(/\t/g, '    ');

  // style.text = increaseSpacing(style.text, style.props.letterSpacing);
  const parts = parseText(style.text);
  const lines = createLinesFromWords(ctx, style, parts);
  console.log(lines);
  drawLines(ctx, lines, style);
};

// Функция для добавления дополнительных пробелов с учетом letter-spacing
function increaseSpacing(text, spacing) {
  if (spacing < 4) {
    spacing = 1;
  } else {
    spacing = spacing / 5;
  }
  const spaces = ' '.repeat(spacing); // Создаем строку с нужным количеством пробелов
  return text.split(' ').join(spaces); // Заменяем обычные пробелы на строки с дополнительными пробелами
}

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
    const newlineCount = (word.text.match(/\n/g) || []).length;

    if (newlineCount > 0) {
      for (let i = 0; i < newlineCount; i++) {
        lines.push(currentLine);
        currentLine = { x, y: currentLine.y + lineHeight, words: [] };
        currentLineWidth = 0;
      }
    }

    const wordText = word.text.replace(/\n/g, '');
    if (wordText === '') {
      continue;
    }

    if (word.selected) {
      ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${word.attributes.font}`;
    } else {
      ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
    }
    word.width = parseInt(ctx.measureText(wordText).width);

    if (currentLineWidth + word.width <= blockWidth) {
      currentLine.words.push({ ...word, text: wordText });
      currentLineWidth += word.width;
    } else {
      lines.push(currentLine);
      currentLine = {
        x,
        y: currentLine.y + lineHeight,
        words: [{ ...word, text: wordText }],
      };
      currentLineWidth = word.width;
    }
  }

  if (currentLine.words.length > 0 || lines.length === 0) {
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
        word.attributes.backgroundColor = word.attributes.backgroundColor ?? 'white';
        word.attributes.textColor = word.attributes.textColor ?? style.props.fillStyle;
        word.attributes.font = word.attributes.font ?? style.props.font;

        drawWordInRectangle(ctx, word, x, y, word.attributes, style);
      } else if (word.text !== ' ') {
        ctx.fillStyle = style.props.fillStyle;
        ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
        ctx.letterSpacing = `${style.props.letterSpacing}px`;
        ctx.filter = style.props.filter;
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
  ctx.fillRect(
    x,
    y - fontSize * 1.2,
    (width * style.props.letterSpacing) / 11.5,
    fontSize * 1.4
  );
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
};
