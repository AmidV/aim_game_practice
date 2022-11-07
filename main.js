const btnStart = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = ["#00c9c8", "#00b4de", "#0099e4", "#7278d0", "#a150a1", "#ae2761"];
let time = 0;
let score = 0;

btnStart.addEventListener("click", (event) => {
    event.preventDefault();
    screens[0].classList.add("up");
})

timeList.addEventListener("click", (event) => {
    if(event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"));
        screens[1].classList.add("up");
        startGame();
    }
})

board.addEventListener("click", event => {
    if(event.target.classList.contains("circle")) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}
 
function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement("div");
    const size = getRandomNum(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNum(0, width - size);
    const y = getRandomNum(0, height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
    setCircleColor(circle);
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Circle Colors
function setCircleColor(event) {
    const color = getColor();
    event.style.background = color;
}

function getColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

// AUTOMATED feature to earn max score
// To start you will need to call getMaxScore() function manualy in Console in Inspect window

// ------------- code start ----------------
// function getMaxScore() {
//     function start() {
//         const circle = document.querySelector(".circle"); 
//         if(circle) {
//             circle.click();
//         }
//     }
// -=COMMENT_=-  Change the second argument in setInterval for adjusting clicking speed
//     setInterval(start, 45)
// }

// ------------- code end ----------------
