/* game init */

var char;

function startGame() {
    // upper left: (0,0)
    char = new component(30, 30, 5, 265, "#f89406");
    area.start();
}

var area = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 560;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = area.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    } 
}

function update() {
    area.clear();
    char.newPos();
    char.update();
}

function moveup() {
    char.speedY -= 1; 
}

function movedown() {
    char.speedY += 1; 
}

function moveleft() {
    char.speedX -= 1;
}

function moveright() {
    char.speedX += 1;
}

function stopMove() {
    char.speedX = 0;
    char.speedY = 0; 
}