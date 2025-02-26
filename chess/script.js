const board = document.getElementById('chessboard');

// Chess pieces setup
const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Function to create the board and initialize the pieces
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 0) square.classList.add('dark');
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener('click', handleSquareClick);

            // Set initial pieces
            if (initialBoard[row][col]) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.textContent = initialBoard[row][col];
                square.appendChild(piece);
            }

            board.appendChild(square);
        }
    }
}

// Handle click events on squares
let selectedSquare = null;

function handleSquareClick(event) {
    const clickedSquare = event.target;

    // If a piece is already selected, try to move it
    if (selectedSquare) {
        movePiece(clickedSquare);
        selectedSquare = null;
        updateBoard();
        return;
    }

    // Otherwise, select the clicked square
    selectedSquare = clickedSquare;
}

function movePiece(targetSquare) {
    const selectedPiece = selectedSquare.querySelector('.piece');
    const targetPiece = targetSquare.querySelector('.piece');

    // If the target square has a piece, replace it with the selected piece
    if (targetPiece) {
        targetSquare.removeChild(targetPiece);
    }

    targetSquare.appendChild(selectedPiece);
}

function updateBoard() {
    // This function can be enhanced to manage game state (valid moves, turns, etc.)
}

// Create the chessboard on page load
createBoard();
