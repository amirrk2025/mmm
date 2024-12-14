const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const shooter = document.getElementById('shooter');
const scoreDisplay = document.getElementById('score');

let score = 0;
let gameInterval, targetInterval;
const bullets = [];
const targets = [];

// حرکت شوتر با ماوس
gameArea.addEventListener('mousemove', (event) => {
    const rect = gameArea.getBoundingClientRect();
    let shooterX = event.clientX - rect.left - shooter.offsetWidth / 2;
    shooterX = Math.max(0, Math.min(shooterX, gameArea.clientWidth - shooter.offsetWidth));
    shooter.style.left = `${shooterX}px`;
});

// شلیک گلوله با اسپیس
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        shootBullet();
    }
});

function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    const shooterX = shooter.offsetLeft + shooter.offsetWidth / 2 - 5;
    bullet.style.left = `${shooterX}px`;
    bullet.style.bottom = '60px';
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// حرکت گلوله‌ها
function moveBullets() {
    bullets.forEach((bullet, index) => {
        const bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom >= gameArea.clientHeight) {
            bullet.remove();
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = `${bulletBottom + 10}px`;
        }
    });
}

// ایجاد هدف
function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;
    target.style.top = '0px';
    gameArea.appendChild(target);
    targets.push(target);
}

// حرکت اهداف
function moveTargets() {
    targets.forEach((target, index) => {
        const targetTop = parseInt(target.style.top);
        if (targetTop >= gameArea.clientHeight) {
            target.remove();
            targets.splice(index, 1);
            score--;
            scoreDisplay.textContent = score;
        } else {
            target.style.top = `${targetTop + 5}px`;
        }
    });
}

// برخورد گلوله‌ها با اهداف
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        const bulletRect = bullet.getBoundingClientRect();
        targets.forEach((target, tIndex) => {
            const targetRect = target.getBoundingClientRect();
            if (
                bulletRect.left < targetRect.right &&
                bulletRect.right > targetRect.left &&
                bulletRect.top < targetRect.bottom &&
                bulletRect.bottom > targetRect.top
            ) {
                // حذف گلوله و هدف
                bullet.remove();
                target.remove();
                bullets.splice(bIndex, 1);
                targets.splice(tIndex, 1);

                // افزایش امتیاز
                score++;
                scoreDisplay.textContent = score;
            }
        });
    });
}

// شروع بازی
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startBtn.style.display = 'none';

    gameInterval = setInterval(() => {
        moveBullets();
        moveTargets();
        checkCollisions();
    }, 50);

    targetInterval = setInterval(() => {
        createTarget();
    }, 1000);

    // پایان بازی بعد از 60 ثانیه
    setTimeout(() => {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        alert(`بازی تمام شد! امتیاز شما: ${score}`);
        startBtn.style.display = 'block';
        resetGame();
    }, 60000);
}

// ریست کردن بازی
function resetGame() {
    bullets.forEach((bullet) => bullet.remove());
    targets.forEach((target) => target.remove());
    bullets.length = 0;
    targets.length = 0;
}

startBtn.addEventListener('click', startGame);
