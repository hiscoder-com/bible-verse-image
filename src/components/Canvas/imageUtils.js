const imageCache = {
  backgrounds: {},
  images: {},
};

const loadImageFromCache = (src, cacheKey) => {
  return new Promise((resolve, reject) => {
    if (imageCache[cacheKey][src]) {
      resolve(imageCache[cacheKey][src]);
    } else {
      const pic = new Image();
      pic.onload = () => {
        imageCache[cacheKey][src] = pic;
        resolve(pic);
      };
      pic.onerror = (error) => reject(error);
      pic.src = src;
    }
  });
};

const drawImageFromCache = async (pic, ctx, params) => {
  const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height } = params;
  ctx.drawImage(pic, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

export const drawBackgroundAndLogo = async (ctx, style) => {
  switch (style.type) {
    case 'background':
      if (style.props.url) {
        try {
          const pic = await loadImageFromCache(style.props.url, 'backgrounds');
          const elementWithDimensions = calculateImageParameters(pic, ctx, style.props);
          await drawImageFromCache(pic, ctx, elementWithDimensions);
        } catch (error) {
          console.error('Error loading background image:', error);
        }
      }
      break;
    case 'image':
      if (style.props.url) {
        try {
          const logo = await loadImageFromCache(style.props.url, 'images');
          const { x, y, props } = style;
          const logoWidth = logo.width * props.zoom;
          const logoHeight = logo.height * props.zoom;
          ctx.drawImage(logo, x, y, logoWidth, logoHeight);
        } catch (error) {
          console.error('Error loading logo image:', error);
        }
      }
      break;
  }
};

const calculateImageParameters = (pic, ctx, backgroundimage) => {
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
