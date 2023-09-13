const defaultStrokeColor = 'black';
const defaultFillColor = 'white';
const defaultWidth = 1;

export const drawLine = (ctx, style) => {
  const {
    x1,
    y1,
    x2,
    y2,
    props: { lineColor, lineWidth },
  } = style;
  if (lineWidth === 0) {
    return;
  }

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.strokeStyle = lineColor ?? defaultStrokeColor;
  ctx.lineWidth = lineWidth ?? defaultWidth;

  ctx.stroke();
  ctx.closePath();
};

export const drawRectangle = (ctx, style) => {
  let {
    x,
    y,
    width,
    height,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

  if (strokeWidth === 0) {
    strokeWidth = 1;
    strokeColor = 'transparent';
  }
  ctx.beginPath();
  ctx.rect(x, y, width, height);

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.fillStyle = fillColor ?? defaultFillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;

  ctx.stroke();
  ctx.closePath();
};

export const drawTriangle = (ctx, style) => {
  let {
    vertex1,
    vertex2,
    vertex3,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

  if (strokeWidth === 0) {
    strokeWidth = 1;
    strokeColor = 'transparent';
  }
  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.closePath();

  ctx.fillStyle = fillColor ?? defaultFillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;
  console.log(ctx.strokeStyle, 82);
  console.log(ctx.lineWidth, 83);

  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.moveTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.moveTo(vertex3.x, vertex3.y);
  ctx.lineTo(vertex1.x, vertex1.y);
  ctx.stroke();
};

export const drawOval = (ctx, style) => {
  let {
    x,
    y,
    radiusX,
    radiusY,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

  if (strokeWidth === 0) {
    strokeWidth = 1;
    strokeColor = 'transparent';
  }

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);

  ctx.fillStyle = fillColor ?? defaultFillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;

  ctx.stroke();
  ctx.closePath();
};
