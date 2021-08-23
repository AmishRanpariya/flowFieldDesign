class Particle {
	constructor() {
		this.pos = createVector(random(0, width), random(0, height));
		this.vel = createVector(random(-1, 1), random(-1, 1));
		this.acc = createVector(0, 0);
		this.maxSpeed = maxSpeed;
		this.prevPos = this.pos.copy();
		this.col = chooseRandomColor();
	}
	update() {
		this.prevPos = this.pos.copy();
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	applyForce(force) {
		this.acc.add(force);
	}
	follow(vectors) {
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * COLS;
		let force = vectors[index];
		this.applyForce(force);
	}
	show() {
		stroke(this.col);
		strokeWeight(strokeW);
		line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
	}
	edges() {
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.prevPos.x = this.pos.x;
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.prevPos.x = this.pos.x;
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.prevPos.y = this.pos.y;
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.prevPos.y = this.pos.y;
		}
	}
}

let COLORS = [
	"0f076659057bab0e86e01171",
	"55527365799bb6d5e1e2eff1",
	"0c056d590d82b61aaef25d9c",
	"fff591a3f7bf05dfd7f35588",
	"21e6c1278ea51f4287071e3d",
	"ffac41ff1e56323232000000",
	"f1bbd5a125595f18543b0944",
	"4a266a7f4a88de95baffd9e8",
	"f6f7d4d2f6c599f3bd28df99",
	"fae5b8f4f8b4ea2c84922180",
];
//parameters
let scl = 2;
let inc = 0.05;
let strokeW = 0.1;
let alpha = 10; //out of 255
let maxSpeed = 1;
let count = 10000;
let magnitude = 1;
let zinc = 0.0005;

let ROWS, COLS;
let particles = [];
let flowfield = [];
let zoff = 0;
let COLOR;

function setup() {
	let canvas = createCanvas(640 * 2, 360 * 2);
	count = floor(random(100, 5000));
	scl = floor(random(1, 10));
	inc = random(0.01, 0.1);
	strokeW = random(0.01, 1);
	alpha = random(-10, 10);
	maxSpeed = random(1, 5);
	magnitude = random(0.01, 1);
	zinc = random(0, 0.001);
	COLOR = random(COLORS);
	createP("count: " + count + "  scale: " + scl);
	createP("strokeWeight: " + strokeW + "  Alpha: " + alpha);
	createP("magnitude: " + magnitude);
	createP("maxSpeed: " + maxSpeed);
	createP("XYincrement: " + inc);
	createP("Zincrement: " + zinc);

	canvas.mousePressed(stopr); //to save canvas as image on mousepress

	COLS = floor(width / scl);
	ROWS = floor(height / scl);
	flowfield = new Array(COLS * ROWS);
	for (let i = 0; i < count; i++) {
		particles[i] = new Particle();
	}
	background(10);
}

function draw() {
	background(0, alpha);

	let yoff = 0;
	for (let y = 0; y < ROWS; y++) {
		let xoff = 0;
		for (let x = 0; x < COLS; x++) {
			let index = x + y * COLS;
			let r = noise(xoff, yoff, zoff);
			let v = p5.Vector.fromAngle(r * TWO_PI * 2);
			v.setMag(magnitude);

			flowfield[index] = v;
			xoff += inc;

			//draws flowfield
			// push();
			// stroke(0);
			// strokeWeight(0.2);
			// translate(x * scl, y * scl);
			// rotate(v.heading());
			// line(0, 0, scl, 0);
			// pop();
		}
		yoff += inc;
	}
	zoff += zinc;
	for (let i = 0; i < particles.length; i++) {
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}
}

function stopr() {
	saveCanvas(canvas, "FlowField", "jpg");
}
function chooseRandomColor() {
	let colorHex = COLOR;
	let code = random([
		colorHex.slice(0, 6),
		colorHex.slice(6, 12),
		colorHex.slice(12, 18),
		colorHex.slice(18, 24),
	]);
	return "#" + code;
}
