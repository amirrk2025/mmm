const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let playerScore = 0;
let aiScore = 0;

function drawPaddle(x, y) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(x, y, ballSize, 0, Math.PI * 2);
    context.fill();
}

function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('aiScore').textContent = aiScore;
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            ballSpeedX *= 1.05; // Speed up on hit
            ballSpeedY *= 1.05; // Speed up on hit
        } else {
            aiScore++;
            resetBall();
        }
    }

    if (ballX >= canvas.width - paddleWidth) {
        if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            ballSpeedX *= 1.05; // Speed up on hit
            ballSpeedY *= 1.05; // Speed up on hit
        } else {
            playerScore++;
            resetBall();
        }
    }

    // AI paddle movement
    aiPaddleY += (ballY - (aiPaddleY + paddleHeight / 2)) * 0.1;

    // Boundaries for paddles
    if (aiPaddleY < 0) aiPaddleY = 0;
    if (aiPaddleY > canvas.height - paddleHeight) aiPaddleY = canvas.height - paddleHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, playerPaddleY); // Player's paddle
    drawPaddle(canvas.width - paddleWidth, aiPaddleY); // AI paddle
    drawBall(ballX, ballY);
    updateScore();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5; // Reset speed
    ballSpeedY = 3; // Reset speed
}

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    playerPaddleY = e.clientY - rect.top - paddleHeight / 2;
    if (playerPaddleY < 0) playerPaddleY = 0;
    if (playerPaddleY > canvas.height - paddleHeight) playerPaddleY = canvas.height - paddleHeight;
});

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
