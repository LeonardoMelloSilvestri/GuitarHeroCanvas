const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {

	init() {
		game.loop();
	}

	update() {
		window.requestAnimationFrame(game.loop, canvas);
		tile.move();
		player.pressKey();
	}

	render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		player.draw();
		tile.draw();
		ctx.font = "30px Cursive";
		ctx.fillStyle = "Red";
		ctx.fillText("Pontos: " + player.score, 10, 30);
		ctx.font = "20px Cursive";
		ctx.fillText("Acertos: " + player.success, 250, 20);
		ctx.fillText("Erros: " + player.fail, 250, 50);
	}

	loop() {
		game.update();
		game.render();
	}
}

document.addEventListener("keydown", function(e){
	switch(e.which) {
		case 81:
			if(!player.qIsDown) {
				player.controlRed = true;
				player.qIsDown = true;
			}
			break;
		case 87:
			if(!player.wIsDown) {
				player.controlBlue = true;
				player.wIsDown = true;
			}
			break;
		case 69:
			if(!player.eIsDown) {
				player.controlGreen = true;
				player.eIsDown = true;
			}
			break;
		case 82:
			if(!player.rIsDown) {
				player.controlPurple = true;
				player.rIsDown = true;
			}
			break;
	}
})

document.addEventListener("keyup", function(e){
	switch(e.which) {
		case 81:
			player.qIsDown = false;
			break;
		case 87:
			player.wIsDown = false;
			break;
		case 69:
			player.eIsDown = false;
			break;
		case 82:
			player.rIsDown = false;
			break;
	}
})

class Player {
	constructor(color, x) {
		this.x = x;
		this.y = 500;
		this.width = 50;
		this.height = 50;
		this.color = color;
		this.score = 0;
		this.controllers = [];
		this.controlRed = this.controlBlue = this.controlGreen = this.controlPurple = false;
		this.qIsDown = this.wIsDown = this.eIsDown = this.rIsDown = false;
		this.success = 0;
		this.fail = 0;
	}

	addControllers() {
		this.controllers.push(new Player("Red", 25));
		this.controllers.push(new Player("Blue", 125));
		this.controllers.push(new Player("Green", 225));
		this.controllers.push(new Player("Purple", 325));
	}

	draw() {	
		ctx.beginPath();
		ctx.moveTo(50, 0);
		ctx.lineTo(50, 600);
		ctx.moveTo(150, 0);
		ctx.lineTo(150, 600);
		ctx.moveTo(250, 0);
		ctx.lineTo(250, 600);
		ctx.moveTo(350, 0);
		ctx.lineTo(350, 600);				
		ctx.stroke();
		for(var i = 0; i < this.controllers.length; i++) {
			this.currentController = this.controllers[i];
			ctx.fillStyle = this.currentController.color;
			ctx.fillRect(this.currentController.x, this.y, this.width, this.height);
		}
	}

	pressKey() {
		for(var i = 0; i < tile.tilesArray.length; i++) {
			this.currentTile = tile.tilesArray[i];
			for(var j = 0; j < this.controllers.length; j++) {
				this.currentController = this.controllers[j];
				
				if(this.currentTile.y + tile.height >= player.y &&
					 this.currentTile.y <= player.y + player.height) {

					 if(this.currentController.color == "Red" && 
					 this.controlRed &&
					 this.currentTile.color == "Red") {
						player.score += 10;
						player.success += 1;
						tile.tilesArray.splice(tile.tilesArray.indexOf(this.currentTile), 1);						
					 } else if(this.currentController.color == "Blue" && 
					 this.controlBlue &&
					 this.currentTile.color == "Blue") {
					 	player.score += 10;
					 	player.success += 1;
						tile.tilesArray.splice(tile.tilesArray.indexOf(this.currentTile), 1);
					 } else if(this.currentController.color == "Green" && 
					 this.controlGreen &&
					 this.currentTile.color == "Green") {
					 	player.score += 10;
					 	player.success += 1;
						tile.tilesArray.splice(tile.tilesArray.indexOf(this.currentTile), 1);
					 } else if(this.currentController.color == "Purple" && 
					 this.controlPurple &&
					 this.currentTile.color == "Purple") {
					 	player.score += 10;
					 	player.success += 1;
						tile.tilesArray.splice(tile.tilesArray.indexOf(this.currentTile), 1);
					 }
				}	
			}			
		}
	this.controlRed = false;
	this.controlBlue = false;
	this.controlGreen = false;
	this.controlPurple = false;
	}
}

class Tiles {
	constructor(color, x, y) {
		this.height = 50;
		this.width = 50;
		this.x = x;
		this.y = y;
		this.color = color;
		this.tilesArray = [];
		this.speed = 5;
	}

	move() {
		for(var i = 0; i < this.tilesArray.length; i++) {
			this.currentTile = this.tilesArray[i];
			this.currentTile.y += this.speed;
			if(this.currentTile.y >= canvas.height) {
				player.fail += 1;
				this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);
			}
		}
	}

	addTiles() {
		setTimeout(function interval() {
			this.random = Math.floor((Math.random() * 4) + 1);
			switch(random) {
				case 1:
					tile.tilesArray.push(new Tiles("Red", 25, 0));
					break;
				case 2:
					tile.tilesArray.push(new Tiles("Blue", 125, 0));
					break;
				case 3:
					tile.tilesArray.push(new Tiles("Green", 225, 0));
					break;
				case 4:
					tile.tilesArray.push(new Tiles("Purple", 325, 0)); 
			}
			setTimeout(interval, 400);
		}, 400)
	}

	draw() {
		for(var i = 0; i < this.tilesArray.length; i++) {
			this.currentTile = this.tilesArray[i];
			ctx.fillStyle = this.currentTile.color;
			ctx.fillRect(this.currentTile.x, this.currentTile.y, this.width, this.height);
		}
	}
}

game = new Game();
player = new Player();
tile = new Tiles();

game.init();
player.addControllers();
tile.addTiles();