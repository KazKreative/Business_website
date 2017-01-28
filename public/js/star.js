"use strict";
console.clear();
var Ball = (function () {
    function Ball(radius, location, velocity, acceleration) {
        if (radius === void 0) { radius = 1; }
        if (location === void 0) { location = createVector(width / 2, height / 2); }
        if (velocity === void 0) { velocity = createVector(random(-2, 2) * random(-2, 2) * random(-2, 2) / 3, random(-1, 0)); }
        if (acceleration === void 0) { acceleration = createVector(0, 0); }
        this.radius = radius;
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.type = 0;
        this.time = random(1500, 2000);
        this.lifespan = Date.now() + this.time;
    }
    Ball.prototype.applyForce = function (force) {
        this.acceleration.add(force.copy());
    };
    Ball.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    };
    Ball.prototype.display = function () {
        var _a = this, lifespan = _a.lifespan, time = _a.time, location = _a.location, radius = _a.radius;
        var opacity = map(Date.now(), lifespan - time, lifespan, 0, 1);
        var red = color("rgba(204, 51, 102, " + constrain(1 - opacity, 0, 1) + ")");
        if (this.type === 1) {
            noStroke();
            fill(red);
        }
        else {
            noFill();
            stroke(red);
        }
        ellipse(location.x, location.y, radius, radius);
    };
    Ball.prototype.rebornIfDied = function () {
        if (Date.now() > this.lifespan || this.location.y < 0) {
            this.time = random(1000, 1500);
            this.lifespan = Date.now() + this.time;
            this.location = createVector(mouseX || width / 2, mouseY || height / 2);
            this.velocity = createVector(random(-2, 2) * random(-2, 2) * random(-2, 2) / 3, random(-1, 0));
            this.acceleration = createVector(0, 0);
            this.type = random([0, 1]);
        }
    };
    return Ball;
}());
var wind = new p5.Vector(0, -0.04);
var balls = [];
function setup() {
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    createCanvas(innerWidth, innerHeight);
    for (var i = 0; i < 300; i += 1) {
        balls.push(new Ball(random(4, 8), p5.Vector(mouseX, mouseY)));
    }
}
function draw() {
    blendMode(BLEND);
    clear();
    background(33);
    blendMode(LIGHTEST);
    balls.forEach(function (ball) {
        if (mouseIsPressed) {
            var wind1 = wind.copy().mult(4);
        }
        ball.applyForce(mouseIsPressed ? wind1 : wind);
        ball.update();
        ball.display();
        ball.rebornIfDied();
    });
}
function windowResized() {
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    resizeCanvas(innerWidth, innerHeight);
}