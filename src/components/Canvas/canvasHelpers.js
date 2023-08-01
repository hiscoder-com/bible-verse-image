const imageCache = {};

export const drawImageOnCanvas = async (ctx, backgroundimage) => {
  if (!backgroundimage.srcimage || !backgroundimage) {
    return;
  }

  if (imageCache[backgroundimage.srcimage]) {
    const pic = imageCache[backgroundimage.srcimage];
    await drawImageFromCache(pic, ctx, backgroundimage);
  } else {
    const pic = new Image();
    pic.src = backgroundimage.srcimage;

    await new Promise((resolve) => {
      pic.onload = resolve;
    });

    imageCache[backgroundimage.srcimage] = pic;
    await drawImageFromCache(pic, ctx, backgroundimage);
  }
};

const drawImageFromCache = (pic, ctx, backgroundimage) => {
  return new Promise((resolve) => {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } =
      calculateImageParameters(pic, ctx, backgroundimage);
    ctx.drawImage(pic, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    resolve();
  });
};

const drawImage = (ctx, style) => {
  const logo = new Image();
  logo.src = style.props.url;

  logo.onload = function () {
    const logoX = style.x;
    const logoY = style.y;
    if (style.props.zoom) {
      const zoom = style.props.zoom;
      const logoWidth = logo.width * zoom;
      const logoHeight = logo.height * zoom;

      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
    } else {
      ctx.drawImage(logo, logoX, logoY);
    }
  };
};

const drawText = (ctx, style) => {
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
export const calculateImageParameters = (pic, ctx, backgroundimage) => {
  let sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height;

  sourceX = 0;
  sourceY = 0;
  sourceWidth = pic.width;
  sourceHeight = pic.height;
  x = 0;
  y = 0;
  width = ctx.canvas.width;
  height = ctx.canvas.height;

  if (backgroundimage.zoom === undefined) {
    ({ sourceX, sourceY, sourceWidth, sourceHeight } = centerImage(
      pic,
      ctx.canvas.width,
      ctx.canvas.height
    ));
  } else {
    const zoom = backgroundimage.zoom;
    width = pic.width * zoom;
    height = pic.height * zoom;
    x = (ctx.canvas.width - width) / 2;
    y = (ctx.canvas.height - height) / 2;
  }

  if (backgroundimage.offsetX !== undefined && backgroundimage.offsetY !== undefined) {
    x += backgroundimage.offsetX;
    y += backgroundimage.offsetY;
  }

  return { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height };
};

const centerImage = (pic, canvasWidth, canvasHeight) => {
  const imageWidth = pic.width;
  const imageHeight = pic.height;

  const canvasAspectRatio = canvasWidth / canvasHeight;
  const imageAspectRatio = imageWidth / imageHeight;

  let sourceX, sourceY, sourceWidth, sourceHeight;

  if (imageAspectRatio > canvasAspectRatio) {
    sourceWidth = imageHeight * canvasAspectRatio;
    sourceHeight = imageHeight;
    sourceX = (imageWidth - sourceWidth) / 2;
    sourceY = 0;
  } else {
    sourceWidth = imageWidth;
    sourceHeight = imageWidth / canvasAspectRatio;
    sourceX = 0;
    sourceY = (imageHeight - sourceHeight) / 2;
  }

  return { sourceX, sourceY, sourceWidth, sourceHeight };
};

export const drawWrappedText = (
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
