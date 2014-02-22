//create stage from 'container' div
var stage = new Kinetic.Stage({
        container: document.getElementById('kineticCanvas'),
        width: 500,
        height: 500
    });

//create layer
var layer = new Kinetic.Layer();

//create array to store triangles
var triangles = [];

/* This function creates a new triangle from inputted 
 * dimensions and pushes them to the triangles array.
 * params: x0, y0: coords to start drawing
 *		  xLeg, yLeg: lengths of legs
 */ 
function drawTriangle(x0, y0, xLeg, yLeg) {

	triangles.push(new Kinetic.Shape({
        draggable: true,
        fill: 'blue',
        stroke: 'black', 
        strokeWidth: 2,
        x: x0,
        y: y0,

        sceneFunc: function(context) {
          context.beginPath();
          context.moveTo(x0,y0);  
          context.lineTo(x0+xLeg, y0); 
          context.lineTo(x0, y0+yLeg);
          context.closePath();
          context.fillStrokeShape(this);
        }
    }));
}

/* This function creates triangles from user input and 
 * adds them to the stage from the triangles array.
 */
 function loadTriangles() {
   	//arbitrary x and y, change later
   	var x = 50;
   	var y = 50; 
   	//get values from sliders
   	var xInput = new Number(document.getElementById("xSlider").value);
	var yInput = new Number(document.getElementById("ySlider").value);
   	//draw triangles, may be able to do this with loop
   	drawTriangle(x,y,xInput,yInput);
   	drawTriangle(x+yInput,y,-yInput,xInput);
   	drawTriangle(x,y,xInput,-yInput);
   	drawTriangle(x,y,-xInput,-yInput);
   	//loop thru triangles array and add to layer
  	for (var i = triangles.length - 1; i >= 0; i--) {
  	 layer.add(triangles[i])
  	};
  	//add layer to stage
  	stage.add(layer);
}
