export const drawText = (ctx, style) => {
  ctx.fillStyle = style.props.fillStyle;
  ctx.font = `${style.props.fontStyle} ${style.props.fontSize}px ${style.props.font}`;
  const fontHeight = style.props.fontSize;
  const lineHeight = style.props.lineHeight ?? 1.2 * fontHeight;

  drawWrappedText(
    ctx,
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
  text,
  x,
  y,
  blockWidth,
  lineHeight,
  fontHeight,
  alignment
) => {
  const words = text.split(' ');
  let line = '';
  blockWidth = blockWidth ?? ctx.canvas.width;

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i];
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

      ctx.fillText(line, x + offsetX, y + fontHeight);
      line = words[i] + ' ';
      y += lineHeight;
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
