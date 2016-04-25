/*

ideas:
- on completing the mission, background changes traffic-light green
- zooming in tutorial (zoom functions located in extra.js)

in progress:
- zoom in and slice (zoom.js)
    - (finished) zoom in the canvas 
    - zoom in on a specific point
    - issue: square root
    - (working) slash rotation

!* TAB-TAB after a tag will automatically close it *!

*/
var char;
var ob;

function start() { // initiates game
    ob = new component(20, 20, "red", 400, 400); 
    ob2 = new component(20, 20, "blue", 300, 300)
    char = new component(15, 15, "#fa8940", 250, 265); 
    area.start();
}

var area = { // setting up canvas and its properties
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 560;
        this.canvas.id = 'canvas';
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
    },
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x; 
    this.y = y; 
    this.angle = Math.PI/2; 
    this.speed = 0; 
    this.angleInc = 0; 
    this.update = function() {
        ctx = area.context;
        ctx.save(); 
        // canvas receives char properties (loc, deg, color)
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        // canvas spawns a duplicate char to its own properties
        ctx.restore();
        // positioning
        this.angle += this.angleInc * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);   
    }  
    this.crashWith = function(otherobj) {
        var myleft = this.x - (this.width / 2);
        var myright = this.x + (this.width);
        var mytop = this.y - (this.height / 2);
        var mybottom = this.y + (this.height / 2);
        var otherleft = otherobj.x - (otherobj.width / 2);
        var otherright = otherobj.x + (otherobj.width / 2);
        var othertop = otherobj.y - (otherobj.height / 2);
        var otherbottom = otherobj.y + (otherobj.height / 2);
        var crash = true;
        if ((mytop > otherbottom) || (myleft > otherright) || (myright < otherleft) || (mybottom < othertop)) {
            crash = false;
        } 
        return crash;
    }
    this.follow = function(obj) {
        this.x = obj.x + 7;
        this.y = obj.y + 7;
        this.angle = obj.angle;
        this.angleInc = obj.angleInc;
        this.speed = obj.speed;
    }
    this.distance = function(obj) {
        var diffX = this.x - obj.x;
        var diffY = this.y - obj.y
        return (this.x - obj.x) + (this.y - obj.y);
    }
    this.throw = function(obj) {
        
    }
}

var inc = 0; // angleInc's increment
var angleSpeed = 0;
var obHandle = true;
var ob2Handle = true;
var thrown = false;

function turn() {
    char.angleInc = 0;
    char.speed = 3;
    if (area.keys && area.keys[32]) {
        angleSpeed = 3 + inc;
        char.angleInc = angleSpeed;
        inc += 0.1; 
    } else if (angleSpeed > 0) {
        inc = 0;
        angleSpeed -= 1;
        char.angleInc = angleSpeed;
    }
}
function updateArea() {
    area.clear();
    turn();
    char.update();
    if (char.crashWith(ob)) {
        if (obHandle) {ob.follow(char)} 
        if (area.keys && area.keys[83]) {obHandle = false} 
        if (area.keys && area.keys[68]) {obHandle = true} 
    } else if (char.crashWith(ob2)) {
        if (ob2Handle) {ob2.follow(char)} 
        if (area.keys && area.keys[83]) {ob2Handle = false} 
        if (area.keys && area.keys[68]) {ob2Handle = true} 
    } 
    ob.update();
    ob2.update();
}

// so space doesn't scroll the page
window.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};
