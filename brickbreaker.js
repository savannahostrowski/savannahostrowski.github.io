var ballX = 25;
var ballY = 250;
var xDirection = 1.5;
var yDirection = -4;
var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var intervalDraw = 0;
var paddleLeft = width / 2;
var paddleHeight = 7;
var paddleLength = 60;
var rightDown = false;
var leftDown = false;
var canvasMinX = $(canvas).offset().left;
var canvasMaxX = canvasMinX + width;
var bricks;
var NROWS = 5;
var NCOLS = 7;
var BRICKWIDTH = (width / NCOLS) - 1;
var BRICKHEIGHT = 15;
var PADDING = 1;
var ballRadius = 8;
var rowcolors = ['#1C125A', '#322775', '#483D8B', '#675DA5', '#938CC5'];
var paddlecolor = 'black';
var ballcolor = 'black';
var backcolor = 'whitesmoke';
var score = 0;

function resetGameState() {
  ballX = 25;
  ballY = 250;
  xDirection = 1.5;
  yDirection = -4;
  paddleLeft = width / 2;
  generateBricks();
  score = 0;
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

  paddleLeft = Math.max(evt.pageX - canvasMinX - (paddleLength / 2), 0);
  paddleLeft = Math.min(width - paddleLength, paddleLeft);
}

// initializes bricks
function generateBricks() {
  bricks = new Array(NROWS); // creates a new array for the rows
  for (i = 0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS); // creates a new array with rows for col
    for (j = 0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

//draws and colours bricks
function drawBricks() {
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
  if (rightDown && paddleLeft + paddleLength < 500) {
    paddleLeft += 4;
  };
  if (leftDown && paddleLeft > 0) {
    paddleLeft -= 4;
  };
}

// defines brick dimensions
function brickDimensions() {
  rowheight = BRICKHEIGHT + PADDING; //the height of a row is 15 plus the padding of 1 per brick
  colwidth = BRICKWIDTH + PADDING; // the width / number of columns in the canvas - 1 plus the padding
  row = Math.floor(ballY / rowheight);
  col = Math.floor(ballX / colwidth);
}

// used to ensure that the ball's path is erased as it moves
function clearCanvas() {
  context.fillStyle = backcolor;
  drawRect(0, 0, width, height);
}

//gets the background colour, 
function drawPaddle() {
  context.fillStyle = paddlecolor; //fills in the paddle
  drawRect(paddleLeft, height - paddleHeight, paddleLength, paddleHeight);
}

function drawBall() {
  context.fillStyle = ballcolor;
  drawCircle(ballX, ballY, ballRadius);
}

//adds to the score
function addScore() {
  console.log(score += 10);
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
  return ballY < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1;
}

function hitWall() {
  return ballX + xDirection > width || ballX + xDirection < 0;
}

function hitTop() {
  return ballY + yDirection < 0;
}

function atPaddleHeight() {
  return ballY + yDirection > height - paddleHeight;
}

function hitPaddle() {
  return !(ballX + ballRadius < paddleLeft || ballX - ballRadius > (paddleLeft + paddleLength));
}

function hitBottom() {
  return ballY + yDirection + ballRadius > height;
}

function draw() {
  clearCanvas();
  drawPaddle(); // draws  paddle and gives colour to  bricks, paddle and background of canvas
  paddlemovement(); //dictates the paddle's movement speed and parameters
  drawBricks(); // draws the bricks using arrays for the rows and columns
  brickDimensions(); //gives brick dimensions
  drawBall();
}

function gameTick() {
  draw();

  //reverse the ball's direction and 'smash' the brick
  if (hitBrick()) {
    yDirection = -yDirection; // ball change directions in ballY
    bricks[row][col] = 0;
    addScore();
  }

  if (hitWall()) { // if ball hits a wall on the canvas
    xDirection = -xDirection; //ball change direction in ballX
  }

  if (hitTop()) { // if ball hits top
    yDirection = -yDirection; //ball change direction in ballY
  } else if (atPaddleHeight()) {
    if (hitPaddle()) {
      xDirection = 8 * ((ballX - (paddleLeft + paddleLength / 2)) / paddleLength);
      yDirection = -yDirection; //ball change direction in ballY
    } else if (hitBottom()) {
      //game over, so stop the animation (ball halts movement)
      clearInterval(intervalDraw);
      console.log("Game Over!");
    }
  }

  ballX += xDirection;
  ballY += yDirection;
}

function onKeyPress(event) {
  switch (true) {
    case (event.keyCode === 32 && (ballY + yDirection + ballRadius > height)):
      //reset game using space bar once game has been lost by ball missing paddle
      clearInterval(intervalDraw);
      intervalDraw = null;
      startGame();
      resetGameState();
      break;
    case (event.keyCode === 13 && !intervalDraw):
      //start game if the page is new and the enter key is pressed
      resetGameState();
      drawBall();
      startGame();
      break;
  }
}

function init() {
  // add event listeners for the game
  window.addEventListener('keydown', onKeyPress, false);
  //function call for hidding mouse
  hideMouse();
  //function call to use mouse for paddle navigation
  $(document).mousemove(onMouseMove);
  //function calls for the onKeyDown and onKeyUp events
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);
  clearCanvas();
  generateBricks();
  drawBricks();
  drawPaddle();

}

init();
