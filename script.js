let keyCounter = 0;
let text = [];
const container = document.querySelector('.container');
const progressBar = document.querySelector('#bar');
const divArray = [];

document.addEventListener("keydown", changeColor);

function changeColor(e) {
    if (e.key === 'Shift' || e.key === 'Backspace') {
        return;
    }

    if (text[keyCounter] === e.key) {
        divArray[keyCounter].classList.add('correct-key');
    }
    if (text[keyCounter] !== e.key) {
        divArray[keyCounter].classList.add('incorrect-key');
    }

    keyCounter++;

    if (keyCounter === divArray.length) {
        results();
    }
}

function results() {
    calculateAccuracy();
    //calculateWPM();
    displayResults();
}

function calculateAccuracy() {
    let numOfCorrect = 0;
    let accuracy;

    for (let i = 0; i < divArray.length; i++) {
        if(divArray[i].style.color === 'rgb(149, 197, 144)') {
            numOfCorrect += 1;
        }
    }

    accuracy = numOfCorrect * 100 / divArray.length;

    displayResults(accuracy);
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
        const data = await fetch('https://random-word-api.herokuapp.com/word?number=1&diff=1');
        const result = await data.json();

        console.log(result[0]);
        
        text.push(...result[0].split(""), (i < 9) ? " " : "");

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

function playTypingTest() {
    fetchRandomText();
    displayQuote();
}

function displayQuote() {
    
}

window.addEventListener('load', playTypingTest);