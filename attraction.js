var canvas;
var ctx;
var things = [];

var size;

window.onload = function() {
	canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
		window.requestAnimationFrame(draw);
	}
	resize();
	window.addEventListener("resize",resize);
	canvas.addEventListener("click", function (event) {
		things.push(new thing(event.x,event.y));
	});

	document.getElementById("clear").addEventListener("click",function() {
		things = [];
	});
	size = document.getElementById("size-slider");
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	// clear
	ctx.fillStyle = "rgb(0,0,0,0.4)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = "blue";
	ctx.lineCap = "round"
	for (let i = things.length-1; i >= 0; i--) {
		let thingi = things[i];
		// calculate velocity
		for (let o = i-1; o >= 0; o--) {
			let thingo = things[o];
			let dx = thingi.x - thingo.x;
			let dy = thingi.y - thingo.y;
			let scale = thingi.m * thingo.m / (Math.pow(dx,2) + Math.pow(dy,2)); // scale = (root(ma2*mb2)) / (root(d2^2))
			if (scale > 0.5) {
				scale = 0.5;
			}
			dx *= scale;
			dy *= scale;
			thingi.vx += -dx;
			thingi.vy += -dy;
			thingo.vx += dx;
			thingo.vy += dy;
		}
		// apply velocity (vx is actually "force on x axis")
		let oldx = thingi.x;
		let oldy = thingi.y;
		thingi.x += thingi.vx / thingi.m;
		thingi.y += thingi.vy / thingi.m;
		if (thingi.x < 0 || thingi.x > canvas.width || thingi.y < 0 || thingi.y > canvas.height) {
			things.splice(i,1);
		}
		// draw (while applying velocity)
		ctx.lineWidth = thingi.r;
		ctx.beginPath();
		ctx.moveTo(oldx,oldy);
		ctx.lineTo(thingi.x,thingi.y);
		ctx.stroke();
	}
	window.requestAnimationFrame(draw);
}

function thing(x,y) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.r = size.value;
	this.m = Math.pow(this.r,2) * 0.5;
	this.r *= 16;
}
