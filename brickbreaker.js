//Beginning of Library Code
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var canvas = document.getElementById('Canvas');
var context;
var WIDTH;
var HEIGHT;
var intervalId = 0;
var paddlex; 
var paddleh = 10;
var paddlew = 75;

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
function init(){
	context = canvas.getContext('2d');
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	paddlex = WIDTH / 2;
	intervalId= setInterval(draw, 10);
}

// End of Library Code
rightDown = false;
leftDown = false;

function onKeyDown(evt){
	if (evt.keyCode == 39) rightDown = true;
	else if (evt.keyCode = 37) leftDown = true;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onKeyUp(evt){
	if (evt.keyCode == 39) rightDown = false;
	else if (evt.keyCode == 37) leftDown = false;
}

function draw() {
  clear();
  drawCircle(x, y, 5);
  
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  drawRect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
  
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
init_paddle();
