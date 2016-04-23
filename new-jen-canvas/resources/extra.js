// scaling
this.scaleto = function() {
    ctx = area.context;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.scale(2,2);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
    area.stop();
}

// zooming
this.distance = function(obj) {
    var diffX = this.x - obj.x;
    var diffY = this.y - obj.y
    return (this.x - obj.x) + (this.y - obj.y);
}

if (char.distance(ob) < 100 && char.distance(ob) > -100) {
    can = document.getElementById('canvas');
    can.style.transitionDuration = "3s";
    can.style.transform = "scale(3,3)";
} else {
    can = document.getElementById('canvas');
    can.style.transitionDuration = "3s";
    can.style.transform = "scale(1,1)";
}
document.getElementById('tracker').innerHTML = char.distance(ob);