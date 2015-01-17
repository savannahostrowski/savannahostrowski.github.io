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
var bricks;
var NROWS = 5;
var NCOLS = 7;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 1;
var ballr = 8;
var rowcolors = ['green', 'red', 'purple', 'yellow', 'orange'];
var paddlecolor = 'black';
var ballcolor = 'black';
var backcolor = 'grey';

// initializes the functions to draw bricks and ball
function init(){
	context = canvas.getContext('2d');
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	paddlex = WIDTH / 2;
	BRICKWIDTH = (WIDTH / NCOLS) - 1;
	canvasMinX = $(canvas).offset().left;
	canvasMaxX = canvasMinX + WIDTH;
	intervalId = setInterval(draw, 10);
}

// used to render the ball's shape
function drawCircle(x, y, r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
}

// used to render the paddle's shape
function drawRect(x, y, w, h){
	context.beginPath();
	context.rect(x, y, w, h);
	context.closePath();
	context.fill();
}

//used to ensure that the ball's path is erased as it moves
function clear(){
	context.clearRect(0, 0, canvas.height, canvas.width);
	drawRect(0, 0, WIDTH, HEIGHT);
}

//key pad functionality to move paddle
function onKeyDown(evt){
	if (evt.keyCode === 39) rightDown = true;
	else if (evt.keyCode === 37) leftDown = true;
}

function onKeyUp(evt){
	if (evt.keyCode === 39) rightDown = false;
	else if (evt.keyCode === 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

// mouse functionality to move paddle
function onMouseMove(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX){
		paddlex = Math.max(evt.pageX - canvasMinX - (paddlew / 2), 0 );
		paddlex = Math.min(WIDTH - paddlew, paddlex);
	}
}

$(document).mousemove(onMouseMove);

function init_mouse(){
	canvasMinX = $(canvas).offset().left;
	canvasMaxX = canvasMinX + WIDTH;
}

//creates bricks
function init_bricks(){
	bricks = new Array(NROWS);
	for (i=0; i < NROWS; i++){
		bricks[i] = new Array(NCOLS);
		for (j=0; j < NCOLS; j++){
			bricks[i][j] = 1;
		}
	}
}

function drawbricks() {
  for (i=0; i < NROWS; i++) {
    context.fillStyle = rowcolors[i];
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        drawRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}
// hide mouse when on canvas
function hideMouse(){
	document.getElementById('Canvas').style.cursor = "none";
}

hideMouse();

// End of Library Code

// creates ball and bricks in canvas
function draw() {
	context.fillStyle = backcolor;
	clear();
	context.fillStyle = ballcolor;
	drawCircle(x, y, ballr);

//move the paddle if left or right is
// currently pressed and stop when paddle reaches edge of canvas
  if (rightDown && paddlex + paddlew < 500){
  	paddlex += 4;
 };
  if (leftDown && paddlex > 0){
    paddlex -= 4;
};

  context.fillStyle = paddlecolor;
  drawRect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  drawbricks();

  //if brick is hit
rowheight = BRICKHEIGHT + PADDING;
colwidth = BRICKWIDTH + PADDING;
row = Math.floor(y / rowheight);
col = Math.floor(x / colwidth);

//reverse the ball's direction and 'smash' the brick
if  (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
	dy = -dy;
	bricks[row][col] = 0;
}
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT - paddleh) {
    if (!(x + ballr < paddlex || x - ballr > (paddlex + paddlew))) {
    	dx = 8 * ((x-(paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
    }
    else if (y + dy + ballr > HEIGHT)
      //game over, so stop the animation (ball halts movement)
      clearInterval(intervalId);
  }
 
  x += dx; 
  y += dy;
}

// reset game using space bar once game has been lost
function reset(evt){
	if ( y + dy + ballr > HEIGHT && evt.keyCode === 32){
		clearInterval(intervalId);
		init();
		init_mouse();
		init_bricks();
		dx = 1.5;
		dy = -4;


	}
}

$(document).keyup(reset); 

init();
init_mouse();
init_bricks();





