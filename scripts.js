const cards = document .querySelectorAll('.memory-card');
const resetBtn = document.getElementById('resetBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; 
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false;
        secondCard = this;
       checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    matchedPairs++;  // ✅ increase count

    if (matchedPairs === cards.length / 2) {
        setTimeout(() => {
            alert("🎉 Yay! You won! 🎉");
        }, 500);
    }

    resetBoard();
}
function unflipCards() {
    lockBoard = true;
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        },1500);
    }
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
function resetGame() {
  matchedPairs = 0;

  cards.forEach(card => {
    card.classList.remove('flip');     
    card.addEventListener('click', flipCard);
  });

 
  setTimeout(() => shuffle(), 500);
}

cards.forEach(card => card.addEventListener('click', flipCard));
resetBtn.addEventListener('click', resetGame);

