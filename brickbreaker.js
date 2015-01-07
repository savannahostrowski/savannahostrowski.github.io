var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');

/*function drawCircle(centerX, centerY, radius, fillColour, outlineColour, endAngle) {
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
	context.fillStyle = fillColour;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = outlineColour;
	context.stroke();
}

function drawRect(){
	context.fillStyle = 'rgba(255, 255, 0, 0.5)';
	context.beginPath();
	context.rect(15, 150, 120, 120);
	context.closePath();
	context.fill();
}

drawCircle(25, 25, 10, 'green', 'black');
drawRect();*/

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var context;

function draw(){
  context.clearRect(0, 0, 300, 300);
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI*2, true); 
  context.closePath();
  context.fill();
  x += dx;
  y += dy;
}

function init(){
	context = canvas.getContext('2d');
	return setInterval(draw, 10);
}

init();

