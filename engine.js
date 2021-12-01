class Game {
	constructor() {
		this.changes = [];
		this.sx = 0;
	}
	getTile(x1, y1) {
		const x = floor(x1),
			y = floor(y1);
		// const x = x1,y=y1
		// for (let i in this.changes) {
		//     let t = this.changes[i];
		//     if (t.x === x && t.y === y) {
		//         // print("hi")
		//         return t.id;
		//     }
		// }
		let ischanged = false;
		let change;
		this.changes.forEach((t) => {
			if (t.x === x && t.y === y) {
				ischanged = true;
				change = t.id;
			}
		});
		if (ischanged) return change;
		let he = noise(x / 40) * 50;
		let coal = noise(x / 3, y / 3);
		push();
		noiseDetail(2, 2);
		let cave = noise(x / 20 + 200, y / 20 + 200);
		pop();

		if (cave > 0.95) {
			return 0;
		} else {
			if (y > he) {
				return 0;
			} else if (y === floor(he)) {
				return 1;
			} else if (y > he + coal * 5) {
				return 2;
			} else {
				if (coal > 1) {
					return 4;
				} else {
					return 3;
				}
			}
		}
	}
	setTile(x1, y1, id) {
		const x = round(x1),
			y = round(y1);
		for (let i in this.changes) {
			let t = this.changes[i];
			if (t.x === x && t.y === y) {
				this.changes[i] = { x: x, y: y, id: id };
				return;
			}
		}
		if (this.getTile(x, y) !== id) {
			this.changes.push({ x: x, y: y, id: id });
		}
	}
	render() {
		let bl, tilex, tileY;
		for (let i = 0; i < ceil(width / bw) + 1; i++) {
			for (let j = 0; j < ceil(height / bw) + 1; j++) {
				tilex = -(i - floor(camX));
				tileY = -(j - floor(camY));
				bl = this.getTile(tilex, tileY);
				if (bl !== 0) {
					image(
						tex[bl],
						(camX - tilex - 1) * bw,
						(camY - tileY - 1) * bw,
						bw,
						bw
					);
				}
			}
		}
	}
}
