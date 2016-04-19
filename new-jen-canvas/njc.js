var char;
var obA;

function start() { // initiates game
    char = new component(15, 15, "#fa8940", 250, 265); 
    obA = new component(200, 200, "red", 100, 100); 
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
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
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
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        // canvas spawns a duplicate char to its own properties
        ctx.restore();
        
        // canvas is restored to its last save but new char remains
    }
    this.posXY = function() {
        this.angle += this.angleInc * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);        
    }  
    this.altPos = function() {
        this.angle += this.angleInc * Math.PI / 180;
    }  
    this.crashWith = function(otherobj) {
        var myleft = this.x - (this.width / 2);
        var myright = this.x + (this.width);
        var mytop = this.y - (this.height / 2);
        var mybottom = this.y + (this.height / 2);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width / 2);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height / 2);
        var crash = true;
        if ((mytop > otherbottom) || (myleft > otherright) || (myright < otherleft) || (mybottom < othertop)) {
            crash = false;
        }
        return crash;/*
        var myleft = this.x - (this.width / 2);
        var myright = this.x + (this.width / 2);
        var mytop = this.y - (this.height / 2);
        var mybottom = this.y + (this.height / 2);
        var objleft = obj.x - (obj.width / 2);
        var objright = obj.x + (obj.width / 2);
        var objtop = obj.y - (obj.height / 2);
        var objbottom = obj.y + (obj.height / 2);
        var crash = true;
        if ((myleft < objleft) && (myright > objright) && (mytop > objtop) && (mybottom < objbottom)) {
            crash = false;
        }
        return crash;*/
    }
}

var inc = 0; // angleInc's increment
var angleSpeed = 0;

function updateArea() {
    if (char.crashWith(obA)) {
        area.clear(); // so no duplicate char
        obA.posXY();
        obA.posDeg();   
        char.angleInc = 0;
        char.speed = 3;
        if (area.keys && area.keys[32]) {
            angleSpeed = 3 + inc;
            char.angleInc = angleSpeed;
            inc += 0.1; // the longer area.keys[32], the faster char spins
        } else if (angleSpeed > 0) {
            inc = 0;
            angleSpeed -= 1;
            char.angleInc = angleSpeed;
        } 
        char.posDeg(); // updates rotation factor
        char.altPos(); // updates rotation orientation
    } else { 
        area.clear(); // so no duplicate char
        obA.posXY();
        obA.posDeg();   
        char.angleInc = 0;
        char.speed = 3;
        if (area.keys && area.keys[32]) {
            angleSpeed = 3 + inc;
            char.angleInc = angleSpeed;
            inc += 0.1; // the longer area.keys[32], the faster char spins
        } else if (angleSpeed > 0) {
            inc = 0;
            angleSpeed -= 1;
            char.angleInc = angleSpeed;
        } 
        char.posXY(); // updates 2d location  
        char.posDeg(); // updates rotation factor
    }
}

window.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};
