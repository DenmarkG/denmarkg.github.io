// HeaderAnimation.js
// Author: Denmark Gibbs

function Vector(x, y) 
{
    this.x = x;
    this.y = y;
}

// var canvas = document.querySelector('canvas');
var canvas = $('canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cxt = canvas.getContext('2d');

var innerWidth = $(window).width();
var innerHeight = $(window).height();

function Circle(xPos, yPos, radius)
{
    this.speed = 5;
    this.pos = new Vector(xPos, yPos);

    this.radius = radius;

    this.dir = new Vector(1, 1);

    this.update = function()
    {
        innerWidth = $(window).width();
        innerHeight = $(window).height();

        if ((this.pos.x + this.radius) > innerWidth || this.pos.x - this.radius < 0)
        {
            this.dir.x = -this.dir.x;
        }

        let h = this.pos.y + this.radius;
        // console.log('height: ${h}. innerHeight: ${innerHeight}')

        if ((this.pos.y + this.radius) > canvas.height || this.pos.y - this.radius < 0) 
        {
            this.dir.y = -this.dir.y;
            // console.log('here');
        }

        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;

        this.draw();
    }

    this.draw = function()
    {
        cxt.beginPath();
        cxt.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        cxt.strokeStyle = '#419EC2';
        cxt.fillStyle = '#419EC2';
        cxt.stroke();
        cxt.fill();

        // console.log('drawing');
    }
}

var mCircle = new Circle(100, 100, 30);

// function updateCirclePos(event)
// {
//     mCircle.pos.x = event.x;
//     mCircle.pos.y = event.y;
// }

// window.addEventListener('mousemove', updateCirclePos);

function onResize(event)
{
    let x = $(window).width();
    let y = $(window).height();

    canvas.width = x;
    canvas.height = y;
}



var xPos = 0;

function animate()
{
    requestAnimationFrame(animate);
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    mCircle.update();

    // console.log(mCircle);
}

function initHeader()
{
    animate();
    window.addEventListener('resize', onResize);
}

$(document).ready(initHeader);


