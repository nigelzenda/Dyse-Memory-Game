const shapes = ['🔺', '🔵', '🟢', '🟡', '🔶', '🟣', '🔻', '🟠'];
const doubleShapes = [...shapes, ...shapes]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById('gameboard');
const resetButton = document.getElementById('reset');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(doubleShapes);
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCards = [];

  doubleShapes.forEach(shape => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.shape = shape;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (
    flippedCards.length < 2 &&
    !this.classList.contains('flipped') &&
    !this.classList.contains('matched')
  ) {
    this.classList.add('flipped');
    this.textContent = this.dataset.shape;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.shape === card2.dataset.shape) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === doubleShapes.length) {
      setTimeout(() => alert("You've matched all the cards!"), 200);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

resetButton.addEventListener('click', createBoard);

createBoard(); // Initialize
