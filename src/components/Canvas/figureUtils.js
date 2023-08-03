export const drawRectangle = (ctx, style) => {
  const { x, y } = style;
  const { width, height, fillColor, strokeColor, strokeWidth } = style.props;

  ctx.beginPath();
  ctx.rect(x, y, width, height);

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  if (strokeColor && strokeWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  ctx.closePath();
};

export const drawLine = (ctx, style) => {
  const { x1, y1, x2, y2 } = style;
  const { lineColor, lineWidth } = style.props;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  if (lineColor && lineWidth) {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
  }
  ctx.stroke();
  ctx.closePath();
};

export const drawTriangle = (ctx, style) => {
  const { vertex1, vertex2, vertex3 } = style.props;
  const { fillColor, strokeColor, strokeWidth, lineColor, lineWidth } = style.props;

  ctx.beginPath();
  ctx.moveTo(vertex1.x, vertex1.y);
  ctx.lineTo(vertex2.x, vertex2.y);
  ctx.lineTo(vertex3.x, vertex3.y);
  ctx.closePath();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  if (strokeColor && strokeWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  if (lineColor && lineWidth) {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(vertex1.x, vertex1.y);
    ctx.lineTo(vertex2.x, vertex2.y);
    ctx.moveTo(vertex2.x, vertex2.y);
    ctx.lineTo(vertex3.x, vertex3.y);
    ctx.moveTo(vertex3.x, vertex3.y);
    ctx.lineTo(vertex1.x, vertex1.y);
    ctx.stroke();
  }
};
