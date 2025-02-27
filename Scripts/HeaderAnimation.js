// HeaderAnimation.js
// Author: Denmark Gibbs

// forward declarations:
var canvas;
var innerWidth = $(window).width();
const heightPercent = .15;
var innerHeight = $(window).height() * heightPercent;
var cxt;
var mCircle;
var mCircles = [];
var mCircleRadius = 15;
var mCircleInitialVelocity = 1;

function Vector(x, y) 
{
    this.x = x;
    this.y = y;
}

function Circle(xPos, yPos, radius)
{
    this.speed = mCircleInitialVelocity;
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
    }
}

function onResize(event)
{
    let x = $(window).width();
    let y = $(window).height() * heightPercent;

    canvas.width = x;
    canvas.height = y;
}

function animate()
{
    requestAnimationFrame(animate);
    if (cxt != undefined && cxt != null)
    {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        // mCircle.update();

        let numCircles = mCircles.length;
        for (i = 0; i < numCircles; ++i)
        {
            mCircles[i].update();
        }
    }
}

function GetRandomInBounds(radius)
{
    return Math.floor(Math.random() * (canvas.width - radius)) + radius;
}

function initHeader()
{
    canvas.width = $(window).width();
    canvas.height = $(window).height() * heightPercent;

    cxt = canvas.getContext('2d');

    let startX = Math.floor(Math.random() * (canvas.width - mCircleRadius)) + mCircleRadius;
    let startY = Math.floor(Math.random() * (canvas.height - mCircleRadius)) + mCircleRadius;

    mCircle = new Circle(startX, startY, mCircleRadius);
    mCircles.push(mCircle);

    startX = GetRandomInBounds(mCircleRadius);
    startY = GetRandomInBounds(mCircleRadius);
    mCircles.push(new Circle(startX, startY, mCircleRadius));
    
    animate();
    window.addEventListener('resize', onResize);
}

canvas = $('canvas')[0];
if (canvas != undefined && canvas != null)
{
    $(document).ready(initHeader);
}



