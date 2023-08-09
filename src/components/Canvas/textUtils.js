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
  fontHeight
) => {
  const parts = parseText(text);

  let currentX = x;
  let currentY = y + fontHeight; // Учитываем высоту шрифта для первой строки
  blockWidth = blockWidth ?? ctx.canvas.width;

  for (let i = 0; i < parts.length; i++) {
    const { text: partText, selected, attributes } = parts[i];
    const metrics = ctx.measureText(partText);
    const wordWidth = metrics.width;

    if (selected === true && attributes) {
      const centerX = (x + blockWidth) / 2; // Центрирование x координаты для выделенного текста
      const drawFinal = await drawWordInRectangle(
        ctx,
        partText,
        centerX,
        currentY,
        attributes,
        style
      );
      currentY = drawFinal.y + lineHeight + 50; // Переход на следующую строку после выделенного текста
      currentX = x; // Сбрасываем текущую x координату для не выделенных слов
    } else {
      if (currentX + wordWidth <= x + blockWidth) {
        // Проверяем, помещается ли слово в текущей строке
        const offsetX = calculateOffsetX(ctx, style, partText, blockWidth);
        await drawTextInBlock(
          ctx,
          style,
          partText,
          currentX + offsetX - 60,
          currentY - 20,
          blockWidth
        );
        currentX += wordWidth;
      } else {
        // Переход на следующую строку
        currentX = x;
        currentY += lineHeight;
        currentY += selected ? lineHeight : fontHeight; // Учитываем высоту строки в зависимости от выделенности
        const offsetX = calculateOffsetX(ctx, style, partText, blockWidth);
        await drawTextInBlock(ctx, style, partText, x + offsetX, currentY, blockWidth);
        currentX += wordWidth;
      }
    }
  }
};

const calculateOffsetX = (ctx, style, text, blockWidth) => {
  switch (style.props.alignment) {
    case 'center':
      return (blockWidth - ctx.measureText(text).width) / 2;
    case 'right':
      return blockWidth - ctx.measureText(text).width;
    default:
      return 0;
  }
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
  const { backgroundColor, textColor, font, alignment, verticalAlignment } = attributes;
  const {
    props: { fontSize, fontStyle },
  } = style;

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
      rectX = x - rectWidth / 2;
      break;
    case 'right':
      rectX = x - rectWidth;
      break;
    default:
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
