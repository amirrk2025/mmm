const Canvas = document.getElementById("canvas");
const LevelDisplay = document.getElementById("Level");
const KnivesRemainingDisplay = document.getElementById("Knifes_rem");
const fireButton = document.getElementById("fire_btn");

// تنظیم اندازه ثابت برای Canvas
Canvas.width = 500;
Canvas.height = 700;
const ctx = Canvas.getContext("2d");

const knife = new Image();
knife.src = "knife.png";

let startAngle = 2 * Math.PI;
let currentAngle = 0;
let rectheight = Canvas.height - 90;
let knife_moving = 0;
let knifes_remaining = 10;
let hit = 0;
let level = 1;
let flag = 0;
let hit_knifes = [];
const collisionAudio = new Audio("assets/audio/collision.mp3");
const hitAudio = new Audio("assets/audio/hit.mp3");

collisionAudio.onerror = () => console.error("Collision audio not found!");
hitAudio.onerror = () => console.error("Hit audio not found!");

const raf = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function change_status() {
    if (knife_moving === 0) knife_moving = 1;
}

function check_collision(curarc, currec) {
    if (Math.abs(currec.y - curarc.centerY) <= curarc.radius &&
        Math.abs(currec.x - curarc.centerX) <= currec.width / 2) {
        if (!check_rect_collision(curarc)) hitAudio.play();
        hit = 1;
        hit_knifes.push({
            x: currec.x,
            y: currec.y,
            width: currec.width,
            height: currec.height,
            r: curarc.radius,
            angle: 0,
            cangle: curarc.current_angle
        });
        knifes_remaining--;
        return true;
    }
    return false;
}

function check_rect_collision(curarc) {
    for (let i in hit_knifes) {
        if (Math.abs(curarc.current_angle - hit_knifes[i].cangle) < 0.15) {
            collisionAudio.play();
            alert("Aww.. You lost your cool man!");
            window.location.reload();
            return true;
        }
    }
    return false;
}

function Update() {
    if (level == 2 && flag == 0) {
        hit_knifes = [];
        currentAngle = 0;
        knifes_remaining = 8;
        flag++;
    }

    if (knifes_remaining > 0) {
        if (rectheight < 0 || hit == 1) {
            rectheight = Canvas.height - 90;
            knife_moving = 0;
            hit = 0;
        }

        LevelDisplay.textContent = level;
        KnivesRemainingDisplay.textContent = knifes_remaining;

        const current_arc = {
            centerX: Canvas.width / 2,
            centerY: 200,
            radius: 100,
            current_angle: currentAngle,
            direction: false,
            lineWidth: 33
        };

        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        ctx.drawImage(knife, Canvas.width / 2 - 12.5, rectheight, 25, 85);

        for (let i in hit_knifes) {
            ctx.save();
            ctx.translate(Canvas.width / 2, 200);
            ctx.rotate(hit_knifes[i].angle);
            ctx.drawImage(knife, hit_knifes[i].x - Canvas.width / 2, hit_knifes[i].y - 200, 25, 85);
            ctx.restore();
            hit_knifes[i].angle += Math.PI / 180;
            hit_knifes[i].angle %= 2 * Math.PI;
        }

        ctx.beginPath();
        ctx.arc(Canvas.width / 2, 200, 100, startAngle + currentAngle, startAngle + currentAngle + Math.PI * 2, false);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 33.0;
        ctx.stroke();

        currentAngle += Math.PI / 180;
        currentAngle %= 2 * Math.PI;

        if (knife_moving === 1) rectheight -= 15;

        const current_rec = { x: Canvas.width / 2, y: rectheight, width: 25, height: 85 };
        check_collision(current_arc, current_rec);

        raf(Update);
    } else {
        alert("YOU COMPLETED THE LEVEL! CONGRATULATIONS");
        if (level == 4) {
            alert("Thank you for playing the game!");
            window.location.reload();
        }
        level++;
        raf(Update);
    }
}

knife.onload = () => raf(Update);