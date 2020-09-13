
// canvas object and size configuration.

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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


player.x = 10;
player.y = 300;

player.width = 10;
player.height = 300;


// hides the mouse cursor when it hovers the body section of the page.
document.body.style.cursor = 'none';

//calls update function
updatePlayerPosition();


function updatePlayerPosition (){

    //fills rectangle with red color hexadecimals value
    ctx.fillStyle = "#FF0000";    

    //creates a rectangle on x and y position

    ctx.fillRect(player.x,player.y,player.width,player.height);    

}

// add event listener to window. It listens on mouse movements. e parameter contains values of mouse position

window.addEventListener('mousemove', e => {    

    ctx.clearRect(player.x,player.y,player.width,player.height);
    player.y = e.clientY-50;
    
    updatePlayerPosition();
    
});

