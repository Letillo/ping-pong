// 
//   Variables 
// 

// canvas object and size configuration.

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
resizeCanvas();


// hides the mouse cursor when it hovers the body section of the page.
document.body.style.cursor = 'none';


// 
//   Objects 
// 

var ball = {
  // key:"value",
  size: 20,
  color: "#FF0000",
  coorX: 0,
  coorY: 0,
  spdX: 20,
  spdY: 20,

  //fills rectangle with red color hexadecimals value

  clr: function () {
    ctx.clearRect(this.coorX, this.coorY, this.size, this.size);
  },

  draw: function () {
    ctx.fillRect(this.coorX, this.coorY, this.size, this.size);
    ctx.fillStyle = this.color;
  },

  startPoint: function () {
    this.clr();
    this.coorX = window.innerWidth / 2;
    this.coorY = Math.floor(Math.random() * window.innerHeight);
    // var d give direction. if positive goes to the right.
    var d = Math.round(Math.random());
    (d == 0) ? d = 1 : d = -1;
    this.spdX = 30 * d;
    this.spdY = 2;
    this.draw();
  }

};

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



// 
//   Functions 
// 


function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function ballUpdate() {
  ball.clr();
  // middle line field draw
  ctx.strokeRect(window.innerWidth / 2, 0, 0, window.innerHeight);
  ctx.fillStyle = "#ff0000";
  ball.coorX += ball.spdX;
  ball.coorY += ball.spdY;
  ball.draw();

  if (ball.coorX > canvas.width) { ball.spdX = -20; }
  if (ball.coorX <= 0) {
    drawScore(score.points)
    scorePoint();
    ball.startPoint();
  }
  if (ball.coorY > canvas.height) { ball.spdY = -20; }
  if (ball.coorY <= 0) { ball.spdY = 20; }

  checkCollition();

  if (ball.coorY > canvas.height) { ball.spdY = -20; }
  if (ball.coorY < 0) { ball.spdY = 20; }

  requestAnimationFrame(ballUpdate);

}

function updatePlayerPosition() {

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
  if ((ball.coorX <= player.x && ball.coorY >= player.y && ball.coorY <= (player.y + player.height))) {
    if (ball.coorX > 0) {
      ball.spdX += 20;
    }
  }
}



// 
// Call functions
// 



//update function
updatePlayerPosition();


ball.startPoint();

requestAnimationFrame(ballUpdate);

window.addEventListener("resize", function () {

  resizeCanvas();

});


// add event listener to window. It listens on mouse movements. e parameter contains values of mouse position

window.addEventListener('mousemove', e => {

  ctx.clearRect(player.x, player.y, player.width, player.height);
  player.y = e.clientY - 50;

  updatePlayerPosition();

});




