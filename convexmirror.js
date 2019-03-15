//convex mirror----------------------------------------------------------
function ConvexMirror(f, x, y, a){
	this.focalLength = parseInt(f);
	this.cof = 2 * this.focalLength; //center of curvature
	this.posx = x;
	this.posy = y;
	this.arrow = a;
	this.offset = 5;
	this.Radius = this.arrow.height*1.5;
	if (this.Radius < 30) this.Radius = 30;
	this.radius = 20;

	this.drawMirror = function(){
		c.translate(0, this.Radius);
		c.moveTo(this.posx, this.posy);
		c.lineTo(this.posx+this.offset/2, this.posy);
		c.lineTo(this.posx+this.offset/2, this.posy-this.Radius*2);
		c.lineTo(this.posx, this.posy-this.Radius*2);
		c.moveTo(this.posx, this.posy);
		c.ellipse(this.posx, this.posy-this.Radius, this.radius, this.Radius, 0, Math.PI/2, 3*Math.PI/2, false);
		c.strokeStyle = "black";
		c.fillStyle = "black";
		c.fill();
		c.stroke();
		c.restore();
	}

this.drawFocalPoint = function() {
		//draw focal point
		c.beginPath();
		c.translate(0, -this.Radius);
		c.strokeStyle = "black";
		c.strokeFill = "black";
		c.arc(this.posx+this.focalLength, this.posy, 2.5, 0, Math.PI*2);
		c.arc(this.posx+this.cof, this.posy, 2.5, 0, Math.PI*2);
		c.fill();
	}

this.drawLines = function() {
		//horizontal line reflected from focal point--------------------------------------------------------------------
		//line straight across
		c.beginPath();
		c.strokeStyle = "red";
		c.moveTo(a.posx, a.posy-a.height);
		c.lineTo(this.posx, a.posy-a.height);
		c.stroke();
		//dashed line to focal point
		c.beginPath();
		c.setLineDash([5]);
		c.moveTo(this.posx, a.posy - a.height);
		c.lineTo(this.posx + this.focalLength, this.posy);
		c.stroke();
		c.setLineDash([]);
		//line drawn away from focal point
		c.beginPath();
		var angle = Math.atan2((a.posy - a.height) - this.posy, this.posx - (this.posx + this.focalLength));
		var r = 10000; //doesn't matter, just  needs to go off screen
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.moveTo(this.posx, this.posy - a.height);
		c.translate(this.posx, this.posy-a.height);
		c.lineTo(x, y);
		c.stroke();
		c.translate(-this.posx, -(this.posy-a.height));

		//line to center and reflected across x-axis------------------------------------------------------------------------
		//line to center of mirror
		c.beginPath();
		c.setLineDash([]);
		var angle = Math.atan2((a.posy - a.height) - this.posy, a.posx - (this.posx));
		var r = (1/Math.cos(angle)) * (this.posx - a.posx);
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.moveTo(a.posx, a.posy - a.height);
		c.translate(a.posx, a.posy - a.height);
		c.lineTo(x, y);
		c.strokeStyle = "green";
		c.stroke();
		c.translate(-a.posx, -(a.posy - a.height));
		//reflected line
		c.beginPath();
		c.moveTo(this.posx, this.posy);
		c.translate(this.posx, this.posy);
		angle = -angle;
		var r = (1/Math.cos(angle)) * (this.posx);
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.lineTo(-x, -y);
		c.stroke();
		c.translate(-this.posx, -this.posy);
		//virtual line
		c.beginPath();
		c.moveTo(this.posx, this.posy);
		c.translate(this.posx, this.posy);
		var r = 1000;
		angle = angle + Math.PI;
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.setLineDash([5]);
		c.lineTo(x, y);
		c.stroke();
		c.setLineDash([]);
		c.translate(-this.posx, -this.posy);

		//line to cof-------------------------------------------------------------------------------
		//line to cof from top of arrow
		c.beginPath();
		c.moveTo(a.posx, a.posy - a.height);
		c.translate(a.posx, a.posy - a.height);
		var angle = Math.atan2((a.posy - a.height) - this.posy, a.posx - (this.posx + this.cof));
		var r = (1/Math.cos(angle)) * (a.posx - this.posx);
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.lineTo(-x, -y);
		c.strokeStyle = "blue";
		c.stroke();
		//virtual line to cof
		c.beginPath();
		c.moveTo(this.posx - a.posx, -y );
		c.lineTo(this.posx + this.cof - a.posx, this.posy - (a.posy - a.height));
		c.setLineDash([5]);
		c.strokeStyle = "blue";
		c.stroke();
		c.setLineDash([]);
		//line to top left off the screen
		c.beginPath();
		r = 10000;
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.moveTo(0, 0);
		c.lineTo(x, y);
		c.stroke();

		// reset for next params
		c.translate(-a.posx, -(a.posy-a.height));
		c.strokeStyle = "black";
		c.setLineDash([]);
}

this.drawImage = function() {
	//calculate distance
	var objectDistance = a.posx - this.posx;
	var objectDistanceInverse = 1/objectDistance;
	var focalLengthInverse = 1/-this.focalLength;
	var imageDistanceInverse = objectDistanceInverse + focalLengthInverse;
	var imageDistance = 1/imageDistanceInverse;

	//calculate height
	var imageHeight;
	var objectHeight = a.height;
	imageHeight = -(imageDistance*objectHeight)/objectDistance;

	var imageArrow = new Arrow(-imageHeight, this.posx - imageDistance, canvas.height/2);
	imageArrow.drawArrow();
}
}
