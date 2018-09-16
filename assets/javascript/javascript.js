
// create an array of word options (just strings no spaces)
const wordBank = [
    "ronaldo", "pogba", "salah", "griezmann", "messi"
];

const images = [
    "<img src= "
];

// Create global variables
var wordIndex = "";
var lettersInWordBank = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];
var letterGuessed = "";
var imagecorrect = "";

var wins = 0;
var losses = 0;
var guessNumber = 15;


function pickRandomWordFromWordBank() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

function startGame() {
    // computer picks a random word from that array
    wordIndex = pickRandomWordFromWordBank()
    lettersInWordBank = wordIndex.split("");
    console.log(wordIndex)
    numBlanks = lettersInWordBank.length;

    blanksAndSuccesses = [];

    wrongGuesses = [];

    // loop over the chosen word to create blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    document.getElementById("guess-text").innerHTML = guessNumber;
    document.getElementById("answer-text").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-text").innerHTML = wrongGuesses.join(" ");
}

// replace corresponding blank with the correct letter
function checkLetters(letter) {
    var letterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (wordIndex[i] === letter) {
            letterInWord = true;
            break;
        }
    }

    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (wordIndex[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
    }
    else {
        wrongGuesses.push(letter);
        guessNumber--;
    }
}

// restart game if user runs out of guesses/ move to next word when no blanks remain
function roundComplete() {
    document.getElementById("guess-text").innerHTML = guessNumber;
    document.getElementById("answer-text").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-text").innerHTML = wrongGuesses.join(" ");

    // compare user guess to letters in chosen word
    // track incorrect guesses and guesses remaining; display to user
    if (lettersInWordBank.toString() === blanksAndSuccesses.toString()) {
        wins++;
        $("#result").append()
        document.getElementById("wins").innerHTML = "Wins: " + wins;

        startGame();
    }
    else if (numGuesses === 0) {
        losses++;
        alert("You lose");
        document.getElementById("losses").innerHTML = "Losses " + losses;

        startGame();
    }
}

startGame();
// capture key events
document.onkeyup = function (event) {

    letterGuessed = String.fromCharCode(event.which).toLowerCase();

    checkLetters(letterGuessed);

    roundComplete();
};






