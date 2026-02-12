let keyCounter = 0;
let text = [];
let startTime;
const container = document.querySelector('.container');
const progressBar = document.querySelector('#bar');
const divArray = [];
const wordCount = 10;

function handleKeyPress(e) {
    if (keyCounter == 0) {
        startTime = Date.now();
    }

    // TODO: Allow backspace
    if (e.key == 'Shift' || e.key == 'Backspace') {
        return;
    } else if (text[keyCounter] == e.key) {
        divArray[keyCounter].classList.add('correct-key');
    } else {
        divArray[keyCounter].classList.add('incorrect-key');
    }

    keyCounter++;

    if (keyCounter == text.length) {
        document.removeEventListener('keydown', handleKeyPress);
        displayScore();
    }
}

function displayScore() {
    let correctLetterCount = 0;

    for (let i = 0; i < divArray.length; i++) {
        if(divArray[i].classList.contains('correct-key')) {
            correctLetterCount += 1;
        }
    }

    const accuracy = Math.round(correctLetterCount * 100 / divArray.length);

    console.log("Accuracy: " + accuracy + "%");

    const endTime = Date.now();
    const minutes = (endTime - startTime) / 60000
    const wordsPerMinute = Math.round(wordCount / minutes);
    console.log(wordsPerMinute + " wpm");

    divArray.forEach((div) => {
        div.remove();
    });
}

async function fetchRandomText() {
    let progressBarWidth = 0;
    for (let i = 0; i < wordCount; i++) {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&diff=1');
        const words = await response.json();

        console.log(words[0]);
        
        (i < 9) ? text.push(...words[0].split(""), " ") : text.push(...words[0].split(""));

        progressBarWidth += 10;
        progressBar.style.width = progressBarWidth + "%";
    }

    for (let i = 0; i < text.length; i++) {
        divArray[i] = document.createElement('div');
        divArray[i].textContent = text[i];
        divArray[i].className = "divArray";
        container.append(divArray[i]);
    }
}

async function playTypingGame() {
    await fetchRandomText();
    document.addEventListener("keydown", handleKeyPress);
}

window.addEventListener('load', playTypingGame);