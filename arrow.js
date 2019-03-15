//arrow object-----------------------------------------------------------
function Arrow(h, x, y){
	this.height = h;
	this.posx = x;
	this.posy = y;

	this.drawArrow = function(){
		//I have no idea how this works but it's perfect
		c.strokeStyle = "black";
		c.beginPath();
		c.moveTo(this.posx, this.posy);
		c.lineTo(this.posx, this.posy-this.height);
		c.stroke();
		c.beginPath();
		c.moveTo(this.posx, this.posy - this.height);
		c.lineTo(this.posx-(.20*this.height), this.posy-(.6*this.height));
		c.stroke();
		c.beginPath();
		c.moveTo(this.posx, this.posy-this.height);
		c.lineTo(this.posx+(.20*this.height), this.posy-(.6*this.height));
		c.stroke();
	}
}
