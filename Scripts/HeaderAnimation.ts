// HeaderAnimation.ts
// Author: Denmark Gibbs

const heightPercent = .15;
let canvasWidth: number = $(window).width() ?? 0;
let canvasHeight: number = ($(window).height() ?? 0) * heightPercent;
let cxt: CanvasRenderingContext2D | null;
let mCircle: Circle;
const mCircles: Circle[] = [];
const mCircleRadius = 15;
const mCircleInitialVelocity = 1;

class Vector
{
    constructor(public x: number, public y: number) {}
}

class Circle
{
    speed: number;
    pos: Vector;
    radius: number;
    dir: Vector;

    constructor(xPos: number, yPos: number, radius: number)
    {
        this.speed = mCircleInitialVelocity;
        this.pos = new Vector(xPos, yPos);
        this.radius = radius;
        this.dir = new Vector(1, 1);
    }

    update(): void
    {
        canvasWidth = $(window).width() ?? 0;
        canvasHeight = $(window).height() ?? 0;

        if ((this.pos.x + this.radius) > canvasWidth || this.pos.x - this.radius < 0)
        {
            this.dir.x = -this.dir.x;
        }

        if ((this.pos.y + this.radius) > canvas!.height || this.pos.y - this.radius < 0)
        {
            this.dir.y = -this.dir.y;
        }

        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;

        this.draw();
    }

    draw(): void
    {
        if (!cxt) return;
        cxt.beginPath();
        cxt.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        cxt.strokeStyle = '#419EC2';
        cxt.fillStyle = '#419EC2';
        cxt.stroke();
        cxt.fill();
    }
}

function onResize(_event: Event): void
{
    if (!canvas) return;
    canvas.width = $(window).width() ?? 0;
    canvas.height = ($(window).height() ?? 0) * heightPercent;
}

function animate(): void
{
    requestAnimationFrame(animate);
    if (cxt != undefined && cxt != null)
    {
        cxt.clearRect(0, 0, canvas!.width, canvas!.height);

        const numCircles = mCircles.length;
        for (let i = 0; i < numCircles; ++i)
        {
            mCircles[i].update();
        }
    }
}

function GetRandomInBounds(radius: number): number
{
    return Math.floor(Math.random() * (canvas!.width - radius)) + radius;
}

function initHeader(): void
{
    if (!canvas) return;
    canvas.width = $(window).width() ?? 0;
    canvas.height = ($(window).height() ?? 0) * heightPercent;

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

const canvas = $('canvas')[0] as HTMLCanvasElement | undefined;
if (canvas != undefined && canvas != null)
{
    $(document).ready(initHeader);
}
