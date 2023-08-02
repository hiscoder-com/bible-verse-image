const imageCache = {};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const pic = new Image();
    pic.onload = () => resolve(pic);
    pic.onerror = (error) => reject(error);
    pic.src = src;
  });
};

export const drawImageOnCanvas = async (ctx, backgroundimage) => {
  if (!backgroundimage.srcimage || !backgroundimage) {
    return;
  }

  if (imageCache[backgroundimage.srcimage]) {
    await drawImageFromCache(imageCache[backgroundimage.srcimage], ctx, backgroundimage);
  } else {
    try {
      const pic = await loadImage(backgroundimage.srcimage);
      imageCache[backgroundimage.srcimage] = pic;
      await drawImageFromCache(pic, ctx, backgroundimage);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }
};

const drawImageFromCache = async (pic, ctx, backgroundimage) => {
  const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } =
    calculateImageParameters(pic, ctx, backgroundimage);
  ctx.drawImage(pic, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

export const drawImage = async (ctx, style) => {
  try {
    const logo = await loadImage(style.props.url);
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
  } catch (error) {
    console.error('Error loading image:', error);
  }
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
