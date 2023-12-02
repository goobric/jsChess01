// General App Configuration

const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');

const infoDisplay = document.querySelector('#info-display');

const width = 8;

// Who's turn is it?
let playerGo = 'black';
playerDisplay.textContent = 'black';

// Array of 64 items (64 chess pieces)
const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];
// Create the board array
function createBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.innerHTML = startPiece;
    square.firstChild && square.firstChild.setAttribute('draggable', 'true');
    square.setAttribute('square-id', i);
    // square.classList.add('beige');
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
    } else {
      square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
    }
    if (i <= 15) {
      square.firstChild.firstChild.classList.add('black');
    }
    if (i >= 48) {
      square.firstChild.firstChild.classList.add('white');
    }
    gameBoard.append(square);
  });
}
// Call the createBoard function
createBoard();

// Select all the squares
const allSquares = document.querySelectorAll('#gameboard .square');
// all squares in the node list
console.log(allSquares);

allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart);
  square.addEventListener('dragover', dragOver);
  square.addEventListener('dragenter', dragEnter);
  square.addEventListener('dragleave', dragLeave);
  square.addEventListener('drop', dragDrop);
  square.addEventListener('dragend', dragEnd);
});

// Drag Functions
let startPositionId = null;
let draggedElement = null;

function dragStart(e) {
  // console.log(e.target.parentNode.getAttribute('square-id'));
  startPositionId = e.target.parentNode.getAttribute('square-id');
  draggedElement = e.target;
};
function dragOver(e) {
  e.preventDefault();
  // console.log(e.target);
};
function dragEnter(e) {
  e.preventDefault();
  // console.log(e.target);
};
function dragLeave(e) {
  // console.log(e.target);
};
function dragDrop(e) {
  // console.log(e.target);
  e.stopPropagation();
  console.log('playerGo', playerGo);
  console.log('opponentGo', opponentGo);
  console.log('e.target', e.target);
  const correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const taken = e.target.classList.contains('piece');
  const opponentGo = playerGo === 'white' ? 'black' : 'white';
  const takenByOpponent = e.target.firstChild.classList.contains(opponentGo);

  if (correctGo) {
    // must check this first
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }
    // then check this
    if (taken) {
      return;
    }
  }

  e.target.parentNode.append(draggedElement);
  e.target.remove();

  changePlayer();
};

function changePlayer() {
  // playerGo = playerGo === 'black' ? 'white' : 'black';
  // playerDisplay.textContent = playerGo;
  if (playerGo === 'black'){
    reverseIds();
    playerGo = 'white';
    playerDisplay.textContent = 'white';
  } else {
    revertIds();
    playerGo = 'black';
    playerDisplay.textContent = 'black';
  };
};

// reverse the board
function reverseIds(){
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach(square, i => square.setAttribute('square-id', (width * width) - 1 - i))
};
function revertIds(){
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach(square, i => square.setAttribute('square-id', i))
};