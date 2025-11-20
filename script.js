let gameBoard = document.getElementById("game");
let failsText = document.getElementById("fails");
let matchesText = document.getElementById("matches");

let fails = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

  // dua sisi kartu
  let front = document.createElement("div");
  front.className = "front";
  front.textContent = "?";

  let back = document.createElement("div");
  back.className = "back";
  back.textContent = value;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => clickCard(card));
  gameBoard.appendChild(card);
});

function clickCard(card) {
  if (lockBoard) return;
  if (card.classList.contains("open") || card.classList.contains("matched")) return;
  if (card === firstCard) return; // ⛔ cegah double click kartu pertama

  card.classList.add("open");
  card.textContent = card.dataset.value;

  if (!firstCard) {
    firstCard = card;

    // kunci sebentar agar user tidak bisa spam
    lockBoard = true;
    setTimeout(() => { lockBoard = false }, 150);

  } else {
    secondCard = card;

    // kunci sampai checkMatch selesai
    lockBoard = true;
    setTimeout(() => {
      checkMatch();
    }, 700);
  }
}



function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    matchesText.textContent = matches;
  } else {
    fails++;
    failsText.textContent = fails;

    firstCard.classList.remove("open");
    secondCard.classList.remove("open");

    firstCard.textContent = "?";
    secondCard.textContent = "?";
  }

  firstCard = null;
  secondCard = null;

  lockBoard = false; // 🔓 buka kembali klik setelah selesai

  if (matches === 3) {
    setTimeout(() => alert("Kamu Menang! 🎉"), 300);
  }
  if (fails >= 6) {
    setTimeout(() => alert("Kesempatan habis! Coba lagi."), 300);
  }
}
