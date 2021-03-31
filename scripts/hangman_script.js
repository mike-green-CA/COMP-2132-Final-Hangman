// First welcome to Hangman game pop up :)
const delay = 100; //Once the page loads it will pop up.
const popup = document.getElementById('pop-up')

setTimeout(function () {

    const interval = 100;
    let intervalID;
    popup.style.opacity = 0;

    intervalId = setInterval(function () {

        let opacityValue = parseFloat(popup.style.opacity);
        opacityValue += parseFloat(0.1);

        popup.style.opacity = opacityValue;

        if (popup.style.opacity == 1) {
            clearInterval(intervalId);
        }

    }, interval);

}, delay);

// Closing our welcome window.

const popupCloseButton = document.getElementById('btn-close');

popupCloseButton.addEventListener('click', function () {
    popup.style.display = "none";
});

// Now the game itself.
// Lets create a word constructor.

class someWord {
    constructor(word, hint) {
        this.word = word;
        this.hint = hint;
    }

    describeSelf() {
        let description = `\nThe word: ${this.word}, the hint: ${this.hint}`;
        return description;
    }
}

// We'll also create a correctLetter class for correct letters.
class correctLetter {
    constructor(letter, position) {
        this.letter = letter;
        this.position = position;
    }
}

// Now we can whip up a word bank for our game.

class wordBank {
    constructor() {
        //We'll try not to go over 16 letters to keep our '_'s spaced nicely in game.
        this.word = ["Sun", "Cool", "Rainbow", "Explosion", "Anagram", "Snowboard", "Penguin", "COMP"];
        this.hint = ["Plants need this to survive.",
            "Opposite of hot.",
            "ROYGBIV.",
            "Kaboom!",
            "Another type of puzzle with letters.",
            "Ice cold surfing.",
            "An Arctic chicken.",
            "Computer courses at BCIT."];

        // Here is where the words will be stored.
        this.words = [];

        //We'll store our info into our array now.
        for (let counter = 0, size = this.word.length; counter < size; counter++) {
            const aWord = new someWord(this.word[counter], this.hint[counter]);
            this.words[counter] = aWord;
        }
    }
}

// Great we've got our word bank!
// Now we can code the actual game.

let correctGuesses = 0;
let wrongGuesses = 0;
let theWord = ``;
let thewordHint = ``;
let correctLetters = [];

const theWordField = document.getElementById('the-word');
const hangmanPicture = document.getElementById("hangman-image");
const replayButton = document.getElementById("play-button");
const someLetter = document.querySelectorAll(".letters");

play();

//Play The game.
function play() {
    newRandomWord();

    //Reset our variabes.
    wrongGuesses = 0;
    correctGuesses = 0;
    correctLetters = [];
    theWordField.innerHTML = ``;
    someLetter.forEach(function (letter) {
        letter.style.visibility = "visible";
    });
    hangmanPicture.src = `images/hangman-${wrongGuesses}.png`


    console.log(`new random word is: ${theWord}; and the hint is: ${theWordHint}`);

    // Lets add our blank spaces to the html.
    for (let counter = 0; counter < theWord.length; counter++) {
        theWordField.innerHTML += `<div class="blank-space"></div>`;
    }

    //Now we'll add the hint and we're all set up!
    const theHint = document.getElementById('the-hint');
    theHint.innerText = `The hint: ${theWordHint}`;

    // set up the blanks.
    for (let i = 0; i < theWord.length; i++) {
        const newBlank = new correctLetter("", i);
        correctLetters.push(newBlank);
    }
}

//Check the guess.


someLetter.forEach(function (divButton) {
    divButton.addEventListener('click', function () {
        console.log(`landed in click for: ${divButton.innerText}`);
        theLetter = divButton.innerText;
        divButton.style.visibility = "hidden";
        checkGuess(theLetter);
    });
});

function checkGuess(testingLetter) {
    // If the guess is correct.
    if (theWord.toLowerCase().includes(testingLetter.toLowerCase())) {
        console.log("Landed in correct guess!");
        let index = 0;
        const theWordAsArray = Array.from(theWord);
        theWordAsArray.forEach(function (letter) {
            if (testingLetter.toLowerCase() === letter.toLowerCase()) {
                correctGuesses++;
                correctLetters[index].letter = testingLetter;
            }
            index++;
        });

        theWordField.innerHTML = ``;

        // Now we know which blanks need to be updated.
        correctLetters.forEach(function (theLetter) {
            theWordField.innerHTML += `<div class="blank-space">${theLetter.letter}</div>`;
        });

        if (correctGuesses == theWord.length) {
            playAgain(true);
        }
    }
    // If the guess is wrong.
    else {
        wrongGuesses++;
        addBodyPart();
    }
}


//Add body part.
function addBodyPart() {
    hangmanPicture.src = `images/hangman-${wrongGuesses}.png`;
    const interval = 100;
    let intervalId;
    hangmanPicture.style.border = "solid 3px rgba(139, 0, 0, 0.999)";
    let opacityVal = parseFloat(0.999);

    intervalId = setInterval(function () {
        opacityVal = opacityVal - 0.099;
        hangmanPicture.style.border = `solid 3px rgba(139, 0, 0, ${opacityVal})`;

        if (opacityVal < 0) {
            clearInterval(intervalId);
        }
    }, interval);
    if (wrongGuesses == 6) {
        playAgain(false);
    }
}


// Win or lose pop up window launches here.
const playAgainWindow = document.getElementById("play-again-window");
const result = document.getElementById("results-message");
const resultWord = document.getElementById("the-final-word");
const playButton = document.getElementById("play-button");

function playAgain(winIsTrue) {
    if (winIsTrue == true) {
        playAgainWindow.style.display = "block";
        playAgainWindow.style.backgroundColor = "rgb(43, 243, 43)";
        playButton.style.backgroundColor = "rgb(43, 243, 43)";
        result.innerText = "CONGRATULATIONS!";
        resultWord.innerText = theWord;

        const interval = 50;
        let intervalId;
        playAgainWindow.style.opacity = 0;

        // Let the window fade in.
        intervalId = setInterval(function () {

            let opacityValue = parseFloat(playAgainWindow.style.opacity);
            opacityValue += parseFloat(0.1);

            playAgainWindow.style.opacity = opacityValue;

            if (playAgainWindow.style.opacity == 1) {
                clearInterval(intervalId);
            }

        }, interval);

        playButton.addEventListener("click", function () {
            playAgainWindow.style.display = "none";
            play();
        })
    }
    else {
        playAgainWindow.style.display = "block";
        playAgainWindow.style.backgroundColor = "red";
        playButton.style.backgroundColor = "red";
        result.innerText = "OH NO, YOU LOST!";
        resultWord.innerText = theWord;

        const interval = 50;
        let intervalId;
        playAgainWindow.style.opacity = 0;

        // Let the window fade in.
        intervalId = setInterval(function () {

            let opacityValue = parseFloat(playAgainWindow.style.opacity);
            opacityValue += parseFloat(0.1);

            playAgainWindow.style.opacity = opacityValue;

            if (playAgainWindow.style.opacity == 1) {
                clearInterval(intervalId);
            }

        }, interval);

        
        playButton.addEventListener("click", function () {
            playAgainWindow.style.display = "none";
            play();
        })
    }
}


// This function will give us a new random word.
function newRandomWord() {
    const theWordBank = new wordBank();
    // Will choose a number from 0 to the max option in our wordBank.
    const ranNum = Math.floor(Math.random() * theWordBank.words.length);

    console.log(theWordBank.words[ranNum]);
    //Remember this is a word object!
    someRandomWord = theWordBank.words[ranNum];
    theWord = someRandomWord.word;
    theWordHint = someRandomWord.hint;
}




// Animation for the help/ rules drop down.

const $rules_tab = $('.how-to-play-tab');
const $rules = $('.the-rules');

// Hide the rules when page loads.
$rules.hide();

// Drop down handler.
$rules_tab.click(function () {
    $(this).next().slideToggle();
});