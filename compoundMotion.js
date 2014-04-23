var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var playAnimation = false;

var startButton = document.getElementById('startAnimation');
var stopButton = document.getElementById('stopAnimation');

$(startButton).click(function() {
	//play 3 times and stop
	playLoop();
	setTimeout(playLoop, 3500);
	setTimeout(playLoop, 7000);
});

var Ball = function(x, y, r, vX, vY, aY) {
	this.x = x;
	this.y = y;
	this.radius = r; 
	this.vX = vX;
	this.vY = vY;
	this.aY = aY; 
}

var balls = new Array();
var drawPoints = [[422,38]] //array of points on projectile path
var count = 1; //count for parabola points

balls[0] = new Ball(422, 38, 10, -5, 0, .1);
balls[1] = new Ball(422, 38, 10, -5, 0, 0);
balls[2] = new Ball(422, 38, 10, 0, 0, .1);

function animate() {
	context.clearRect(0,0, canvas.width, canvas.height);
	
	//loop through balls and draw
	for (var i=0; i<balls.length; i++) {
		if (i==0) {
			context.fillStyle = "rgba(255,0,0,1)";
		} else {
			context.fillStyle = "rgba(255,0,0,0.2)";
		};
		balls[i].vY += balls[i].aY;
		balls[i].x += balls[i].vX;
		balls[i].y += balls[i].vY; 
		
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI*2, false);
		context.closePath();
		context.fill();
	};

	//put updated position in projectile array
	drawPoints[count] = [0,0]
	drawPoints[count][0] = balls[0].x;
	drawPoints[count][1] = balls[0].y;
	count++;

	//draw projectile path from points
	context.beginPath();
	context.moveTo(drawPoints[0][0],drawPoints[0][1]);
	for (var i = 1; i<count; i++) 
		context.lineTo(drawPoints[i][0],drawPoints[i][1]);
	context.stroke();

	//if out of bounds, stop animation
	if(balls[0].x < 75) {
		playAnimation = false;
	};

	//if still playing, repeat
	if(playAnimation) {
		setTimeout(animate, 33);
	};
};

function playLoop() {
	count = 0; // reset num points in projectile array
	context.clearRect(0,0, canvas.width, canvas.height);
	balls[0] = new Ball(422, 38, 10, -5, 0, .1);
	balls[1] = new Ball(422, 38, 10, -5, 0, 0);
	balls[2] = new Ball(422, 38, 10, 0, 0, .1);
	
	// set true and play
	playAnimation = true;
	animate();
};

animate(); //initial drawing