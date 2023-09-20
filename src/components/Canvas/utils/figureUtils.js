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
  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  if (style.props.lineColor instanceof Object) {
    style.props.lineColor.points.x1 ??= x1;
    style.props.lineColor.points.y1 ??= y1;
    style.props.lineColor.points.x2 ??= x2;
    style.props.lineColor.points.y2 ??= y2;

    const gradient = ctx.createLinearGradient(
      style.props.lineColor.points.x1,
      style.props.lineColor.points.y1,
      style.props.lineColor.points.x2,
      style.props.lineColor.points.y2
    );

    style.props.lineColor.colorStop.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    ctx.strokeStyle = gradient;
  } else {
    ctx.strokeStyle = lineColor ?? defaultStrokeColor;
  }
  ctx.lineWidth = lineWidth ?? defaultWidth;

  if (lineWidth !== 0) {
    ctx.stroke();
  }
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

  ctx.beginPath();
  ctx.rect(x, y, width, height);

  style.props.filter ??= 'none';
  ctx.filter = style.props.filter;

  if (style.props.fillColor instanceof Object) {
    style.props.fillColor.points.x1 ??= x;
    style.props.fillColor.points.y1 ??= y;
    style.props.fillColor.points.x2 ??= x + width;
    style.props.fillColor.points.y2 ??= y;

    const gradient = ctx.createLinearGradient(
      style.props.fillColor.points.x1,
      style.props.fillColor.points.y1,
      style.props.fillColor.points.x2,
      style.props.fillColor.points.y2
    );

    style.props.fillColor.colorStop.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = fillColor ?? defaultFillColor;
  }
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;

  if (strokeWidth !== 0) {
    ctx.stroke();
  }
  ctx.closePath();
};

export const drawTriangle = (ctx, style) => {
  let {
    vertex1,
    vertex2,
    vertex3,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

  style.props.filter ??= 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.closePath();

  if (style.props.fillColor instanceof Object) {
    style.props.fillColor.points.x1 ??= Math.min(vertex1.x, vertex2.x, vertex3.x);
    style.props.fillColor.points.y1 ??= vertex1.y;
    style.props.fillColor.points.x2 ??= Math.max(vertex1.x, vertex2.x, vertex3.x);
    style.props.fillColor.points.y2 ??= vertex1.y;

    const gradient = ctx.createLinearGradient(
      style.props.fillColor.points.x1,
      style.props.fillColor.points.y1,
      style.props.fillColor.points.x2,
      style.props.fillColor.points.y2
    );

    style.props.fillColor.colorStop.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = fillColor ?? defaultFillColor;
  }
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;

  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.moveTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.moveTo(vertex3.x, vertex3.y);
  ctx.lineTo(vertex1.x, vertex1.y);
  if (strokeWidth !== 0) {
    ctx.stroke();
  }
};

export const drawOval = (ctx, style) => {
  let {
    x,
    y,
    radiusX,
    radiusY,
    props: { fillColor, strokeColor, strokeWidth },
  } = style;

  style.props.filter ??= 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);

  if (style.props.fillColor instanceof Object) {
    style.props.fillColor.points.x1 ??= x - radiusX;
    style.props.fillColor.points.y1 ??= y;
    style.props.fillColor.points.x2 ??= x + radiusY;
    style.props.fillColor.points.y2 ??= y;

    const gradient = ctx.createLinearGradient(
      style.props.fillColor.points.x1,
      style.props.fillColor.points.y1,
      style.props.fillColor.points.x2,
      style.props.fillColor.points.y2
    );

    style.props.fillColor.colorStop.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = fillColor ?? defaultFillColor;
  }
  ctx.fill();

  ctx.strokeStyle = strokeColor ?? defaultStrokeColor;
  ctx.lineWidth = strokeWidth ?? defaultWidth;

  if (strokeWidth !== 0) {
    ctx.stroke();
  }
  ctx.closePath();
};
