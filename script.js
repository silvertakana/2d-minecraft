var tex = [],
	game,
	camX = 0,
	camY = 0;
var loaded = false;
var player;
const bw = 50;
function preload() {}
function setup() {
	loadFiles();
	noiseSeed(666);
	createCanvas(windowWidth, windowHeight);
	game = new Game();
	player = new Player(-3, 40, 40, 0.85);
	game.setTile(0, 0, 1);
}

function draw() {
	push();
	if (!loaded) {
	} else {
		if (mouseIsPressed) {
			if (keyIsDown(69)) {
				game.setTile(camX - mouseX / bw - 0.5, camY - mouseY / bw - 0.5, 5);
			} else if (keyIsDown(81)) {
				game.setTile(camX - mouseX / bw - 0.5, camY - mouseY / bw - 0.5, 0);
			}
		}
		background(255);
		game.render();
		if (keyIsDown(32)) {
			player.control(10000000000000);
		} else {
			player.control(0.03);
		}

		camX = player.pos.x + width / (2 * bw);
		camY = player.pos.y + height / (2 * bw);
		player.show();
	}
	pop();
	text(
		"(x: " +
			round(camX, 3) +
			" y: " +
			round(camY, 3) +
			") fps: " +
			round(frameRate(), 3),
		50,
		50
	);
}
function loadFiles() {
	let maxfile = 4;
	let fileLoaded = 1;
	let limg = (name) => {
		fileLoaded++;
		if (fileLoaded >= maxfile) {
			loaded = true;
		}
		let file = loadImage(name);

		return file;
	};
	tex[1] = limg("Texture/Grass.jpeg");
	tex[2] = limg("Texture/Dirt.jpeg");
	tex[3] = limg("Texture/Stone.jpeg");
	tex[4] = limg("Texture/Coal.jpeg");
	tex[5] = limg("Texture/Cobble_stone.png");
}
/*
function control(speed) {
  if (keyIsDown(LEFT_ARROW)) {
    camX += speed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    camX -= speed;
  }

  if (keyIsDown(UP_ARROW)) {
    camY += speed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    camY -= speed;
  }
}
*/
function control(speed) {
	if (keyIsDown(65)) {
		camX += speed;
	}

	if (keyIsDown(68)) {
		camX -= speed;
	}

	if (keyIsDown(87)) {
		camY += speed;
	}

	if (keyIsDown(83)) {
		camY -= speed;
	}
}
