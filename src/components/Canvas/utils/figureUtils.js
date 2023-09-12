const defaultStrokeColor = 'black';
const defaultFillColor = 'white';
const defaultWidth = 1;

export const drawRectangle = (ctx, style) => {
  const {
    x,
    y,
    width,
    height,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

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

export const drawLine = (ctx, style) => {
  const {
    x1,
    y1,
    x2,
    y2,
    props: { lineColor, lineWidth },
  } = style;

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

export const drawTriangle = (ctx, style) => {
  const {
    vertex1,
    vertex2,
    vertex3,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

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
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.moveTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.moveTo(vertex3.x, vertex3.y);
  ctx.lineTo(vertex1.x, vertex1.y);
  ctx.stroke();
};

export const drawOval = (ctx, style) => {
  const {
    x,
    y,
    radiusX,
    radiusY,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

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
