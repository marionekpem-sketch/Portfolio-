// Canvas and Context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game Objects
const paddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 0,
    maxSpeed: 5,
    color: '#00FF00'
};

const computerPaddle = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 0,
    speed: 3.5,
    color: '#FF0000'
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    dx: 4,
    dy: 4,
    speed: 4,
    maxSpeed: 8,
    color: '#FFFF00'
};

// Game State
let gameState = {
    running: false,
    paused: false,
    playerScore: 0,
    computerScore: 0
};

// Input Handling
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

let mouseY = canvas.height / 2;

// Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mousemove', handleMouseMove);

function handleKeyDown(e) {
    if (e.key === 'ArrowUp') keys.ArrowUp = true;
    if (e.key === 'ArrowDown') keys.ArrowDown = true;
    if (e.key === ' ') {
        e.preventDefault();
        if (!gameState.running) {
            startGame();
        } else {
            gameState.paused = !gameState.paused;
            updateGameStatus();
        }
    }
    if (e.key.toLowerCase() === 'p') {
        gameState.paused = !gameState.paused;
        updateGameStatus();
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowUp') keys.ArrowUp = false;
    if (e.key === 'ArrowDown') keys.ArrowDown = false;
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
}

// Game Functions
function startGame() {
    gameState.running = true;
    gameState.paused = false;
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed;
    updateScoreboard();
    updateGameStatus();
    gameLoop();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed;
}

function updatePlayerPaddle() {
    // Arrow keys control
    if (keys.ArrowUp && paddle.y > 0) {
        paddle.y -= paddle.maxSpeed;
    }
    if (keys.ArrowDown && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.maxSpeed;
    }

    // Mouse control (average with arrow key position)
    const targetY = mouseY - paddle.height / 2;
    if (targetY !== paddle.y) {
        paddle.y += (targetY - paddle.y) * 0.1; // Smooth follow
    }

    // Keep paddle in bounds
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y > canvas.height - paddle.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function updateComputerPaddle() {
    const computerCenter = computerPaddle.y + computerPaddle.height / 2;
    const ballCenter = ball.y;

    // AI logic with slight imperfection
    if (ballCenter < computerCenter - 35) {
        computerPaddle.y -= computerPaddle.speed;
    } else if (ballCenter > computerCenter + 35) {
        computerPaddle.y += computerPaddle.speed;
    }

    // Keep paddle in bounds
    if (computerPaddle.y < 0) computerPaddle.y = 0;
    if (computerPaddle.y > canvas.height - computerPaddle.height) {
        computerPaddle.y = canvas.height - computerPaddle.height;
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Ball collision with paddles
    checkPaddleCollision(paddle);
    checkPaddleCollision(computerPaddle);

    // Ball out of bounds (score points)
    if (ball.x - ball.radius < 0) {
        gameState.computerScore++;
        updateScoreboard();
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        gameState.playerScore++;
        updateScoreboard();
        resetBall();
    }
}

function checkPaddleCollision(paddle) {
    // Check if ball is within paddle's vertical range
    if (ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y) {
        
        // Check if ball is within paddle's horizontal range
        if ((ball.dx < 0 && ball.x - ball.radius <= paddle.x + paddle.width) ||
            (ball.dx > 0 && ball.x + ball.radius >= paddle.x)) {
            
            // Ball collision detected
            ball.dx = -ball.dx;
            
            // Add spin based on where ball hits the paddle
            const hitPos = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
            ball.dy += hitPos * 3;

            // Increase ball speed slightly (cap at maxSpeed)
            const speed = Math.sqrt(ball.dx ** 2 + ball.dy ** 2);
            if (speed < ball.maxSpeed) {
                ball.dx *= 1.05;
                ball.dy *= 1.05;
            }

            // Push ball outside paddle to prevent multiple collisions
            if (ball.dx < 0) {
                ball.x = paddle.x + paddle.width + ball.radius;
            } else {
                ball.x = paddle.x - ball.radius;
            }
        }
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    drawPaddle(paddle);
    drawPaddle(computerPaddle);

    // Draw ball
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle(paddle) {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function updateScoreboard() {
    document.getElementById('playerScore').textContent = gameState.playerScore;
    document.getElementById('computerScore').textContent = gameState.computerScore;
}

function updateGameStatus() {
    const statusEl = document.getElementById('gameStatus');
    if (!gameState.running) {
        statusEl.textContent = 'Press SPACE to start';
        statusEl.style.color = '#90EE90';
    } else if (gameState.paused) {
        statusEl.textContent = 'PAUSED - Press P to resume';
        statusEl.style.color = '#FF6347';
    } else {
        statusEl.textContent = 'PLAYING';
        statusEl.style.color = '#00FF00';
    }
}

function gameLoop() {
    if (!gameState.running) return;

    if (!gameState.paused) {
        updatePlayerPaddle();
        updateComputerPaddle();
        updateBall();
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize
updateGameStatus();
draw();