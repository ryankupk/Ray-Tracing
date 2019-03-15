//concave lens----------------------------------------------------------
function ConcaveLens(f, x, y, a){
	this.focalLength = parseInt(f);
	this.posx = x;
	this.posy = y;
	this.arrow = a;
	this.offset = 50;
	this.Radius = this.arrow.height*1.5;
	this.radius = 15;
	this.midpoint = this.posx + (this.offset / 2);

	this.drawLens = function(){
		c.translate(0, this.Radius);
		c.moveTo(this.posx, this.posy);
		c.lineTo(this.posx+this.offset, this.posy); //line to the right
		c.ellipse(this.posx+this.offset, this.posy-this.Radius, this.radius, this.Radius, 0, Math.PI/2, 3*Math.PI/2, false); //right ellipse
		c.lineTo(this.posx, this.posy-this.Radius*2); //top line to the left
		c.moveTo(this.posx, this.posy); //move back to origin
		c.ellipse(this.posx, this.posy-this.Radius, this.radius, this.Radius, 0, Math.PI/2, 3*Math.PI/2, true);//left ellipse
		c.strokeStyle = "black";
		c.stroke();
	}

	this.drawFocalPoint = function() {
		//draw focal point
		c.beginPath();
		c.translate(0, -this.Radius);
		c.strokeStyle = "black";
		c.strokeFill = "black";
		c.moveTo(this.midpoint, this.posy);
		c.arc(this.midpoint-this.focalLength, this.posy, 2.5, 0, Math.PI*2);
		c.arc(this.midpoint+this.focalLength, this.posy, 2.5, 0, Math.PI*2);
		c.fill();
	}

	this.drawLines = function() {
		//line straight across then away from focal point--------------------------------------------
		//straight across
		c.beginPath();
		c.strokeStyle = "red";
		c.moveTo(a.posx, a.posy-a.height);
		c.lineTo(this.midpoint, this.posy-a.height);
		c.stroke();
		//line away from focal point
		c.beginPath();
		c.moveTo(this.midpoint, this.posy - a.height);
		c.translate(this.midpoint, this.posy-a.height);
		var angle = Math.atan2((a.posy - a.height) - this.posy, this.midpoint - (this.midpoint - this.focalLength));
		var r = 10000;
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.lineTo(x, y);
		c.stroke();
		//dashed line reflected through focal point
		c.beginPath();
		c.setLineDash([5]);
		c.translate(-this.midpoint, -(this.posy - a.height));
		angle = angle + Math.PI;
		x = r * Math.cos(angle);
		y = r * Math.sin(angle);
		c.moveTo(this.midpoint, this.posy - a.height);
		c.translate(this.midpoint, this.posy - a.height);
		c.lineTo(x, y);
		c.translate(-this.midpoint, -(this.posy - a.height));
		c.stroke();
		c.setLineDash([]);

		//line straight through center------------------------------------------------------
		//line all the way through center
		c.beginPath();
		var angle = Math.atan2((a.posy - a.height) - this.posy, a.posx - (this.midpoint));
		angle = angle + Math.PI;
		var r = 10000;
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.moveTo(a.posx, a.posy-a.height);
		c.translate(a.posx, a.posy-a.height);
		c.lineTo(x, y);
		c.strokeStyle = "green";
		c.stroke();
		//line back through center to top left
		c.beginPath();
		c.translate(-a.posx, -(a.posy-a.height));
		c.moveTo(this.midpoint, this.posy);
		c.translate(this.midpoint, this.posy);
		c.lineTo(-x, -y);
		c.setLineDash([5]);
		c.stroke();
		c.translate(-this.midpoint, -this.posy);
		c.setLineDash([]);

		//line to far focal point and straight through-------------------------------------
		//line to opposite focal point
		c.beginPath();
		c.translate(a.posx, a.posy-a.height);
		c.moveTo(0, 0);
		var angle = Math.atan2((a.posy - a.height) - this.posy, a.posx - (this.midpoint + this.focalLength));
		var r = (1/Math.cos(angle)) * (this.midpoint - a.posx);
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.lineTo(x, y);
		//horizontal line at same height
		c.lineTo(10000, y);
		c.strokeStyle = "blue";
		c.stroke();
		//virtual line reflected off
		c.beginPath();
		c.setLineDash([5]);
		c.moveTo(x, y);
		c.lineTo(-10000, y);
		c.strokeStyle = "blue";
		c.stroke();

		// reset for next params
		c.translate(-a.posx, -(a.posy-a.height));
		c.strokeStyle = "black";
		c.setLineDash([]);
	}

	this.drawImage = function() {
		//calculate distance
		var objectDistance = this.midpoint - a.posx;
		var objectDistanceInverse = 1/objectDistance;
		var focalLengthInverse = 1/-this.focalLength;
		var imageDistanceInverse = objectDistanceInverse - focalLengthInverse;
		var imageDistance = 1/imageDistanceInverse;

		//calculate height
		var imageHeight;
		var objectHeight = a.height;
		imageHeight = -(imageDistance*objectHeight)/objectDistance;

		var imageArrow = new Arrow(-imageHeight, this.midpoint - imageDistance, canvas.height/2);
		imageArrow.drawArrow();
	}
}
