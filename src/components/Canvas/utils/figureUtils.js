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

  if (style.props.lineColor instanceof Array) {
    style.props.lineColor[0].x1 = style.props.lineColor[0].x1 ?? x1;
    style.props.lineColor[0].y1 = style.props.lineColor[0].y1 ?? y1;
    style.props.lineColor[0].x2 = style.props.lineColor[0].x2 ?? x2;
    style.props.lineColor[0].y2 = style.props.lineColor[0].y2 ?? y2;

    const gradient = ctx.createLinearGradient(
      style.props.lineColor[0].x1,
      style.props.lineColor[0].y1,
      style.props.lineColor[0].x2,
      style.props.lineColor[0].y2
    );

    style.props.lineColor[1].forEach((stop) => {
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

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  if (style.props.fillColor instanceof Array) {
    style.props.fillColor[0].x1 = style.props.fillColor[0].x1 ?? x;
    style.props.fillColor[0].y1 = style.props.fillColor[0].y1 ?? y;
    style.props.fillColor[0].x2 = style.props.fillColor[0].x2 ?? x;
    style.props.fillColor[0].y2 = style.props.fillColor[0].y2 ?? y + height;

    const gradient = ctx.createLinearGradient(
      style.props.fillColor[0].x1,
      style.props.fillColor[0].y1,
      style.props.fillColor[0].x2,
      style.props.fillColor[0].y2
    );

    style.props.fillColor[1].forEach((stop) => {
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

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.closePath();

  if (style.props.fillColor instanceof Array) {
    style.props.fillColor[0].x1 = style.props.fillColor[0].x1 ?? vertex1.x;
    style.props.fillColor[0].y1 = style.props.fillColor[0].y1 ?? vertex1.y;
    style.props.fillColor[0].x2 = style.props.fillColor[0].x2 ?? vertex3.x;
    style.props.fillColor[0].y2 = style.props.fillColor[0].y2 ?? vertex3.y;

    const gradient = ctx.createLinearGradient(
      style.props.fillColor[0].x1,
      style.props.fillColor[0].y1,
      style.props.fillColor[0].x2,
      style.props.fillColor[0].y2
    );

    style.props.fillColor[1].forEach((stop) => {
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

  style.props.filter = style.props.filter ?? 'none';
  ctx.filter = style.props.filter;

  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);

  if (style.props.fillColor instanceof Array) {
    //Линейный
    style.props.fillColor[0].x1 = style.props.fillColor[0].x1 ?? x;
    style.props.fillColor[0].y1 = style.props.fillColor[0].y1 ?? y - radiusX;
    style.props.fillColor[0].x2 = style.props.fillColor[0].x2 ?? x;
    style.props.fillColor[0].y2 = style.props.fillColor[0].y2 ?? y + radiusX;

    //Радиальный
    // const gradient = ctx.createRadialGradient(x, y, 0, x, y, radiusX);

    const gradient = ctx.createLinearGradient(
      style.props.fillColor[0].x1,
      style.props.fillColor[0].y1,
      style.props.fillColor[0].x2,
      style.props.fillColor[0].y2
    );
    style.props.fillColor[1].forEach((stop) => {
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
