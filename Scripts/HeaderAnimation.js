"use strict";
// HeaderAnimation.ts
// Author: Denmark Gibbs
var _a, _b;
const heightPercent = .15;
let canvasWidth = (_a = $(window).width()) !== null && _a !== void 0 ? _a : 0;
let canvasHeight = ((_b = $(window).height()) !== null && _b !== void 0 ? _b : 0) * heightPercent;
let cxt;
let mCircle;
const mCircles = [];
const mCircleRadius = 15;
const mCircleInitialVelocity = 1;
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Circle {
    constructor(xPos, yPos, radius) {
        this.speed = mCircleInitialVelocity;
        this.pos = new Vector(xPos, yPos);
        this.radius = radius;
        this.dir = new Vector(1, 1);
    }
    update() {
        var _a, _b;
        canvasWidth = (_a = $(window).width()) !== null && _a !== void 0 ? _a : 0;
        canvasHeight = (_b = $(window).height()) !== null && _b !== void 0 ? _b : 0;
        if ((this.pos.x + this.radius) > canvasWidth || this.pos.x - this.radius < 0) {
            this.dir.x = -this.dir.x;
        }
        if ((this.pos.y + this.radius) > canvas.height || this.pos.y - this.radius < 0) {
            this.dir.y = -this.dir.y;
        }
        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;
        this.draw();
    }
    draw() {
        if (!cxt)
            return;
        cxt.beginPath();
        cxt.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        cxt.strokeStyle = '#419EC2';
        cxt.fillStyle = '#419EC2';
        cxt.stroke();
        cxt.fill();
    }
}
function onResize(_event) {
    var _a, _b;
    if (!canvas)
        return;
    canvas.width = (_a = $(window).width()) !== null && _a !== void 0 ? _a : 0;
    canvas.height = ((_b = $(window).height()) !== null && _b !== void 0 ? _b : 0) * heightPercent;
}
function animate() {
    requestAnimationFrame(animate);
    if (cxt != undefined && cxt != null) {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        const numCircles = mCircles.length;
        for (let i = 0; i < numCircles; ++i) {
            mCircles[i].update();
        }
    }
}
function GetRandomInBounds(radius) {
    return Math.floor(Math.random() * (canvas.width - radius)) + radius;
}
function initHeader() {
    var _a, _b;
    if (!canvas)
        return;
    canvas.width = (_a = $(window).width()) !== null && _a !== void 0 ? _a : 0;
    canvas.height = ((_b = $(window).height()) !== null && _b !== void 0 ? _b : 0) * heightPercent;
    cxt = canvas.getContext('2d');
    const startX = Math.floor(Math.random() * (canvas.width - mCircleRadius)) + mCircleRadius;
    const startY = Math.floor(Math.random() * (canvas.height - mCircleRadius)) + mCircleRadius;
    mCircle = new Circle(startX, startY, mCircleRadius);
    mCircles.push(mCircle);
    const startX2 = GetRandomInBounds(mCircleRadius);
    const startY2 = GetRandomInBounds(mCircleRadius);
    mCircles.push(new Circle(startX2, startY2, mCircleRadius));
    animate();
    window.addEventListener('resize', onResize);
}
const canvas = $('canvas')[0];
if (canvas != undefined && canvas != null) {
    $(document).ready(initHeader);
}
