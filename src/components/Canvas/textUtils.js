export const drawText = (ctx, style) => {
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

const drawWrappedText = (
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
  const parts = parseText(text);
  console.log(parts);
  let line = '';
  blockWidth = blockWidth ?? ctx.canvas.width;

  for (let i = 0; i < parts.length; i++) {
    const { text: partText, selected, attributes } = parts[i];
    let testLine = line + partText;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    testLine += ' ';

    if (testWidth > blockWidth) {
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
      if (selected && attributes) {
        drawWordInRectangle(ctx, partText, x, y, style);
      } else {
        ctx.fillText(line, x + offsetX, y + fontHeight);
        line = partText + ' ';
        y += lineHeight;
      }
    } else {
      line = testLine;
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
  ctx.fillText(line, x + offsetX, y + lineHeight);
};

export const drawTextInRectangle = (ctx, style) => {
  const {
    x,
    y,
    props: { backgroundColor, text, fillStyle, fontStyle, fontSize, font },
  } = style;

  const textWidth = ctx.measureText(text).width;

  const height = 1.2 * fontSize;
  const width = textWidth + 60;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x, y, width, height);

  const textX = x + 30;
  const textY = y - height / 4;

  drawText(ctx, {
    props: {
      fillStyle: fillStyle,
      fontStyle: fontStyle,
      fontSize: fontSize,
      font: font,
      text: text,
    },
    x: textX,
    y: textY,
    blockWidth: width - 30,
  });
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

export const drawWordInRectangle = (ctx, style) => {
  const {
    x,
    y,
    props: {
      fillStyle,
      fontSize,
      font,
      fontStyle,
      text,
      alignment,
      verticalAlignment,
      textColor,
    },
  } = style;
  ctx.fillStyle = fillStyle;
  ctx.font = `${fontStyle} ${fontSize}px ${font}`;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize; // Assuming text height is roughly equal to font size
  const padding = 10; // Padding around the text
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

  // Draw the rectangle
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  // Draw the text inside the rectangle
  ctx.fillStyle = textColor; // Set the color for the text
  ctx.fillText(text, rectX + padding, rectY + padding + textHeight);
};
