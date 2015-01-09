//Beginning of Library Code
var x = 25;
var y = 250;
var dx = 1.5;
var dy = -4;
var canvas = document.getElementById('Canvas');
var context;
var WIDTH;
var HEIGHT;
var intervalId = 0;
var paddlex; 
var paddleh = 7;
var paddlew = 60;
var rightDown = false;
var leftDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;

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

function onKeyDown(evt){
	if (evt.keyCode == 39) rightDown = true;
	else if (evt.keyCode = 37) leftDown = true;
}

function onKeyUp(evt){
	if (evt.keyCode == 39) rightDown = false;
	else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX){
		paddlex = evt.pageX - canvasMinX;
	}
}

$(document).mousemove(onMouseMove);

function init(){
	context = canvas.getContext('2d');
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	paddlex = WIDTH / 2;
	canvasMinX = $(canvas).offset();
	canvasMaxX = canvasMinX + WIDTH;
	intervalId = setInterval(draw, 10);
}

function init_mouse(){
	canvasMinX = $(canvas).offset().left;
	canvasMaxX = canvasMinX + WIDTH;
}

// End of Library Code
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function init_bricks(){
	NROWS = 5;
	NCOLS = 5;
	BRICKWIDTH = (WIDTH/NCOLS) - 1;
	BRICKHEIGHT = 15;
	PADDING = 1;

	bricks = new Array(NROWS);
	for (i=0; i < NROWS; i++){
		bricks[i] = new Array(NCOLS);
		for (j=0; j < NCOLS; j++){
			bricks[i][j] = 1;
		}
	}
}


function draw() {
  clear();
  drawCircle(x, y, 5);
  
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  drawRect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
  

  //rendering bricks
  for (i=0; i < NROWS; i++){
  	for (j=0; j < NCOLS; j++){
  		if (bricks[i][j] == 1){
  		drawRect ((j * (BRICKWIDTH + PADDING)) + PADDING,
  			(i * (BRICKHEIGHT + PADDING)) + PADDING,
  			BRICKWIDTH, BRICKHEIGHT);
  		}
  	}
}

//if brick is hit
rowheight = BRICKHEIGHT + PADDING;
colwidth = BRICKWIDTH + PADDING;
row = Math.floor(y / rowheight);
col = Math.floor(x / colwidth);

//reverse the ball's direction and 'smash' the brick
if  (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
	dy = -dy
	bricks[row][col] = 0;
}
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      //game over, so stop the animation
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();
init_mouse();
init_bricks();
