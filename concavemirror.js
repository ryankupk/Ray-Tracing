//concave mirror----------------------------------------------------------
function ConcaveMirror(f, x, y, a){
	this.focalLength = parseInt(f);
	this.posx = x;
	this.posy = y;
	this.arrow = a;
	this.offset = 60;
	this.Radius = this.arrow.height*1.5;
	this.radius = 15;

	this.drawMirror = function(){
		c.translate(-this.offset/2, this.Radius);
		c.moveTo(this.posx, this.posy);
		c.ellipse(this.posx, this.posy-this.Radius, this.radius, this.Radius, 0, Math.PI/2, 3*Math.PI/2, true);
		c.lineTo(this.posx+this.offset/2, this.posy-this.Radius*2);
		c.lineTo(this.posx+this.offset/2, this.posy);
		c.lineTo(this.posx, this.posy);
		c.strokeStyle = "black";
		c.fillStyle = "black";
		c.fill();
		c.stroke();
		c.translate(this.offset/2, 0);
	}

	this.drawFocalPoint = function() {
		//draw focal point
		c.beginPath();
		c.translate(0, -this.Radius);
		c.strokeStyle = "black";
		c.strokeFill = "black";
		c.arc(this.posx-this.focalLength, this.posy, 2.5, 0, Math.PI*2);
		//c.arc(this.posx+this.focalLength, this.posy, 2.5, 0, Math.PI*2); //second focal point, not needed
		c.fill();
	}

	this.drawLines = function() {
    // line straight to mirror through focal point------------------------------------------------------------------------
		//horizontal line to mirror
		c.beginPath();
		c.strokeStyle = "red";
	  var angle = Math.atan2(((a.posy - a.height) - (this.posy)), (this.posx) - (this.posx - this.focalLength));
    var r = -10000;
    var x = r * Math.cos(angle);
    var y = r * Math.sin(angle);
		c.moveTo(a.posx, a.posy-a.height);
		c.lineTo(this.posx , this.posy - a.height);
		c.stroke()
		//dashed line through focal point
		c.beginPath();
		c.moveTo(this.posx, this.posy - a.height);
		c.translate(this.posx , this.posy - a.height);
    c.lineTo(x, y);
		c.strokeStyle = "red";
		c.setLineDash([5]);
		c.stroke();
		c.setLineDash([]);
    // line to center of mirror and back------------------------------------------------------------------------------------
		//line to center of mirror
		c.beginPath();
		c.strokeStyle = "green";
		c.translate(-this.posx , -(this.posy - a.height));
		c.moveTo(a.posx, a.posy - a.height);
		c.lineTo(this.posx, this.posy);
		c.stroke();
		//line reflected across x axis back to the left
		c.beginPath();
		c.moveTo(this.posx, this.posy);
		c.translate(this.posx, this.posy);
		var angle = Math.atan2((a.posy - a.height) - this.posy, a.posx - this.posx);
		var r = 10000;
		//var r = (1/Math.sin(angle) * (a.posx - this.posx));
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		//No idea why this has to be negative
		c.lineTo(x, -y);
		c.setLineDash([5]);
		c.stroke();
		c.setLineDash([]);
		// Line through focal point then reflected straight back-------------------------------------------------------------------
		//line through focal point
		c.beginPath();
		c.strokeStyle = "blue";
		c.translate(-this.posx, -this.posy);
		c.moveTo(a.posx, a.posy - a.height);
		c.translate(a.posx, a.posy - a.height);
		var angle = Math.atan2(this.posy - (a.posy - a.height), (this.posx - this.focalLength) - a.posx);
		var r = (1/Math.cos(angle)) * (this.posx - a.posx);
		var x = r * Math.cos(angle);
		var y = r * Math.sin(angle);
		c.lineTo(x, y);
		c.stroke();
		//horizontal dashed line back to the left
		c.beginPath();
		c.moveTo(x, y);
		c.setLineDash([5]);
		c.lineTo(-a.posx, y);
		c.translate(-a.posx, -(a.posy - a.height));
		c.stroke();
		c.setLineDash([]);
		// reset for next params
		c.strokeStyle = "black";
		c.setLineDash([]);
	}

	this.drawImage = function() {

		//calculate distance
		var objectDistance = a.posx - this.posx;
		var objectDistanceInverse = 1/objectDistance;
		var focalLengthInverse = 1/this.focalLength;
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
