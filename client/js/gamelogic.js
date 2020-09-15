// 
//   Variables 
// 

// canvas object and size configuration.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
resizeCanvas();


// hides the mouse cursor when it hovers the body section of the page.
document.body.style.cursor = 'none';


//  - - - - - - - - - - - - - - - - - - - - - - - - -
// 
//   Objects 
// 
//  - - - - - - - - - - - - - - - - - - - - - - - - -

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
    this.spdX = 10 * d;
    this.spdY = 2;
    this.draw();
  }

};

//  Player 1  Module  from Player.js
var player1 = new Player(1, "tillo", 50, 300, 10, 300);
player1.draw(ctx);

var player2 = new Player(2, "Gorda", (window.innerWidth - 50), 300, 10, 300);
player2.draw(ctx);

var scoreP1 = new Score(window.innerWidth / 2 - 200, 50);
var scoreP2 = new Score(window.innerWidth / 2 + 100, 50);

//  - - - - - - - - - - - - - - - - - - - - - - - - -
// 
//   Functions 
// 
//  - - - - - - - - - - - - - - - - - - - - - - - - -

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function ballUpdate() {

  ball.coorX += ball.spdX;
  ball.coorY += ball.spdY;
  // ball.draw();

  if (ball.coorX > canvas.width) {

    scoreP1.scorePoint(ctx);

    ball.startPoint();

  }
  if (ball.coorX <= 0) {

    scoreP2.scorePoint(ctx);
    ball.startPoint();
  }
  if (ball.coorY > canvas.height) { ball.spdY = -10; }
  if (ball.coorY <= 0) { ball.spdY = 10; }

  checkCollition();

  clearCanvas();

  requestAnimationFrame(ballUpdate);

}

function checkCollition() {
  if ((
    ball.coorX <= player1.coordX &&
    ball.coorY >= player1.coordY &&
    ball.coorY <= (player1.coordY + player1.height))) {
    if (ball.coorX > 0) {
      ball.spdX += 20;
    }
  }

  if ((
    ball.coorX >= player2.coordX &&
    ball.coorY >= player2.coordY &&
    ball.coorY <= (player2.coordY + player2.height))) {
    ball.spdX -= 20;
    // if (!(ball.coorX > window.innerWidth)) {
    //   ball.spdX -= 20;
    // }
  }




}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  scoreP1.draw(ctx);
  scoreP2.draw(ctx);
  player1.draw(ctx);
  player2.draw(ctx);

  ctx.strokeRect(window.innerWidth / 2, 0, 0, window.innerHeight);
  ctx.fillStyle = "#ff0000";

}


//  - - - - - - - - - - - - - - - - - - - - - - - - -
// 
// Call functions
// 
//  - - - - - - - - - - - - - - - - - - - - - - - - -


ball.startPoint();

requestAnimationFrame(ballUpdate);

window.addEventListener("resize", function () {
  resizeCanvas();
});


// add event listener to window. It listens on mouse movements. e parameter contains values of mouse position

window.addEventListener('mousemove', e => {

  if (e.clientY <= 150 || e.clientY >= (innerHeight - player1.height / 2)) {
    (e.clientY <= 150) ? player1.coordY = 0 : player1.coordY = (innerHeight - player1.height)
  }

  if (e.clientY > (player1.height / 2) && e.clientY < (innerHeight - player1.height / 2)) {
    player1.coordY = e.clientY - player1.height / 2;
  }

});



window.addEventListener("keydown", key => {

  if (key.code == "KeyW") {
    player2.coordY -= 50;
    if (player2.coordY < 0) { player2.coordY = 0 }
  }
  if (key.code == "KeyS") {
    player2.coordY += 50;
    if (player2.coordY > (innerHeight - player2.height)) { player2.coordY = innerHeight - player2.height }
  }

  if (key.code == "KeyW" && key.shiftKey == true) {
    player2.coordY -= 150;
    if (player2.coordY < 0) { player2.coordY = 0 }
  }

  if (key.code == "KeyS" && key.shiftKey == true) {
    player2.coordY += 150;
    if (player2.coordY > (innerHeight - player2.height)) { player2.coordY = innerHeight - player2.height }
  }




}
);




