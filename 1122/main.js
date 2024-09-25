const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
    return "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")";
}

function Triangle(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Triangle.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    ctx.fill();
};

let testTriangle = new Triangle(50, 100, 4, 4, "blue", 10);

testTriangle.x;
testTriangle.size;
testTriangle.color;
testTriangle.draw();

Triangle.prototype.update = function () {
    if (this.x + this.size / 2 >= width) {
        this.velX = -this.velX;
    }

    if (this.x - this.size / 2 <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size / 2 >= height) {
        this.velY = -this.velY;
    }

    if (this.y - this.size / 2 <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

let triangles = [];

while (triangles.length < 25) {
    let size = random(10, 20);
    let triangle = new Triangle(
        random(0 + size / 2, width - size / 2),
        random(0 + size / 2, height - size / 2),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
    );
    triangles.push(triangle);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < triangles.length; i++) {
        triangles[i].draw();
        triangles[i].update();
    }

    requestAnimationFrame(loop);
}

loop();

Triangle.prototype.collisionDetect = function () {
    for (let j = 0; j < triangles.length; j++) {
        if (this!== triangles[j]) {
            const dx = this.x - triangles[j].x;
            const dy = this.y - triangles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size / 2 + triangles[j].size / 2) {
                triangles[j].color = this.color = randomColor();
            }
        }
    }
};