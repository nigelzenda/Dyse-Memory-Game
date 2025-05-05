const allShapes = ['🔺', '🔵', '🟢', '🟡', '🔶', '🟣', '🔻', '🟠', '🔷', '⬛', '⬜', '🔳'];
let level = 1;
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById('gameboard');
const resetButton = document.getElementById('reset');
const levelDisplay = document.getElementById('level');

// Create next level button
const nextLevelButton = document.createElement('a');
nextLevelButton.href = '#';
nextLevelButton.textContent = 'Next Level';
nextLevelButton.classList.add('next-level');
nextLevelButton.style.display = 'none';
document.querySelector('.actions').appendChild(nextLevelButton);

nextLevelButton.addEventListener('click', () => {
  level++;
  levelDisplay.textContent = level;
  createBoard();
  nextLevelButton.style.display = 'none';
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const shapeCount = Math.min(level * 2, allShapes.length);
  const levelShapes = allShapes.slice(0, shapeCount);
  const doubleShapes = [...levelShapes, ...levelShapes];

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
    if (matchedCards.length === level * 4) {
      setTimeout(() => {
        alert(`Great job! Level ${level} completed.`);
        nextLevelButton.style.display = 'inline-block';
      }, 500);
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

resetButton.addEventListener('click', () => {
  level = 1;
  levelDisplay.textContent = level;
  createBoard();
  nextLevelButton.style.display = 'none';
});

createBoard();