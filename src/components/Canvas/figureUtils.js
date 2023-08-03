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
