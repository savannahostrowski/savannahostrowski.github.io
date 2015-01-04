// to get reference to the canvas
var ctx = $('#canvas')[0].getctx("2d");

// to create ball
ctx.beginPath();
ctx.arc(75, 75, 10, 10, Math.PI * 2, true);
ctx.closePath();
ctx.fill();

// to make the rectangle half transparent
ctx.fillStyle = 'green'
ctx.beginPath();
ctx.rect(15, 150, 120, 120);
ctx.closePath();
ctx.fill();

//to create a moving ball
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var context;

function init() {
	ctx = $('#canvas')[0].getContext("2d");
	return setInterval(draw, 10);
}

function draw() {
	ctx.clearRect(0, 0, 300, 300);
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	x += dx;
	y += dy;
}

init();








