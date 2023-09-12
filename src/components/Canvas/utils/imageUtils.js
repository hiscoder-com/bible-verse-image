const imageCache = {};

const loadImageFromCache = (src) => {
  return new Promise((resolve, reject) => {
    if (imageCache[src]) {
      resolve(imageCache[src]);
    } else {
      const pic = new Image();
      pic.onload = () => {
        imageCache[src] = pic;
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
  style.props.zoom = style?.props?.zoom ?? 1;
  style.props.offsetX = style?.props?.offsetX ?? 0;
  style.props.offsetY = style?.props?.offsetY ?? 0;
  style.props.filter = style.props.filter ?? 'none';
  style.props.rotate = style.props.rotate ?? 0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); //reset rotate

  switch (style.type) {
    case 'background':
      if (style.url) {
        try {
          const pic = await loadImageFromCache(style.url);
          const elementWithDimensions = calculateImageParameters(pic, ctx, style.props);

          ctx.filter = style.props.filter;
          console.log(style.props.rotate, 38);
          ctx.rotate((style.props.rotate * Math.PI) / 180);
          ctx.translate(elementWithDimensions.sourceX, elementWithDimensions.sourceY);

          await drawImageFromCache(pic, ctx, elementWithDimensions);
          ctx.rotate((-style.props.rotate * Math.PI) / 180);
        } catch (error) {
          console.error('Error loading background image:', error);
        }
      }
      break;
    case 'image':
      if (style.url) {
        try {
          const logo = await loadImageFromCache(style.url);
          const { zoom, offsetX, offsetY } = style.props;
          const logoWidth = logo.width * zoom;
          const logoHeight = logo.height * zoom;

          ctx.rotate((style.props.rotate * Math.PI) / 180);
          ctx.filter = style.props.filter;
          ctx.drawImage(logo, offsetX, offsetY, logoWidth, logoHeight);
        } catch (error) {
          console.error('Error loading logo image:', error);
        }
      }
      break;
  }
};

const calculateImageParameters = (pic, ctx, backgroundimage) => {
  let sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height;
  x = 0;
  y = 0;
  width = ctx.canvas.width;
  height = ctx.canvas.height;

  ({ sourceX, sourceY, sourceWidth, sourceHeight } = centerImage(
    pic,
    ctx.canvas.width,
    ctx.canvas.height,
    backgroundimage.zoom
  ));

  x += backgroundimage.offsetX;
  y += backgroundimage.offsetY;

  return { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height };
};

const centerImage = (pic, canvasWidth, canvasHeight, zoom) => {
  const imageWidth = pic.width / zoom;
  const imageHeight = pic.height / zoom;

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
