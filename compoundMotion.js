var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var playAnimation = false;

var startButton = document.getElementById('startAnimation');
var stopButton = document.getElementById('stopAnimation');

$(startButton).click(function() {
	playAnimation = true;
	animate();
});

$(stopButton).click(function() {
	playAnimation = false;
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
//var myBall = new Ball(422, 38, 10, -5, 0, .1);
balls[0] = new Ball(422, 38, 10, -5, 0, .1);
balls[1] = new Ball(422, 38, 10, -5, 0, 0);
balls[2] = new Ball(422, 38, 10, 0, 0, .1);

function animate() {
	context.clearRect(0,0, canvas.width, canvas.height);
	
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
	if(playAnimation) {
		setTimeout(animate, 33);
	};
	if(balls[0].x < 75) {
		playAnimation = false;
	};
};

animate();