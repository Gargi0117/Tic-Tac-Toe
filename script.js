// ======================
// DOM Elements
// ======================

const boxes = document.querySelectorAll(".cell");

const button_mode1 = document.getElementById("mode1"); // Single User
const button_mode2 = document.getElementById("mode2"); // Dual User

const restart = document.getElementById("restart");
const new_game = document.querySelector(".new_button");

const msg_container = document.querySelector(".msg_container");
const msg = document.getElementById("msg");

const clickSound = new Audio("assests/sounds/click.mp3");
const winSound = new Audio("assests/sounds/win.mp3");
const drawSound = new Audio("assests/sounds/draw.mp3");
const errorSound = new Audio("assests/sounds/error.mp3");
// ======================
// Game Variables
// ======================

let currentPlayer = "O";
let gameMode = null;
let gameOver = false;

// ======================
// Winning Patterns
// ======================

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// ======================
// Mode Buttons
// ======================

button_mode1.addEventListener("click", () => {
    clicking();
    gameMode = "AI";
    resetGame();
    enableBoxes();
});

button_mode2.addEventListener("click", () => {
    clicking();
    gameMode = "PVP";
    resetGame();
    enableBoxes();
});

// ======================
// Cell Clicks
// ======================

boxes.forEach((box) => {

    box.addEventListener("click", () => {
        
        if (gameMode === null) {
            errorSound.currentTime = 0;
            errorSound.play();
            alert("Please select a game mode first!");
            return;
        }

        clicking();
        if (gameOver) return;

        if (box.innerText !== "") return;

        box.innerText = currentPlayer;
        box.disabled = true;

        if (checkWinner()) return;

        if (checkDraw()) return;

        if (gameMode === "PVP") {

            currentPlayer = currentPlayer === "O" ? "X" : "O";

        } else {

            randomAI();

            if (checkWinner()) return;

            if (checkDraw()) return;

        }

    });

});

// ======================
// Random AI
// ======================

function randomAI() {

    let empty = [];

    boxes.forEach((box) => {

        if (box.innerText === "") {
            empty.push(box);
        }

    });

    if (empty.length === 0) return;

    const randomIndex = Math.floor(Math.random() * empty.length);

    empty[randomIndex].innerText = "X";
    empty[randomIndex].disabled = true;

}

// ======================
// Winner
// ======================

function checkWinner() {

    for (let pattern of winPattern) {

        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {

            gameOver = true;

            showWinner(a);

            return true;

        }

    }

    return false;

}

// ======================
// Draw
// ======================

function checkDraw() {

    let filled = 0;

    boxes.forEach((box) => {

        if (box.innerText !== "") {

            filled++;

        }

    });

    if (filled === 9) {

        gameOver = true;
        drawSound.currentTime = 0;
        drawSound.play();
        msg.innerText = "DRAW >_<";

        msg_container.classList.remove("hide");

        new_game.classList.remove("hide");

        return true;

    }

    return false;

}

// ======================
// Winner Message
// ======================

function showWinner(winner) {

    let winnerName;

    if (gameMode === "PVP") {

        winnerName = winner === "O"
            ? "Player 1"
            : "Player 2";

    } else {

        winnerName = winner === "O"
            ? "You"
            : "Computer";

    }
    winSound.currentTime = 0;
    winSound.play();
    msg.innerText = `${winnerName} Won!!! 🎉`;

    msg_container.classList.remove("hide");

    new_game.classList.remove("hide");

    disableBoxes();

}

// ======================
// Helpers
// ======================

function disableBoxes() {

    boxes.forEach((box) => {

        box.disabled = true;

    });

}

function enableBoxes() {

    boxes.forEach((box) => {

        box.disabled = false;
        box.innerText = "";

    });

}

function clicking(){
    clickSound.currentTime = 0;
    clickSound.play();
}
// ======================
// Reset
// ======================

function resetGame() {

    currentPlayer = "O";
    gameOver = false;

    enableBoxes();

    msg_container.classList.add("hide");
    new_game.classList.add("hide");

}

// ======================
// Buttons
// ======================

restart.addEventListener("click", (event) =>{
    resetGame();
    clicking();
});

new_game.addEventListener("click", (event) =>{
    resetGame();
    clicking();
});