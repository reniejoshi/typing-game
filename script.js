let keyCounter = 0;
let text = [];
const container = document.querySelector('.container');
const progressBar = document.querySelector('#bar');
const divArray = [];

function handleKeyPress(e) {
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
        results();
    }
}

function results() {
    calculateAccuracy();
    //calculateWPM();
    //displayResults();
}

function calculateAccuracy() {
    let correctLetterCount = 0;

    for (let i = 0; i < divArray.length; i++) {
        if(divArray[i].classList.contains('correct-key')) {
            correctLetterCount += 1;
        }
    }

    const accuracy = correctLetterCount * 100 / divArray.length;

    console.log("Accuracy: " + accuracy + "%");
}

function calculateWPM() {
    const seconds = 60;
    const WPM = words / seconds;
}

function displayResults(accuracy) {
    document.getElementById('complete').innerHTML = "Typing Test Complete!";
    document.getElementById('test-name').innerHTML = "You typed the <b>Accuracy Calculator Typing Test</b>";
    document.getElementById('accuracy').innerHTML = "Your accuracy was ";
    document.getElementById('accuracy-percentage').innerHTML = accuracy + "%";
}

async function fetchRandomText() {
    let progressBarWidth = 0;
    for (let i = 0; i < 10; i++) {
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