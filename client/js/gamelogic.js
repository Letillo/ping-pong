// 
//   Variables 
// 

// canvas object and size configuration.

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
resizeCanvas();

var x;
var y;
// ball speed
var spdX;
var spdY;

// player object. Values are set with DB values.

var player = {

  id: 0,
  name: "",
  position: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0

}

// keep track of player points and its coordinates
var score = {
  x: 200,
  y: 50,
  points: 1
};

player.x = 50;
player.y = 300;

player.width = 10;
player.height = 300;

// hides the mouse cursor when it hovers the body section of the page.
document.body.style.cursor = 'none';



// 
//   Functions 
// 


function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

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
  if (x <= 0) {
    drawScore(score.points)
    scorePoint();
    ballStartingPoint();
  }
  if (y > canvas.height) { spdY = -20; }
  if (y <= 0) { spdY = 20; }

  checkCollition();

  if (y > canvas.height) { spdY = -20; }
  if (y < 0) { spdY = 20; }

  requestAnimationFrame(ballUpdate);

}

function updatePlayerPosition() {
  //fills rectangle with red color hexadecimals value
  ctx.fillStyle = "#FF0000";
  //creates a rectangle on x and y position
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function scorePoint() {
  score.points++;
}

function drawScore() {
  ctx.clearRect(score.x, (score.y - 25), 150, 25);
  // ctx.fillRect(score.x, (score.y - 25), 150, 25);
  ctx.font = "25px Arial";
  ctx.fillText('Score: ' + score.points, score.x, score.y);
}

function checkCollition() {
  if ((x <= player.x && y >= player.y && y <= (player.y + player.height))) {
    if (x > 0) {
      spdX += 20;
    }
  }
}

// 
// Call functions
// 



//update function
updatePlayerPosition();

ballStartingPoint();
requestAnimationFrame(ballUpdate);

window.addEventListener("resize", function(){

    resizeCanvas();

});


// add event listener to window. It listens on mouse movements. e parameter contains values of mouse position

window.addEventListener('mousemove', e => {

  ctx.clearRect(player.x, player.y, player.width, player.height);
  player.y = e.clientY - 50;

  updatePlayerPosition();

});




