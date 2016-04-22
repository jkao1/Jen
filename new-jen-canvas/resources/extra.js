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