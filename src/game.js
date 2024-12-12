const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let mario = {
    x: 50,
    y: 550,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    velocityX: 0,
    velocityY: 0,
    jumping: false
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        mario.velocityX = -mario.speed;
    } else if (event.code === 'ArrowRight') {
        mario.velocityX = mario.speed;
    } else if (event.code === 'ArrowUp' && !mario.jumping) {
        mario.velocityY = -15;
        mario.jumping = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        mario.velocityX = 0;
    }
});

function drawMario() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = mario.color;
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function update() {
    mario.x += mario.velocityX;
    mario.velocityY += 0.5; // Gravity
    mario.y += mario.velocityY;

    // Prevent Mario from falling through the floor
    if (mario.y + mario.height >= canvas.height) {
        mario.y = canvas.height - mario.height;
        mario.velocityY = 0;
        mario.jumping = false;
    }
}

function gameLoop() {
    update();
    drawMario();
    requestAnimationFrame(gameLoop);
}

gameLoop();
