class Player {
	constructor(x, y, w, friction) {
		this.pos = createVector(x, y);
		this.width = w;
		this.friction = friction;
		this.vel = createVector(0, 0);
	}
	isColliding() {
		return game.getTile(this.pos.x, this.pos.y) !== 0 || game.getTile(this.pos.x, this.pos.y+this.width/bw*2) !== 0 ;
	}
	control(speed,jumpHeight) {
		if (keyIsDown(65)) {
			this.vel.x += speed;
		}

		if (keyIsDown(68)) {
			this.vel.x -= speed;
		}

		

		this.vel.x *= this.friction;
		let touchy = this.isColliding();
		if (!touchy) {
			this.vel.y -= 0.005;
		} else {
			this.vel.y = 0;
			let moveAmount = 0.001;
			let changeMoveAmount = 0.001;
			// this.pos.x = floor(this.pos.x);
			// this.pos.y = round(this.pos.y);
			const maxSlope = 1000
			let slope = 0
			this.pos.y+=0.01;
			while (!(!touchy || slope > maxSlope)) {
				this.pos.y -= moveAmount;
				if (!this.isColliding()) break;
				this.pos.y += moveAmount;

				this.pos.y += moveAmount;
				if (!this.isColliding()) break;
				this.pos.y -= moveAmount;

				moveAmount += changeMoveAmount;
				slope++;
			}
			moveAmount = 0;
			if(slope > maxSlope){
				while(touchy){
					this.pos.x += moveAmount;
					if (!this.isColliding()) break;
					this.pos.x -= moveAmount;

					this.pos.x -= moveAmount;
					if (!this.isColliding()) break;
					this.pos.x += moveAmount;

					moveAmount += changeMoveAmount;
				}
			}
			if (keyIsDown(87)) {
				this.vel.y += jumpHeight*5;
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
		translate((camX - pos.x) * bw, (camY - (pos.y+this.width/bw)) * bw);
		rect(0, 0, this.width, this.width * 2);
		pop();
	}
}
