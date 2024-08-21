document.addEventListener('DOMContentLoaded', function() {
    const symbols = ['🍒', '🍋', '🔔', '⭐'];
    let points = 0;
    let isSpinning = false;

    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const pointsDisplay = document.getElementById('pointsDisplay');
    const messageDisplay = document.getElementById('messageDisplay');

    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function spinReels() {
        if (isSpinning) return;
        isSpinning = true;

        const spinDuration = 2000; // 2 seconds
        const endTime = Date.now() + spinDuration;

        function updateReels() {
            if (Date.now() < endTime) {
                reel1.textContent = getRandomSymbol();
                reel2.textContent = getRandomSymbol();
                reel3.textContent = getRandomSymbol();
                requestAnimationFrame(updateReels);
            } else {
                reel1.textContent = getRandomSymbol();
                reel2.textContent = getRandomSymbol();
                reel3.textContent = getRandomSymbol();
                checkResult();
                isSpinning = false;
            }
        }

        updateReels();
    }

    function checkResult() {
        const result1 = reel1.textContent;
        const result2 = reel2.textContent;
        const result3 = reel3.textContent;

        if (result1 === result2 && result2 === result3) {
            points += 100;
            messageDisplay.textContent = `You won 100 points!`;
        } else if (result1 === result2 || result2 === result3 || result1 === result3) {
            points += 10;
            messageDisplay.textContent = `You won 10 points!`;
        } else {
            messageDisplay.textContent = `No match, try again!`;
        }

        pointsDisplay.textContent = `Points: ${points}`;
    }

    function resetGame() {
        points = 0;
        pointsDisplay.textContent = `Points: ${points}`;
        messageDisplay.textContent = '';
        reel1.textContent = reel2.textContent = reel3.textContent = '';
    }

    document.getElementById('spinButton').addEventListener('click', spinReels);
    document.getElementById('resetButton').addEventListener('click', resetGame);
});
