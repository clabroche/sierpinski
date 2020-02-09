const colorinput = document.getElementById('colorinput');

function Sierpinski(nbIteration, renderLevel) {
  const size = windowWidth
  this.bg = {
    size: size * 2,
    origin: { x: 0, y: 0 },
    points: [
      { x: 0, y: 0 },
      { x: size, y: 0 },
      { x: size, y: size * 2 }
    ]
  };
  this.nbIteration = nbIteration;
  this.renderLevel = renderLevel;
  this.triangleToDraw = [];
  this.smooth = true;
  this.offsetHSL = 50
  this.calculation()
  this.refresh(1)
};

Sierpinski.prototype.reinitCanvas = function () {
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  let color
  if (this.renderLevel === 0) {
    color = `black`
  } else if (this.renderLevel === 1) {
    color = `black`
  } else if (this.renderLevel === 2 || this.renderLevel === 3) {
    color = ctx.createLinearGradient(0, 0, windowWidth, 0);
    color.addColorStop(0, `hsl(${0 + this.offsetHSL}, 70%, 39%)`);
    color.addColorStop(1, `hsl(${50 + this.offsetHSL}, 70%, 39%)`);
  }
  this.drawTriangle(this.bg.points, color)
};

Sierpinski.prototype.drawTriangle = function (triangle, color = 'red', zoom = 1) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(triangle[0].x * zoom, triangle[0].y * zoom);
  ctx.lineTo(triangle[1].x * zoom, triangle[1].y * zoom);
  ctx.lineTo(triangle[2].x * zoom, triangle[2].y * zoom);
  ctx.fill();
};

Sierpinski.prototype.calculation = function (nbIteration) {
  this.reinitCanvas()
  this.next();
};
Sierpinski.prototype.setSmooth = function (smooth) {
  this.smooth = smooth
}

Sierpinski.prototype.next = function (area = this.bg, depth = 0, isleft = true) {
  const triangle = [
    { x: area.origin.x + area.size / 4, y: area.origin.y + area.size / 2 },
    { x: area.origin.x + area.size / 2, y: area.origin.y },
    { x: area.origin.x + area.size / 4 * 3, y: area.origin.y + area.size / 2 },
  ]
  this.triangleToDraw.push(triangle)
  const area1 = {
    size: area.size / 2,
    origin: { x: area.origin.x, y: area.origin.y },
    points: [
      { x: 0, y: 0 },
      triangle[1],
      triangle[0],
    ]
  }
  const area2 = {
    size: area.size / 2,
    origin: { x: area.origin.x + area.size / 2, y: area.origin.y },
    points: [
      triangle[1],
      { x: area.size, y: 0 },
      triangle[2],
    ]
  }
  const area3 = {
    size: area.size / 2,
    origin: { x: area.origin.x + area.size / 4, y: area.origin.y + area.size / 2 },
    items: [
      triangle[0],
      triangle[2],
      { x: area.size / 2, y: area.size },
    ]
  }
  this.triangleToDraw.push(triangle)
  if (smooth) {
    if (depth < this.nbIteration + 8 && area.origin.x === 0 && area.origin.y === 0) {
      this.next(area1, depth + 1)
      this.next(area2, depth + 1)
      this.next(area3, depth + 1)
    }
  } else {
    if (depth < this.nbIteration) {
      this.next(area1, depth + 1)
      this.next(area2, depth + 1)
      this.next(area3, depth + 1)
    }
  }
};
let zoom = 1
Sierpinski.prototype.refresh = function () {
  if (zoom >= 2) {
    zoom = 1
  }
  zoom *= 1.01
  if (this.renderLevel === 3) {
    this.offsetHSL--
    if (this.offsetHSL <= 0) this.offsetHSL = 360
    colorinput.value = this.offsetHSL
  }
  this.reinitCanvas()
  for (let i = 0; i < this.triangleToDraw.length; i++) {
    const triangle = this.triangleToDraw[i];
    const position = triangle[0].x * zoom
    let color
    if (this.renderLevel === 0) {
      color = '#d93026'
    } else if (this.renderLevel === 1) {
      const hsl = position * 50 / (windowWidth / 2)
      color = `hsl(${hsl + this.offsetHSL}, 70%, 50%)`
    } else if (this.renderLevel === 2 || this.renderLevel === 3) {
      const hsl = position * 50 / (windowWidth / 2)
      color = ctx.createLinearGradient(triangle[0].x * zoom, triangle[0].y * zoom, triangle[1].x * zoom, triangle[1].y * zoom);
      color.addColorStop(0, `hsl(${hsl + this.offsetHSL}, 70%, 50%)`);
      color.addColorStop(1, `hsl(${hsl + this.offsetHSL + 20}, 70%, 50%)`);
    }
    this.drawTriangle(triangle, color, zoom)
  }
};
