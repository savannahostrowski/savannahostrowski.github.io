var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');
//var centerX = canvas.width / 2;
//var centerY = canvas.height / 2;

function drawCircle(centerX, centerY, radius, fillColour, outlineColour, endAngle) {
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, endAngle, false);
	context.fillStyle = fillColour;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = outlineColour;
	context.stroke();
}

function drawSmiley(centerX, centerY, radius) {	
	drawCircle(centerX, centerY, radius, 'yellow', 'black', 2 * Math.PI);
	drawCircle((centerX + (radius / 4)), (centerY - (radius / 4)), radius / 10, 'black', 'black', 2 * Math.PI);
	drawCircle((centerX - (radius / 4)), (centerY - (radius / 4)), radius / 10, 'black', 'black', 2 * Math.PI);
	drawCircle(centerX, (centerY + (radius / 4)), radius / 2, 'black', 'black', Math.PI);
}

drawSmiley(100, 100, 120);
drawSmiley(250, 250, 60);
drawSmiley(50, 50, 30);
drawSmiley(25, 25, 25);
