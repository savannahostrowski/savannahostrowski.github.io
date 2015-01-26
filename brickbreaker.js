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
var rowcolors = ['#843800', '#3AE4A00', '#D65B00', '#FC7C1D', '#FF9A50'];
var paddlecolor = '#1F160D';
var ballcolor = '#1F160D';
var backcolor = '#C1B0A0';
var score = 0;

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

//when the left or right arrow is pressed, the paddle will move
function onKeyDown(evt){
	if (evt.keyCode === 39) rightDown = true;
	else if (evt.keyCode === 37) leftDown = true;
}

//when the left or right arrow is not pressed, the paddle will not move
function onKeyUp(evt){
	if (evt.keyCode === 39) rightDown = false;
	else if (evt.keyCode === 37) leftDown = false;
}

//function calls for the onKeyDown and onKeyUp events
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


// mouse functionality to move paddle
function onMouseMove(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX){
		paddlex = Math.max(evt.pageX - canvasMinX - (paddlew / 2), 0 ); 
		paddlex = Math.min(WIDTH - paddlew, paddlex);
	}
}

//function call to use mouse for paddle navigation
$(document).mousemove(onMouseMove);

function init_mouse(){
	canvasMinX = $(canvas).offset().left;
	canvasMaxX = canvasMinX + WIDTH; // the max is canvas min plus its width
}

//initializes bricks
function init_bricks(){
	bricks = new Array(NROWS); // creates a new array for the rows
	for (i=0; i < NROWS; i++){
		bricks[i] = new Array(NCOLS); // creates a new array with rows for col
		for (j=0; j < NCOLS; j++){
			bricks[i][j] = 1;
		}
	}
}

//draws and colours bricks
function drawbricks() {
  for (i=0; i < NROWS; i++) {
    context.fillStyle = rowcolors[i];
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        drawRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT); // giving dimensions to bricks
      }
    }
  }
}
// hide mouse when on canvas
function hideMouse(){
	document.getElementById('Canvas').style.cursor = "none";
}

//function call for hidding mouse
hideMouse();

//move the paddle if left or right is currently pressed and stop when paddle reaches edge of canvas
function paddlemovement(){
  if (rightDown && paddlex + paddlew < 500){
  	paddlex += 4;
 };
  if (leftDown && paddlex > 0){
    paddlex -= 4;
};
}

// defines brick dimensions
function brickDimensions(){
	rowheight = BRICKHEIGHT + PADDING; //the height of a row is 15 plus the padding of 1 per brick
	colwidth = BRICKWIDTH + PADDING; // the width / number of columns in the canvas - 1 plus the padding
	row = Math.floor(y / rowheight); 
	col = Math.floor(x / colwidth);
}

function objFill(){
	context.fillStyle = backcolor;
	clear();
	context.fillStyle = ballcolor;
	drawCircle(x, y, ballr);
	context.fillStyle = paddlecolor;//fills in the paddle
    drawRect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

}
//adds to the score
function addScore(){
	console.log(score += 10);
}

// End of Library Code

// creates ball and bricks in canvas
function draw() {
	objFill(); // draws ball, and paddle and gives colour to ball, bricks, paddle and background of canvas
	paddlemovement(); //dictates the paddle's movement speed and parameters
  	drawbricks(); // draws the bricks using arrays for the rows and columns
  	brickDimensions(); //gives brick dimensions

//reverse the ball's direction and 'smash' the brick
if  (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
	dy = -dy; // ball change directions in y
	bricks[row][col] = 0;
	addScore();


}
  if (x + dx > WIDTH || x + dx < 0) // if ball hits a wall on the canvas
    dx = -dx; //ball change direction in x


  if (y + dy < 0) // if ball hits the paddle
    dy = -dy; //ball change direction in y

  else if (y + dy > HEIGHT - paddleh) {
    if (!(x + ballr < paddlex || x - ballr > (paddlex + paddlew))) { // stops paddle at the edges of the canvas
    	dx = 8 * ((x-(paddlex + paddlew / 2)) / paddlew);
        dy = -dy; //ball change direction in y
    }
    else if (y + dy + ballr > HEIGHT)
      //game over, so stop the animation (ball halts movement)
      clearInterval(intervalId);
      return "Game Over!"
  }
 
  x += dx; 
  y += dy;
};

// reset game using space bar once game has been lost
function reset(evt){
	if ( y + dy + ballr > HEIGHT && evt.keyCode === 32){
		clearInterval(intervalId);
		init();
		init_mouse();
		init_bricks();
		dx = 1.5;
		dy = -4;
		score = 0;


	}
}

$(document).keyup(reset); 

init();
init_mouse();
init_bricks();





