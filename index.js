
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const nbIteration = document.getElementById('nbIteration');
nbIteration.value = 10;

const Sierpinski = function () {
  this.currentXY = {x: 0, y: 0};
  this.bg = [
    { x: 0, y: 0 },
    { x: 800, y: 0 },
    { x: 400, y: 800 }
  ];
  this.initial = [this.bg];
  this.nbIteration = 0;
  this.triangleToDraw = [];
};

Sierpinski.prototype.reinitCanvas = function () {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.beginPath();
  ctx.moveTo(0, this.bg[0].y);
  ctx.lineTo(this.bg[1].x, this.bg[1].y);
  ctx.lineTo(this.bg[2].x, this.bg[2].y);
  ctx.fill();
  console.log('hey');
  // ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);
  // ctx.rotate(180 * Math.PI / 180);
};

Sierpinski.prototype.next = function () {
  this.reinitCanvas();
  const saveTriangle = [];
  for (let i = 0; i < this.initial.length; i++) {
    const triangle = this.initial[i];
    const width = triangle[1].x - triangle[0].x;
    const firstTriangle = [
      { x: triangle[0].x, y: triangle[0].y },
      { x: triangle[0].x + width / 2, y: triangle[0].y },
      { x: triangle[0].x + width / 4, y: triangle[2].y / 2 }
    ];
    const secondTriangle = [
      { x: triangle[0].x + width / 2, y: triangle[0].y },
      { x: triangle[0].x + width, y: triangle[0].y },
      { x: triangle[0].x + width / 1.3333, y: triangle[0].y + width / 2 }
    ];
    const thirdTriangle = [
      { x: triangle[0].x + width / 4, y: triangle[0].y + width / 2 },
      { x: triangle[0].x + width / 1.33333, y: triangle[0].y + width / 2 },
      { x: triangle[0].x + width / 2, y: triangle[0].y + width }
    ];

    saveTriangle.push(firstTriangle, secondTriangle, thirdTriangle);
    this.triangleToDraw.push([
      { x: firstTriangle[1].x, y: firstTriangle[1].y },
      { x: secondTriangle[2].x, y: secondTriangle[2].y },
      { x: thirdTriangle[0].x, y: thirdTriangle[0].y }
    ]);
  }

  this.triangleToDraw.map(triangle => {
    this.drawTriangle(triangle);
  });
  this.initial = saveTriangle;
};

Sierpinski.prototype.drawTriangle = function (triangle, color = 'red') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(triangle[0].x, triangle[0].y);
  ctx.lineTo(triangle[1].x, triangle[1].y);
  ctx.lineTo(triangle[2].x, triangle[2].y);
  ctx.fill();
};

Sierpinski.prototype.calculation = function (nbIteration) {
  sierpinski.triangleToDraw = [];
  sierpinski.initial = [this.bg];
  console.log(nbIteration);
  for (let i = 0; i < nbIteration; i++) {
    sierpinski.next();
  }
};

const sierpinski = new Sierpinski();
sierpinski.calculation(10);

nbIteration.addEventListener('change', ({target}) => {
  if (target.value > 10) return;
  sierpinski.calculation(target.value);
});
