const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");

const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let boardState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let gameActive = true;

// Create cells and add event listeners
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleCellClick(i));
  board.appendChild(cell);
}

// Function to handle cell click
function handleCellClick(cellIndex) {
  if (boardState[cellIndex] === "" && gameActive) {
    boardState[cellIndex] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
      status.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (boardState.every(cell => cell !== "")) {
      status.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Function to check for a win
function checkWin(player) {
  return winningCombinations.some(combination => combination.every(cellIndex => boardState[cellIndex] === player));
}

// Function to render the board
function renderBoard() {
  boardState.forEach((cell, index) => {
    const cellElement = board.children[index];
    cellElement.textContent = cell;
  });
}

// Event listener for restart button
restartButton.addEventListener("click", () => {
  currentPlayer = playerX;
  boardState = Array(9).fill("");
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
});

// Initial rendering of the board
renderBoard();
