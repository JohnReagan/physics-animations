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
function drawTriangle(x0, y0, xLeg, yLeg, lb, rb, bb, tb) {

	triangles.push(new Kinetic.Shape({
        draggable: true,
        fill: "009687",
        stroke: 'white', 
        strokeWidth: 1,
        x: x0,
        y: y0,

        dragBoundFunc: function(pos) {
          var newY = pos.y;
          var newX = pos.x;
          if (pos.y < bb) {
            newY = bb;
          } else if (pos.y > tb) {
            newY = tb;
          }

          if (pos.x < lb) {
            newX = lb;
          }else if(pos.x>rb) {
            newX = rb;
          }
          
          return {
            x: newX,
            y: newY
          };
          
        },

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
 	//removes all existing triangles from layer and array
  triangles.length = 0;
  layer.destroyChildren(); 

  //arbitrary x and y, change later
 	var x = 50;
 	var y = 50; 
 	
  //get values from sliders
 	var xInput = new Number(document.getElementById("xSlider").value);
	var yInput = new Number(document.getElementById("ySlider").value);
 	var offset = xInput/2+yInput/2;

   //define bounds
  var leftBound = x;
  var rightBound = x+offset;
  var bottomBound = y;
  var topBound = y+offset;
  
  //draw triangles, may be able to do this with loop
 	drawTriangle(x,y,xInput,yInput, leftBound, rightBound, bottomBound, topBound);
 	drawTriangle(x+offset,y,-yInput,xInput, leftBound, rightBound, bottomBound, topBound);
 	drawTriangle(x,y+offset,yInput,-xInput, leftBound, rightBound, bottomBound, topBound);
 	drawTriangle(x+offset,y+offset,-xInput,-yInput, leftBound, rightBound, bottomBound, topBound);
	
  //loop thru triangles array and add to layer
	for (var i = triangles.length - 1; i >= 0; i--) {
	 layer.add(triangles[i])
	};
	
  //add layer to stage
	stage.add(layer);
}

function clearScreen() {
	for (var i = triangles.length - 1; i >= 0; i--) {
	 layer.remove(triangles[i])
	};
}

function linkHomepage() {
	window.location = 'http://galileoandeinstein.physics.virginia.edu/HTML5/';
}