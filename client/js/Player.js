class Player {
  constructor(id, name, x, y, w, h) {
    this.id = id;
    this.name = name;
    this.coordX = x;
    this.coordY = y;
    this.width = w;
    this.height = h
  }
  draw = function (ctx) {
    ctx.fillRect(this.coordX, this.coordY, this.width, this.height)
  }
}

