var canvas;
var ctx;
var things = [];

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
		// velocity
		thingi.x += thingi.vx;
		thingi.y += thingi.vy;
		if (thingi.x < 0 || thingi.x > canvas.width || thingi.y < 0 || thingi.y > canvas.height) {
			things.splice(i,1);
		}
		// draw
		ctx.beginPath();
		ctx.arc(thingi.x,thingi.y,32,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
	}
	window.requestAnimationFrame(draw);
}

function thing(x,y) {
	this.x = x;
	this.y = y;
	this.vx = Math.random() * 16 - 8;
	this.vy = Math.random() * 16 - 8;
}
