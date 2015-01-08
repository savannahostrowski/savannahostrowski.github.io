//Beginning of Library Code
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');

function init(){
	context = canvas.getContext('2d');
	return setInterval(draw, 10);
}

function drawCircle(x, y, r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
}

function drawRect(x, y, w, h){
	context.beginPath();
	context.rect(x, y, w, h);
	context.closePath();
	context.fill();
}

function clear(){
	context.clearRect(0, 0, canvas.height, canvas.width);
}
drawCircle(25, 25, 10, 'green', 'black');
drawRect();

// End of Library Code

function draw(){
	clear();
	drawCircle(x, y, 10);

	if (x + dx > canvas.width || x + dx < 0)
		dx = -dx
	if (y + dy > canvas.height || y + dy < 0)
		dy = -dy

x += dx;
y += dy;
}

init();
