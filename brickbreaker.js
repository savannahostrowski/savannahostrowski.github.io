var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');

function drawCircle(centerX, centerY, radius, fillColour, outlineColour, endAngle) {
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
drawCircle(canvas.width / 2, canvas.height / 2, 25, 'red', 'black');
drawRect();

