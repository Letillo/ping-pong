var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// axis
var x;
var y;
// ball speed
var spdX;
var spdY;
// X axis width
canvas.width = window.innerWidth;
// Y axis height
canvas.height = window.innerHeight;

// ball starting point
function ballStartingPoint() {
  // X and Y coords
  x = window.innerWidth / 2;
  y = Math.floor(Math.random() * window.innerHeight)
  // var d give direction. if positive goes to the right.
  var d = Math.round(Math.random());
  (d == 0) ? d = 1 : d = -1;
  spdX = 30 * d;
  spdY = 2;
  // ball draw
  ctx.fillRect(x, y, 10, 10);
}

function ballUpdate() {
  // clear the previous ball point
  ctx.clearRect(x, y, 10, 10);
  // middle line field draw
  ctx.strokeRect(window.innerWidth / 2, 0, 0, window.innerHeight);
  ctx.fillStyle = "#ff0000";
  x += spdX;
  y += spdY;
  // ball draw
  ctx.fillRect(x, y, 10, 10);

  if (x > canvas.width) { spdX = -20; }
  if (x < 0) { spdX = 20; }
  if (y > canvas.height) { spdY = -20; }
  if (y < 0) { spdY = 20; }
}


ballStartingPoint();
setInterval(ballUpdate, 1000 / 30);

