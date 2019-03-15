var params = ["150", "mirror", "convex", "200", "300"];
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

document.getElementById("btn").onclick = (function(e) {
  c.clearRect(0,0,canvas.width,canvas.height);
  selects = document.getElementsByTagName("select");
  for(var i = 0; i < selects.length; i++) {
    params[i] = (selects[i].value);
  }
  //center line-----------------------------------------------------------------
  c.beginPath();
  c.moveTo(canvas.width, canvas.height / 2);
  c.lineTo(0, canvas.height / 2);
  c.stroke();
  //main------------------------------------------------------------------------
  var a = new Arrow(params[0], canvas.width / 2 - params[4], canvas.height / 2);
  c.beginPath();
  a.drawArrow();
//concave mirror----------------------------------------------------------------
  if (params[1] == "mirror" && params[2] == "concave"){
    var concaveM = new ConcaveMirror(params[3], canvas.width / 2, canvas.height / 2, a);
    c.beginPath();
    concaveM.drawMirror();
    concaveM.drawFocalPoint();
    concaveM.drawLines();
    concaveM.drawImage();
  }//convex mirror--------------------------------------------------------------
  else if (params[1] == "mirror" && params[2] == "convex"){
    var convexM = new ConvexMirror(params[3], canvas.width / 2, canvas.height / 2, a);
    c.beginPath();
    convexM.drawMirror();
    convexM.drawFocalPoint();
    convexM.drawLines();
    convexM.drawImage();
  }//concave lens---------------------------------------------------------------
  else if(params[1] == "lens" && params[2] == "concave") {
    var concavel = new ConcaveLens(params[3], canvas.width / 2, canvas.height / 2, a);
    c.beginPath();
    concavel.drawLens();
    concavel.drawFocalPoint();
    concavel.drawLines();
    concavel.drawImage();
  }//convex lens----------------------------------------------------------------
  else if(params[1] == "lens" && params[2] == "convex") {
    var convexl = new ConvexLens(params[3], canvas.width / 2, canvas.height / 2, a);
    c.beginPath();
    convexl.drawLens();
    convexl.drawFocalPoint();
    convexl.drawLines();
    convexl.drawImage();
  }
});
