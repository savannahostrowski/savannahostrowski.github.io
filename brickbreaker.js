//Beginning of Library Code
var x = 25;
var y = 250;
var xDirection = 1.5;
var yDirection = -4;
var canvas = document.getElementById('Canvas');
var context;
var width;
var height;
var intervalDraw = 0;
var paddlex;
var paddleHeight = 7;
var paddleLength = 60;
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
var ballRadius = 8;
var rowcolors = ['#1C125A', '#322775', '#483D8B', '#675DA5', '#938CC5'];
var paddlecolor = 'black';
var ballcolor = 'black';
var backcolor = 'whitesmoke';
var initialScore = 0;

// initializes the functions to draw bricks and ball
function init() {
  context = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  paddlex = width / 2;
  BRICKWIDTH = (width / NCOLS) - 1;
  canvasMinX = $(canvas).offset().left;
  canvasMaxX = canvasMinX + width;
}

function startGame() {
   intervalDraw = setInterval(gameTick, 10);
}
// used to render the ball's shape
function drawCircle(x, y, r) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

// used to render the paddle's shape
function drawRect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.closePath();
  context.fill();
}

// used to ensure that the ball's path is erased as it moves
function clear() {
  context.clearRect(0, 0, canvas.height, canvas.width);
  drawRect(0, 0, width, height);
}

//key pad functionality to move paddle

//when the left or right arrow is pressed, the paddle will move
function onKeyDown(evt) {
  if (evt.keyCode === 39) rightDown = true;
  else if (evt.keyCode === 37) leftDown = true;
}

//when the left or right arrow is not pressed, the paddle will not move
function onKeyUp(evt) {
  if (evt.keyCode === 39) rightDown = false;
  else if (evt.keyCode === 37) leftDown = false;
}

// mouse functionality to move paddle
function onMouseMove(evt) {
  if (!(evt.pageX > canvasMinX && evt.pageX < canvasMaxX))
    return;

  paddlex = Math.max(evt.pageX - canvasMinX - (paddleLength / 2), 0);
  paddlex = Math.min(width - paddleLength, paddlex);
}

// initializes bricks
function init_bricks() {
  bricks = new Array(NROWS); // creates a new array for the rows
  for (i = 0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS); // creates a new array with rows for col
    for (j = 0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

//draws and colours bricks
function drawbricks() {
    for (i = 0; i < NROWS; i++) {
      context.fillStyle = rowcolors[i];
      for (j = 0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          drawRect((j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT); // giving dimensions to bricks
        }
      }
    }
  }
  // hide mouse when on canvas
function hideMouse() {
  $('#Canvas').css("cursor", "none");
}

//move the paddle if left or right is currently pressed and stop when paddle reaches edge of canvas
function paddlemovement() {
  if (rightDown && paddlex + paddleLength < 500) {
    paddlex += 4;
  };
  if (leftDown && paddlex > 0) {
    paddlex -= 4;
  };
}

// defines brick dimensions
function brickDimensions() {
  rowheight = BRICKHEIGHT + PADDING; //the height of a row is 15 plus the padding of 1 per brick
  colwidth = BRICKWIDTH + PADDING; // the width / number of columns in the canvas - 1 plus the padding
  row = Math.floor(y / rowheight);
  col = Math.floor(x / colwidth);
}

//gets the background colour, 
function drawBricksPaddle() {
  context.fillStyle = backcolor;
  clear();
  context.fillStyle = paddlecolor; //fills in the paddle
  drawRect(paddlex, height - paddleHeight, paddleLength, paddleHeight);
}

function drawBall() {
    context.fillStyle = ballcolor;
    drawCircle(x, y, ballRadius);
}

  //adds to the score
function addScore() {
  console.log(initialScore += 10);
}

function scoreBoard() {
  context.beginPath();
  context.rect(300, 200, 50, 25);
  context.closePath();
  context.fill();
  addScore();
}

// End of Library Code
function hitBrick() {
  return y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1;
}

function hitWall() {
  return x + xDirection > width || x + xDirection < 0;
}

function hitTop() {
  return y + yDirection < 0;
}

function atPaddleHeight() {
  return y + yDirection > height - paddleHeight;
}

function hitPaddle() {
  return !(x + ballRadius < paddlex || x - ballRadius > (paddlex + paddleLength));
}

function hitBottom() {
  return y + yDirection + ballRadius > height;
}

function draw() {
  drawBricksPaddle(); // draws  paddle and gives colour to  bricks, paddle and background of canvas
  paddlemovement(); //dictates the paddle's movement speed and parameters
  drawbricks(); // draws the bricks using arrays for the rows and columns
  brickDimensions(); //gives brick dimensions
  drawBall();
}

function gameTick() {
  draw();

  //reverse the ball's direction and 'smash' the brick
  if (hitBrick()) {
    yDirection = -yDirection; // ball change directions in y
    bricks[row][col] = 0;
    addScore();
  }

  if (hitWall()) { // if ball hits a wall on the canvas
    xDirection = -xDirection; //ball change direction in x
  }

    if (hitTop()) { // if ball hits top
      yDirection = -yDirection; //ball change direction in y
    }
    else if (atPaddleHeight()) {
      if (hitPaddle()) {
        xDirection = 8 * ((x - (paddlex + paddleLength / 2)) / paddleLength);
        yDirection = -yDirection; //ball change direction in y
      } else if (hitBottom()) {
        //game over, so stop the animation (ball halts movement)
        clearInterval(intervalDraw);
        console.log("Game Over!");
      }
     }

    x += xDirection;
    y += yDirection;
  }

function resetGame() {
  xDirection = 1.5;
  yDirection = -4;
  initialScore = 0;

}
function onKeyPress(event) {
  switch (true) {
    case (event.keyCode === 32 && (y + yDirection + ballRadius > height)):
      //reset game using space bar once game has been lost by ball missing paddle
      clearInterval(intervalDraw);
      intervalDraw = null;
      init();
      startGame();
      init_bricks();
      break;
    case (event.keyCode === 13 && !intervalDraw):
      //start game if the page is new and the enter key is pressed
      initialScore = 0;
      drawBall();
      startGame();
      xDirection = 1.5;
      yDirection = -4;
      break;

  }
}

init();
init_bricks();
// add event listeners for the game
window.addEventListener('keydown', onKeyPress, false);
//function call for hidding mouse
hideMouse();
//function call to use mouse for paddle navigation
$(document).mousemove(onMouseMove);
//function calls for the onKeyDown and onKeyUp events
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

