const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const playerXButton = document.getElementById('playerX');
const playerOButton = document.getElementById('playerO');
const playerSelection = document.getElementById('playerSelection');

let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

playerXButton.addEventListener('click', () => startGame('x'));
playerOButton.addEventListener('click', () => startGame('o'));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function startGame(player) {
    currentPlayer = player;
    gameActive = true;
    playerSelection.style.display = 'none';
    document.getElementById('gameBoard').style.display = 'grid';
    resetButton.style.display = 'block';
    statusText.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer.toUpperCase();
    cell.classList.add(currentPlayer);

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const condition = [board[a], board[b], board[c]];

        if (condition.includes('') || new Set(condition).size !== 1) {
            continue;
        }

        roundWon = true;
        cells[a].classList.add('winning-cell');
        cells[b].classList.add('winning-cell');
        cells[c].classList.add('winning-cell');
        break;
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer.toUpperCase()} wins!`;
        statusText.classList.remove('status');
        statusText.classList.add('winner');
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = 'Draw';
        statusText.classList.add('winner');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    statusText.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    statusText.classList.remove('winner');
}

function resetGame() {
    currentPlayer = '';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    statusText.textContent = `Elige tu jugador para empezar`;
    statusText.classList.remove('winner');
    playerSelection.style.display = 'block';
    document.getElementById('gameBoard').style.display = 'none';
    resetButton.style.display = 'none';

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
    });
}
