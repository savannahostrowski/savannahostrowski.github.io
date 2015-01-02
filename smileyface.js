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

function randomize(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var radius = 20;

drawSmiley(randomize(0, canvas.width), randomize(0, canvas.height), radius);
drawSmiley(randomize(0, canvas.width), randomize(0, canvas.height), radius);
drawSmiley(randomize(0, canvas.width), randomize(0, canvas.height), radius);
drawSmiley(randomize(0, canvas.width), randomize(0, canvas.height), radius);
drawSmiley(randomize(0, canvas.width), randomize(0, canvas.height), radius);