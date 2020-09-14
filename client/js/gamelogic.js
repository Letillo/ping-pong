// 
//   Imports
// 


//  - - - - - - - - - - - - - - - - - - - - - - - - -


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

//  Player 1  Module  from Player.js
var player1 = new Player(1, "tillo", 50, 300, 10, 300);
player1.draw(ctx);

var player2 = new Player(2, "Gorda", (window.innerWidth - 50), 300, 10, 300);
player2.draw(ctx);

// score 
var score = {
  x: 200,
  y: 50,
  points: 1,
  draw: function () {
    ctx.font = "25px Arial";
    ctx.fillText('Score: ' + this.points, this.x, this.y);
  }
};

// 
//   Functions 
// 


function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function ballUpdate() {
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

  clearCanvas();


  requestAnimationFrame(ballUpdate);

}

function updatePlayerPosition() {

  //creates a rectangle on x and y position
  player1.draw(ctx);
  player2.draw(ctx);

}

function scorePoint() {
  score.points++;
}

function drawScore() {
  ctx.clearRect(score.x, (score.y - 25), 150, 25);
  // ctx.fillRect(score.x, (score.y - 25), 150, 25);

  score.draw();

}

function checkCollition() {
  if ((ball.coorX <= player1.coordX && ball.coorY >= player1.coordY && ball.coorY <= (player1.coordY + player1.height))) {
    if (ball.coorX > 0) {
      ball.spdX += 20;
    }
  }
}

function clearCanvas() {


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw();
  score.draw();
  player1.draw(ctx);
  player2.draw(ctx);

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

  ctx.clearRect(player1.coordX, player1.coordY, player1.width, player1.height);
  player1.coordY = e.clientY - 50;

  updatePlayerPosition();

});




