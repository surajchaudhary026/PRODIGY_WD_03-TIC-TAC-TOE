let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const gameContainer = document.getElementById("game");
const statusDisplay = document.getElementById("status");

// Create cells dynamically
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-index", i);
  cell.addEventListener("click", handlePlayerMove);
  gameContainer.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

function handlePlayerMove(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

  makeMove(index, "X");

  if (checkGameEnd("X")) return;

  // Delay AI move slightly
  setTimeout(() => {
    const aiIndex = getRandomAIMove();
    if (aiIndex !== -1) {
      makeMove(aiIndex, "O");
      checkGameEnd("O");
    }
  }, 400);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  currentPlayer = player === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function getRandomAIMove() {
  const emptyIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return -1;

  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}

function checkGameEnd(player) {
  if (checkWinner(player)) {
    statusDisplay.textContent = `${player} Wins! 🎉`;
    gameActive = false;
    return true;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function checkWinner(player) {
  return winConditions.some(combo =>
    combo.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ""));
  statusDisplay.textContent = "";
}
