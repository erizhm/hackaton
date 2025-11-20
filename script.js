let gameBoard = document.getElementById("game");
let failsText = document.getElementById("fails");
let matchesText = document.getElementById("matches");

let fails = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;

// shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let tukar = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[tukar];
    array[tukar] = temp;
  }
}

// 3 pasang = total 6 kartu
let cards = ["A", "A", "B", "B", "C", "C"];

shuffle(cards);

// DOM
cards.forEach((value) => {
  let card = document.createElement("div");
  card.className = "card";
  card.dataset.value = value;
  card.textContent = "?";

  card.addEventListener("click", () => clickCard(card));
  gameBoard.appendChild(card);
});

function clickCard(card) {
  if (card.classList.contains("open") || card.classList.contains("matched")) {
    return;
  }

  // buka kartu
  card.classList.add("open");
  card.textContent = card.dataset.value;

  if (!firstCard) {
    firstCard = card;

    // kartu pertama ditutup setelah 1 detik
    setTimeout(() => {
      if (firstCard && !firstCard.classList.contains("matched")) {
        firstCard.classList.remove("open");
        firstCard.textContent = "?";
      }
    }, 1000);

  } else if (!secondCard) {
    secondCard = card;

    // kartu kedua ditutup setelah 1 detik
    setTimeout(() => {
      checkMatch();
    }, 1000);
  }
}

function checkMatch() {
  if (!firstCard || !secondCard) return;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    // match
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    matchesText.textContent = matches;
  } else {
    // gagal
    fails++;
    failsText.textContent = fails;

    firstCard.classList.remove("open");
    secondCard.classList.remove("open");

    firstCard.textContent = "?";
    secondCard.textContent = "?";
  }

  firstCard = null;
  secondCard = null;

  // cek menang
  if (matches === 3) {
    setTimeout(() => alert("Kamu Menang! 🎉"), 500);
  }

  // cek kalah
  if (fails >= 6) {
    setTimeout(() => alert("Kesempatan habis! Coba lagi."), 500);
  }
}
