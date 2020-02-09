
const canvas = document.getElementById('canvas');
const iterationNumber = document.getElementById('iterationNumber');
iterationNumber.value = 6
var ctx = canvas.getContext('2d');
const windowWidth = document.documentElement.clientWidth 
const windowHeight = document.documentElement.clientHeight 
var smooth
let sierpinski = new Sierpinski(+iterationNumber.value, 3);
function changeLevel(ev) {
  sierpinski.renderLevel = +ev.value
}
function changeSmooth(ev) {
  console.log(ev.checked)
  smooth = ev.checked
  changeDepth({ value: sierpinski.iterationNumber })
}

function changeColor(ev) {
  sierpinski.offsetHSL = +ev.value
}

function changeDepth(ev) {
  if (+ev.value > 8 ) iterationNumber.value = 8
  sierpinski = new Sierpinski(+iterationNumber.value, sierpinski.renderLevel);
}

function step() {
  sierpinski.refresh(zoom)
  requestAnimationFrame(step);
}

requestAnimationFrame(step);

