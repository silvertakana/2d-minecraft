class Player {
	constructor(x, y, w, friction) {
		this.pos = createVector(x, y);
		this.width = w;
		this.friction = friction;
		this.vel = createVector(0, 0);
	}
	isColliding() {
		return game.getTile(this.pos.x, this.pos.y - this.width / bw) !== 0;
	}
	control(speed) {
		if (keyIsDown(65)) {
			this.vel.x += speed;
		}

		if (keyIsDown(68)) {
			this.vel.x -= speed;
		}

		if (keyIsDown(87)) {
			this.vel.y += speed;
		}

		if (keyIsDown(83)) {
			this.vel.y -= speed;
		}

		this.vel.x *= this.friction;
		let touchy = this.isColliding();
		if (!touchy) {
			// this.vel.y -= 0.005;
		} else {
			this.vel.y = 0;
			let moveAmount = 1;
			let changeMoveAmount = 1;

			this.pos.x = round(this.pos.x);
			this.pos.y = round(this.pos.y);
			while (touchy) {
				this.pos.y -= moveAmount;
				if (!this.isColliding()) break;
				this.pos.y += moveAmount;

				this.pos.y += moveAmount;
				if (!this.isColliding()) break;
				this.pos.y -= moveAmount;

				this.pos.x += moveAmount;
				if (!this.isColliding()) break;
				this.pos.x -= moveAmount;

				this.pos.x -= moveAmount;
				if (!this.isColliding()) break;
				this.pos.x += moveAmount;

				moveAmount += changeMoveAmount;
			}
		}

		this.pos.add(this.vel);
	}
	show() {
		let pos = this.pos;
		push();
		fill(250);

		rectMode(CENTER);
		// translate(width/2,height/2)
		translate((camX - pos.x) * bw, (camY - pos.y) * bw);
		rect(0, 0, this.width, this.width * 2);
		pop();
	}
}
