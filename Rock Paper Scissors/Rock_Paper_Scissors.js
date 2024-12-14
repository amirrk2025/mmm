const choices = ["rock", "paper", "scissors"];
const playerChoiceSpan = document.getElementById("player-choice");
const computerChoiceSpan = document.getElementById("computer-choice");
const gameResultSpan = document.getElementById("game-result");

document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        playerChoiceSpan.textContent = capitalize(playerChoice);
        computerChoiceSpan.textContent = capitalize(computerChoice);

        const result = getResult(playerChoice, computerChoice);
        gameResultSpan.textContent = result;

        // اضافه کردن انیمیشن نتیجه
        gameResultSpan.classList.add("highlight");
        setTimeout(() => gameResultSpan.classList.remove("highlight"), 500);
    });
});

function getResult(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
