var canvas = document.getElementById('myCanvas');
var context = canvas.get(0).getContext('2d');



var Ball = function(x, y, vX, vY, aY) {
	this.x = x;
	this.y = y;
	this.vX = vX;
	this.vY = vY;
	this.aY = aY; 
}