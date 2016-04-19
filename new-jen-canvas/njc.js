var char;
var ob1, ob2, ob3, ob4, ob5;

function start() { // initiates game
    char = new component(15, 15, "#fa8940", 20, 265); 
    ob1 = new component(120, 80, "red", 0, 480);
    area.start();
}

var area = { // setting up canvas and its properties
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 560;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateArea, 20); 
        // keyboard stuff
        window.addEventListener('keydown', function (e) {
            area.keys = (area.keys || []);
            area.keys[e.keyCode] = (e.type == 'keydown');
        })
        window.addEventListener('keyup', function (e) {
            area.keys[e.keyCode] = (e.type == 'keydown');
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    }
}

function component(width, height, color, x, y, type) {
    this.type = type; // for images
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    } 
    this.width = width;
    this.height = height;
    this.x = x; // x pos
    this.y = y; // y pos
    this.angle = Math.PI/2;  // in radians
    this.speed = 0; // character speed
    this.angleInc = 0; // how much angle increments by
    this.posDeg = function() {
        ctx = area.context;
        ctx.save(); // saves the entire canvas
        // canvas receives char properties (loc, deg, color)
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        }
        // canvas spawns a duplicate char to its own properties
        ctx.restore();
        // canvas is restored to its last save but new char remains
    }
    this.posXY = function() {
        this.angle += this.angleInc * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);        
    }    
}

var inc = 0; // angleInc's increment
var angleSpeed = 0;

function updateArea() {
    area.clear(); // so no duplicate char
    char.angleInc = 0;
    char.speed = 1;
    if (area.keys && area.keys[32]) {
        angleSpeed = 3 + inc;
        char.angleInc = angleSpeed;
        inc += 0.1; // the longer area.keys[32], the faster char spins
        
    } else if (angleSpeed > 0) {
        inc = 0;
        angleSpeed /= 2;
        char.angleInc = angleSpeed;
    } 
    /* 
    alternate controls:
    reg rotation: (左(37,+angleInc), 右(39,-angleInc), 上(40,-speed), 下(38,+speed))
    */
    char.posXY(); // updates 2d location  
    char.posDeg(); // updates rotation factor
}

window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};