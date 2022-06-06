const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockboard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    //   first clicked
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //   second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unFlipCard();
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unFlipCard() {
  lockboard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockboard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
