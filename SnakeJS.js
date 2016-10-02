// popoxakanner
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var w = +canvas.getAttribute("width");
var h = +canvas.getAttribute("height");
var snake = [
		{x:0,y:1},
		{x:1,y:1},
		{x:2,y:1},
		{x:3,y:1}
	];
var snakeSize = 10;
var score=0;
var timeOut;
var foodX = Math.ceil(Math.random()*30);
var foodY = Math.ceil(Math.random()*30);
var direction='right';


//----------------------------------------------------------------

// START OF GAME
createGame();

//----------------- CANVASES -------------------------------------
// make new board
function makeBoard(){
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);
	scoreText();
}

// snake body canvas
function snakeBody(x,y) {
	ctx.fillStyle = "blue";
	ctx.fillRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
	ctx.strokeStyle = "black";
	ctx.strokeRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
};
//snakeBody(1,20);

// food canvas
function foodPiece(x,y) {
	ctx.fillStyle = "yellow";
	ctx.fillRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
	ctx.fillStyle = "red";
	ctx.fillRect(x*snakeSize+1,y*snakeSize+1,snakeSize-2,snakeSize-2);
}
//foodPiece(0,10);

// score canvas
function scoreText() {
	var scoreText = "Score: " + score;
	ctx.fillStyle = "blue";
	ctx.fillText(scoreText, 150, h-5);
}
//----------------- CANVASES -------------------------------------------

//----------------- MAIN -----------------------------------------------
// draw Snake function
function drawSnake() {
	for(var i=0; i < snake.length; i++) {
		snakeBody(snake[i]['x'], snake[i]['y']);
	}
}

// game start
function createGame() {
	makeBoard();
	onKeys();
	startGame();
};

function draw() {
	makeBoard();
	foodPiece(foodX,foodY);
	
	if(foodX === snake[snake.length-1]['x'] && foodY === snake[snake.length-1]['y']) {
		snake.push({x:foodX, y:foodY});
		score++;
		foodX = Math.ceil(Math.random()*30), foodY = Math.ceil(Math.random()*30);
	}
	
	// snake movement & food eating
	var elem = snake[snake.length-1];
	var x = elem['x'];
	var y = elem['y'];	
	switch(direction) {
		case 'right':
			x++;
			snake.shift();
			snake.push({x:x,y:y});					
		break;
		case 'left':
			x--;
			snake.shift();
			snake.push({x:x,y:y});			
		break;
		case 'up':
			y--;
			snake.shift();
			snake.push({x:x,y:y});
		break;
		case 'down':
			y++;
			snake.shift();
			snake.push({x:x,y:y});
		break;
	}
	
	drawSnake();

	if(checkCollision()) {	
		makeBoard();
		ctx.font = ('30px sans-serif');
		ctx.fillStyle = "blue";
		ctx.fillText("GAME OVER",w-275,h/2);
		ctx.font = ('20px serif');
		ctx.fillStyle = "red";
		ctx.fillText("your score is"+" "+score,w-240,h-140);
		clearTimeout(timeOut);
		document.getElementById('btn').style.display = "block";
	}
}

//----------------- FUNCTIONS OF MAIN -----------------------------------------------
// cheks collision with itself and walls
function checkCollision() {
	var instLngt = snake.length;
	for(var i=0; i<instLngt-1; i++) {
		if (snake[instLngt-1]['x'] === snake[i]['x'] && snake[instLngt-1]['y'] === snake[i]['y'] || 
			snake[instLngt-1]['x'] === -1 || snake[instLngt-1]['x'] === w/snakeSize ||
			snake[instLngt-1]['y'] === -1 || snake[instLngt-1]['y'] === h/snakeSize) {
			return true;			
		}
	}	
	return false;
}

// pressing Arrow keys
function onKeys() {
	document.onkeydown = function(event) {

        var btnCode = event.keyCode || event.which;  /* for Firefox */
        switch(btnCode) {        
			case 37:
				if (direction != 'right') {
					direction = 'left'; 
				}
			break;

			case 39:
				if (direction != 'left') {
					direction = 'right'; 
				}
			break;

			case 38:
				if (direction != 'down') {
					direction = 'up';
				}
			break;

			case 40:
				if (direction != 'up') {
					direction = 'down';
				}
			break;
        }
    }
}

// game start loop function
function startGame(){
	timeOut = setTimeout(startGame, 1000/10);
	draw();
};