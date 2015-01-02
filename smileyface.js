var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;



function drawCircle(centerX, centerY, radius, fillColour, outlineColour, endAngle){
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, endAngle, false);
	context.fillStyle = fillColour;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = outlineColour;
	context.stroke();
}

function drawSmiley(centerX, centerY){
	
	drawCircle(centerX, centerY, 120, 'yellow', 'black', 2 * Math.PI);
	drawCircle((centerX + 40), (centerY - 40), 10, 'black', 'black', 2 * Math.PI);
	drawCircle((centerX - 40), (centerY - 40), 10, 'black', 'black', 2 * Math.PI);
	drawCircle(centerX, (centerY + 40), 50, 'black', 'black', Math.PI);

}

drawSmiley(100, 100);
drawSmiley(2, 20);
drawSmiley(30, 30);
