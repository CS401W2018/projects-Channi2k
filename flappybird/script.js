// Simple Flappy Bird Game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.25;
const FLAP = -5;
const SPAWN_RATE = 90;
const PIPE_WIDTH = 50;
const PIPE_SPACING = 200;
const BIRD_SIZE = 20;
const GAME_SPEED = 2;

let birdY = canvas.height / 2;
let birdVelocity = 0;
let birdFlapping = false;

let pipes = [];
let score = 0;

const bird = {
    x: 50,
    y: birdY,
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    draw: function() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    flap: function() {
        birdVelocity = FLAP;
    }
};

const pipe = {
    x: canvas.width,
    width: PIPE_WIDTH,
    gap: 150,
    draw: function(pipeX, topHeight, bottomHeight) {
        ctx.fillStyle = "green";
        ctx.fillRect(pipeX, 0, this.width, topHeight);
        ctx.fillRect(pipeX, canvas.height - bottomHeight, this.width, bottomHeight);
    }
};

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move bird
    birdVelocity += GRAVITY;
    bird.y += birdVelocity;
    bird.draw();

    // Check if bird hits the ground or ceiling
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        resetGame();
    }

    // Move pipes and check for collision
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= GAME_SPEED;
        if (pipes[i].x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
            score++;
        } else {
            pipe.draw(pipes[i].x, pipes[i].topHeight, pipes[i].bottomHeight);
            if (bird.x + BIRD_SIZE > pipes[i].x && bird.x < pipes[i].x + PIPE_WIDTH && (bird.y < pipes[i].topHeight || bird.y + BIRD_SIZE > canvas.height - pipes[i].bottomHeight)) {
                resetGame();
            }
        }
    }

    // Spawn new pipes
    if (frames % SPAWN_RATE === 0) {
        const topHeight = Math.floor(Math.random() * (canvas.height / 2));
        const bottomHeight = canvas.height - topHeight - PIPE_SPACING;
        pipes.push({
            x: canvas.width,
            topHeight: topHeight,
            bottomHeight: bottomHeight
        });
    }

    // Display score
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function resetGame() {
    pipes = [];
    bird.y = canvas.height / 2;
    birdVelocity = 0;
    score = 0;
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        bird.flap();
    }
});

let frames = 0;
function gameLoop() {
    frames++;
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
