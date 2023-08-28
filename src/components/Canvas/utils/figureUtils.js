const defaultStrokeColor = 'black';
const defaultFillColor = 'white';
const defaultWidth = 1;

export const drawRectangle = (ctx, style) => {
  const {
    x,
    y,
    props: { width, height, fillColor, strokeColor, strokeWidth },
  } = style;

  ctx.beginPath();
  ctx.rect(x, y, width, height);

  ctx.fillStyle = fillColor === undefined ? defaultFillColor : fillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor === undefined ? defaultStrokeColor : strokeColor;
  ctx.lineWidth = strokeWidth === undefined ? defaultWidth : strokeWidth;

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

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.strokeStyle = lineColor === undefined ? defaultStrokeColor : lineColor;
  ctx.lineWidth = lineWidth === undefined ? defaultWidth : lineWidth;

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

  ctx.beginPath();
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.closePath();

  ctx.fillStyle = fillColor === undefined ? defaultFillColor : fillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor === undefined ? defaultStrokeColor : strokeColor;
  ctx.lineWidth = strokeWidth === undefined ? defaultWidth : strokeWidth;
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

  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);

  ctx.fillStyle = fillColor === undefined ? defaultFillColor : fillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor === undefined ? defaultStrokeColor : strokeColor;
  ctx.lineWidth = strokeWidth === undefined ? defaultWidth : strokeWidth;

  ctx.stroke();
  ctx.closePath();
};
