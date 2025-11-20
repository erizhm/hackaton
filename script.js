document.addEventListener('DOMContentLoaded', () => {

    let gameBoard = document.getElementById("game")
    let failsText = document.getElementById("fails")
    let matchesText = document.getElementById("matches")
    let popup = document.getElementById("popup")
    let popupMessage = document.getElementById("popup-message")
    let closePopupButton = document.getElementById("close-popup")

    let fails = 0
    let matches = 0
    let firstCard = null
    let secondCard = null
    let lockBoard = false
    let gameOver = false // stop saat menang/kalah

    function showPopup(message) {
        popupMessage.textContent = message
        popup.style.display = 'flex'
    }
    
    closePopupButton.addEventListener('click', () => {
        window.location.reload()
    })

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1)); [array[i], array[r]] = [array[r], array[i]]
        }
    }

    let cards = ["A", "A", "B", "B", "C", "C"]
    shuffle(cards)

    cards.forEach((value) => {
        let card = document.createElement("div")
        card.className = "card"
        card.dataset.value = value

        let front = document.createElement("div")
        front.className = "front"
        front.textContent = "?"

        let back = document.createElement("div")
        back.className = "back"
        back.textContent = value

        card.appendChild(front)
        card.appendChild(back)

        card.addEventListener("click", () => clickCard(card))
        gameBoard.appendChild(card)
    });

    function clickCard(card) {
        if (gameOver) return   // stop kalau game selesai
        if (lockBoard) return
        if (card.classList.contains("open") || card.classList.contains("matched")) return
        if (card === firstCard) return

        card.classList.add("open")

        if (!firstCard) {
            firstCard = card
        } else {
            secondCard = card
            lockBoard = true
            setTimeout(checkMatch, 700)
        }
    }

    function checkMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add("matched")
            secondCard.classList.add("matched")
            matches++
            matchesText.textContent = matches
        } else {
            fails++
            failsText.textContent = fails

            setTimeout(() => {
                firstCard.classList.remove("open")
                secondCard.classList.remove("open")
            }, 300)

        }

        // Cek menang/kalah sebelum game selesai
        if (matches === 3) {
            gameOver = true
            setTimeout(() => showPopup("🎉 Kamu Menang!"), 300) 
            return
        }

        if (fails >= 3) {
            gameOver = true
            setTimeout(() => showPopup("💀 Kesempatan habis! Kamu kalah."), 300) 
            return
        }

        // Reset board setelah dipastikan belum game over
        setTimeout(() => {
            firstCard = null
            secondCard = null
            lockBoard = false
        }, 450)
    }

});
