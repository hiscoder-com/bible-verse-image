export const drawText = async (ctx, style) => {
  ctx.fillStyle = style.props.fillStyle;
  ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
  const fontHeight = style.props.fontSize;
  const lineHeight = style.props.lineHeight ?? 1.2 * fontHeight;

  drawWrappedText(
    ctx,
    style,
    style.props.text,
    style.x,
    style.y,
    style.props.blockWidth,
    lineHeight,
    fontHeight,
    style.props.alignment
  );
};

const drawWrappedText = async (
  ctx,
  style,
  text,
  x,
  y,
  blockWidth,
  lineHeight,
  fontHeight,
  alignment
) => {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const words = cleanText.split(' ');
  const parts = parseText(text);
  let line = '';
  blockWidth = blockWidth ?? ctx.canvas.width;
  let offsetY = 0; // Отслеживает координату y для каждой строки
  let drawFinal;
  let selectedWidth;
  for (let i = 0; i < words.length; i++) {
    if (isWordSelected(words[i], parts)) {
      // "Нарисовать точку, чтобы понять, где началось рисование":
      drawBoldDot(ctx, x, y, 15, 'red');

      const selectedWord = parts[findWordIndex(words[i], parts)];
      const selectedMetrics = ctx.measureText(selectedWord.text);
      selectedWidth = selectedMetrics.width;

      // Проверяем, помещается ли выделенное слово в текущей строке
      // if (x + selectedWidth > blockWidth) {
      //   // Переносим на следующую строку
      //   x = style.x; // Сбрасываем координату x
      //   y += lineHeight; // Переходим на следующую строку.
      //   offsetY += lineHeight; // Обновляем offsetY
      // }

      // Рисуем выделенное слово в прямоугольнике
      drawFinal = await drawWordInRectangle(
        ctx,
        selectedWord.text,
        x,
        y,
        selectedWord.attributes,
        style
      );
      console.log(62, y);

      // Обновляем координату x на основе ширины нарисованного прямоугольника
      x += selectedWidth;
    } else {
      // "Нарисовать точку, чтобы понять, где началось рисование":
      drawBoldDot(ctx, x, y, 15, 'black');

      x = style.x;
      let testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine) + selectedWidth;
      const testWidth = metrics.width;

      if (testWidth > blockWidth) {
        console.log(72);
        let offsetX = 0;

        switch (alignment) {
          case 'center':
            offsetX = (blockWidth - ctx.measureText(line).width) / 2;
            break;
          case 'right':
            offsetX = blockWidth - ctx.measureText(line).width;
            break;
          default:
            break;
        }
        ctx.fillStyle = style.props.fillStyle;
        ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
        await ctx.fillText(line, x + offsetX, y);
        line = words[i] + ' ';
        y += lineHeight;
        offsetY += lineHeight;
        console.log(91);
      } else {
        line = testLine;
        console.log(93);
      }
    }
  }

  let offsetX = 0;

  switch (alignment) {
    case 'center':
      offsetX = (blockWidth - ctx.measureText(line).width) / 2;
      break;
    case 'right':
      offsetX = blockWidth - ctx.measureText(line).width;
      break;
    default:
      break;
  }
  ctx.fillStyle = style.props.fillStyle;
  ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
  console.log(111);
  console.log(115, y);

  await ctx.fillText(line, x + offsetX, y + offsetY);
};

const drawTextInBlock = async (ctx, style, text, x, y) => {
  ctx.fillStyle = style.props.fillStyle;
  ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
  await ctx.fillText(text, x, y);
};

const parseText = (text) => {
  const parts = [];
  const regex = /<\/?selected(\s+[^>]+)?>|(\S+)/g;
  const regexSelected = /<selected(?=\s|>)/g;
  let match;

  let selectedAttributes = null;
  let findAttribute = false;

  while ((match = regex.exec(text)) !== null) {
    const [tag, attributes] = match;
    if ((match = regexSelected.exec(tag)) !== null) {
      selectedAttributes = parseAttributes(attributes);
      findAttribute = true;
    } else if (tag === '<selected/>') {
      selectedAttributes = null;
    } else if (findAttribute) {
      parts.push({ text: tag, selected: true, attributes: selectedAttributes });
      findAttribute = false;
    } else {
      parts.push({ text: tag, selected: false });
    }
  }

  return parts;
};

const isWordSelected = (word, parts) => {
  const selectedMatch = parts.find((part) => part.selected && part.text === word);
  return !!selectedMatch;
};

const findWordIndex = (word, parts) => {
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].text === word) {
      return i;
    }
  }
  return -1; // Word not found
};

const findSelectedAttributes = (word, parts) => {
  const selectedMatch = parts.find((part) => part.text === word && part.selected);

  if (selectedMatch && selectedMatch.attributes) {
    const attributesArray = selectedMatch.attributes.match(/(\S+)=['"]([^'"]*)['"]/g);
    const attributesObject = {};

    attributesArray.forEach((attribute) => {
      const [name, value] = attribute.split('=');
      attributesObject[name] = value.slice(1, -1); // Убираем кавычки в начале и конце значения
    });

    return attributesObject;
  }

  return null;
};

const parseAttributes = (attributeString) => {
  const attributes = {};
  const regex = /(\S+)\s*=\s*"([^"]*)"/g;
  let match;

  while ((match = regex.exec(attributeString)) !== null) {
    const attributeName = match[1];
    const attributeValue = match[2];
    attributes[attributeName] = attributeValue;
  }
  return attributes;
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

  await ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  ctx.fillStyle = textColor;
  await ctx.fillText(text, rectX + padding, rectY + padding + textHeight / 1.3);

  // Возвращает координаты, где было закончено рисование
  return { x: rectX, y: rectY, width: rectWidth, height: rectHeight };
};

// Добавляем функцию для рисования жирной точки
const drawBoldDot = (ctx, x, y, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};
