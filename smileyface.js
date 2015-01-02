var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 120;

context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'yellow';
context.fill();
context.lineWidth = 2;
context.strokeStyle = 'black';
context.stroke();

context.beginPath();
context.arc(centerX, (centerY + 40), 50, 0, Math.PI,false);
context.closePath();
context.lineWidth = 2;
context.fillStyle = 'black';
context.fill();
context.strokeStyle = 'black';
context.stroke();

context.beginPath();
context.arc((centerX + 40), (centerY - 40), 10, 0, 2 * Math.PI, false);
context.fillStyle = 'black';
context.fill();
context.lineWidth = 2;
context.strokeStyle = 'black';
context.stroke();

context.beginPath();
context.arc((centerX - 40), (centerY - 40), 10, 0, 2 * Math.PI, false);
context.fillStyle = 'black';
context.fill();
context.lineWidth = 2;
context.strokeStyle = 'black';
context.stroke();