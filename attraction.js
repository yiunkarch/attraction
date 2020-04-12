var canvas;
var ctx;
var things = [];

var mass;

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

	mass = document.getElementById("mass-slider");
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	// clear
	ctx.fillStyle = "rgb(0,0,0,0.2)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "blue";
	for (let i = things.length-1; i >= 0; i--) {
		let thingi = things[i];
		// calculate velocity
		for (let o = i-1; o >= 0; o--) {
			let thingo = things[o];
			let dx = thingi.x - thingo.x;
			let dy = thingi.y - thingo.y;
			let scale = Math.pow(thingi.m * thingo.m, 2) / (Math.pow(dx,2) + Math.pow(dy,2)); // scale = (root(ma2*mb2)) / (root(d2^2))
			dx *= scale;
			dy *= scale;
			thingi.vx += -dx;
			thingi.vy += -dy;
			thingo.vx += dx;
			thingo.vy += dy;
		}
		// apply velocity (vx is actually "force on x axis")
		thingi.x += thingi.vx / thingi.m;
		thingi.y += thingi.vy / thingi.m;
		if (thingi.x < 0 || thingi.x > canvas.width || thingi.y < 0 || thingi.y > canvas.height) {
			things.splice(i,1);
		}
		// draw
		ctx.beginPath();
		ctx.arc(thingi.x,thingi.y,thingi.m*8,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
	}
	window.requestAnimationFrame(draw);
}

function thing(x,y) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.m = mass.value;
}
