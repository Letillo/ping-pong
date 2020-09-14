class Score{

    constructor(pX, pY){

        this.coorX = pX;
        this.coorY = pY;
        this.points = 1
        this.fontSize = 25
        
    }

    draw = function (ctx) {
        ctx.font = this.fontSize+"px Arial";
        ctx.fillText('Score: ' + this.points, this.coorX, this.coorY);
      }

    scorePoint = function(ctx) {
        this.points++;
        this.draw(ctx);
    }

}