let score = 0;
let round = 0;
let maxRounds = 10;
let rootNote = "";
let intervalNote = "";
let randomInterval = 0;

maxIndexOut = 36; //exclusive: for highest root note possible without running out of higher intervals
minIndexOut = 0;
maxInterval = 13; //exclusive
minInterval = 1;

const PITCHES = [
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6"
    ];

const INTERVALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


//Defining Functions:

function restartGame(){
    score = 0;
    round = 0;

    document.getElementById("score").innerText = score;
}

function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function restartRound(){
    randomRootNote = Math.floor(Math.random() * (maxIndexOut - minIndexOut) + minIndexOut);
    rootNote = PITCHES[randomRootNote];
    randomInterval = Math.floor(Math.random() * (maxInterval - minInterval) + minInterval);
    intervalNote = PITCHES[randomRootNote + randomInterval];

    document.getElementById("root-button").innerText = rootNote;
}

function getIntervalChoicesHard(){
    copyIntervals = [...INTERVALS];
    copyIntervals.splice(copyIntervals.indexOf(randomInterval), 1);
    randomRemove = Math.floor(Math.random() * 11);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 10);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 9);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 8);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyIntervals.splice(randomRemove, 1);
    copyIntervals.push(randomInterval);
    shuffleArray(copyIntervals);
    document.getElementById("hard-1").innerText = copyIntervals[0];
    document.getElementById("hard-2").innerText = copyIntervals[1];
    document.getElementById("hard-3").innerText = copyIntervals[2];
    document.getElementById("hard-4").innerText = copyIntervals[3];
    document.getElementById("hard-5").innerText = copyIntervals[4];
    document.getElementById("hard-6").innerText = copyIntervals[5];
    document.getElementById("hard-7").innerText = copyIntervals[6];
}

function getIntervalChoicesMedium(){
    copyIntervals = [...INTERVALS];
    copyIntervals.splice(copyIntervals.indexOf(randomInterval), 1);
    randomRemove = Math.floor(Math.random() * 11);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 10);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 9);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 8);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 6);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 5);
    copyIntervals.splice(randomRemove, 1);
    copyIntervals.push(randomInterval);
    shuffleArray(copyIntervals);

    document.getElementById("med-1").innerText = copyIntervals[0];
    document.getElementById("med-2").innerText = copyIntervals[1];
    document.getElementById("med-3").innerText = copyIntervals[2];
    document.getElementById("med-4").innerText = copyIntervals[3];
    document.getElementById("med-5").innerText = copyIntervals[4];
}

function getIntervalChoicesEasy(){
    copyIntervals = [...INTERVALS];
    copyIntervals.splice(copyIntervals.indexOf(randomInterval), 1);
    randomRemove = Math.floor(Math.random() * 11);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 10);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 9);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 8);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 6);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 5);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 4);
    copyIntervals.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 3);
    copyIntervals.splice(randomRemove, 1);
    copyIntervals.push(randomInterval);
    shuffleArray(copyIntervals);

    document.getElementById("easy-1").innerText = copyIntervals[0];
    document.getElementById("easy-2").innerText = copyIntervals[1];
    document.getElementById("easy-3").innerText = copyIntervals[2];
}

function playInterval(){
    synth.triggerAttackRelease(intervalNote, "8n");
}

function checkAnswer(givenAnswer){
    if(givenAnswer == randomInterval){
        score+=1;
    }

    document.getElementById("score").innerText = score;
}

function checkRoundCount(){
    round+=1;
    if(round == maxRounds){
        console.log("GAME OVER");
        document.getElementById("gameover").style.display = "inline";
        document.getElementById("gameover").innerText = "Game Over! Your score is " + score + "/10";
        document.getElementById("save").style.display = "inline";
        document.getElementById("yes").style.display = "inline";
        document.getElementById("no").style.display = "inline";
    }
}


//Setting up tone producer:
var synth = new Tone.PolySynth().toDestination();

//Setting up and Starting Game:
restartGame();
restartRound();
getIntervalChoicesHard();


//Action Handlers:
document.getElementById("play-root-button").onclick = function() {
    synth.triggerAttackRelease(rootNote, "8n");
    setTimeout(function(){
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "inline";
    }, 1000)
}

document.getElementById("repeat").onclick = function() {
    playInterval();
    document.getElementById("repeat").innerText = "Repeat Interval";
    setTimeout(function(){
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "inline";
    }, 1000)
}

document.getElementById("start-tutorial").onclick = function() {
    document.getElementById("interval-tutorial-intro").style.display = "none";
    document.getElementById("start-tutorial").style.display = "none";
    document.getElementById("step1").style.display = "inline";
}

document.getElementById("next-tutorial").onclick = function() {
    document.getElementById("step4b").style.display = "none";
    document.getElementById("minor-2nd").style.display = "none";
    document.getElementById("next-tutorial").style.display = "none";
    document.getElementById("step4c").style.display = "inline";
    document.getElementById("next-tutorial2").style.display = "inline";
    document.getElementById("major-2nd").style.display = "inline";
    document.getElementById("minor-3rd").style.display = "inline";
    document.getElementById("major-3rd").style.display = "inline";
    document.getElementById("perfect-4th").style.display = "inline";
}

document.getElementById("next-tutorial2").onclick = function() {
    document.getElementById("step4c").style.display = "none";
    document.getElementById("next-tutorial2").style.display = "none";
    document.getElementById("major-2nd").style.display = "none";
    document.getElementById("minor-3rd").style.display = "none";
    document.getElementById("major-3rd").style.display = "none";
    document.getElementById("perfect-4th").style.display = "none";
    document.getElementById("step4d").style.display = "inline";
    document.getElementById("next-tutorial3").style.display = "inline";
    document.getElementById("tritone").style.display = "inline";
    document.getElementById("perfect-5th").style.display = "inline";
    document.getElementById("minor-6th").style.display = "inline";
    document.getElementById("major-6th").style.display = "inline";

}

document.getElementById("next-tutorial3").onclick = function() {
    document.getElementById("step4d").style.display = "none";
    document.getElementById("next-tutorial3").style.display = "none";
    document.getElementById("tritone").style.display = "none";
    document.getElementById("perfect-5th").style.display = "none";
    document.getElementById("minor-6th").style.display = "none";
    document.getElementById("major-6th").style.display = "none";
    document.getElementById("step4e").style.display = "inline";
    document.getElementById("next-tutorial4").style.display = "inline";
    document.getElementById("minor-7th").style.display = "inline";
    document.getElementById("major-7th").style.display = "inline";
    document.getElementById("octave").style.display = "inline";
}

document.getElementById("next-tutorial4").onclick = function() {
    document.getElementById("step4e").style.display = "none";
    document.getElementById("next-tutorial4").style.display = "none";
    document.getElementById("minor-7th").style.display = "none";
    document.getElementById("major-7th").style.display = "none";
    document.getElementById("octave").style.display = "none";
    document.getElementById("step5").style.display = "inline";
    document.getElementById("next-tutorial5").style.display = "inline";
}

document.getElementById("next-tutorial5").onclick = function() {
    document.getElementById("step5").style.display = "none";
    document.getElementById("next-tutorial5").style.display = "none";
    round = 9;
    checkRoundCount();
    document.getElementById("final-step").style.display = "inline";
    document.getElementById("final-play-game").style.display = "inline";
    document.getElementById("final-menu").style.display = "inline";
}

document.getElementById("minor-2nd").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("C#4", "8n");
    }, 1000)
}

document.getElementById("major-2nd").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("D4", "8n");
    }, 1000)
}

document.getElementById("minor-3rd").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("D#4", "8n");
    }, 1000)
}

document.getElementById("major-3rd").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("E4", "8n");
    }, 1000)
}

document.getElementById("perfect-4th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("F4", "8n");
    }, 1000)
}

document.getElementById("tritone").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("F#4", "8n");
    }, 1000)
}

document.getElementById("perfect-5th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("G4", "8n");
    }, 1000)
}

document.getElementById("minor-6th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("G#4", "8n");
    }, 1000)
}

document.getElementById("major-6th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("A4", "8n");
    }, 1000)
}

document.getElementById("minor-7th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("A#4", "8n");
    }, 1000)
}

document.getElementById("major-7th").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("B4", "8n");
    }, 1000)
}

document.getElementById("octave").onclick = function() {
    synth.triggerAttackRelease("C4", "8n");
    setTimeout(function(){
        synth.triggerAttackRelease("C5", "8n");
    }, 1000)
}

document.getElementById("easyDiff").onclick = function() {
    restartGame();
    restartRound();
    getIntervalChoicesEasy();
    document.getElementById("easyDiff").style.backgroundColor = "#FFD700";
    document.getElementById("mediumDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("hardDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "none";
    document.getElementById("choices-hard").style.display = "none";
    document.getElementById("choices-easy").style.display = "inline";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "inline";
}

document.getElementById("mediumDiff").onclick = function(){
    restartGame();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("mediumDiff").style.backgroundColor = "#FFD700";
    document.getElementById("easyDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("hardDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "inline";
    document.getElementById("choices-hard").style.display = "none";
    document.getElementById("choices-easy").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "inline";
}

document.getElementById("hardDiff").onclick = function(){
    restartGame();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("hardDiff").style.backgroundColor = "#FFD700";
    document.getElementById("mediumDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("easyDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "none";
    document.getElementById("choices-hard").style.display = "inline";
    document.getElementById("choices-easy").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "inline";
}


document.getElementById("hard-1").onclick = function(){
    checkAnswer(document.getElementById("hard-1").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-2").onclick = function(){
    checkAnswer(document.getElementById("hard-2").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-3").onclick = function(){
    checkAnswer(document.getElementById("hard-3").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-4").onclick = function(){
    checkAnswer(document.getElementById("hard-4").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-5").onclick = function(){
    checkAnswer(document.getElementById("hard-5").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-6").onclick = function(){
    checkAnswer(document.getElementById("hard-6").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("hard-7").onclick = function(){
    checkAnswer(document.getElementById("hard-7").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesHard();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("med-1").onclick = function(){
    checkAnswer(document.getElementById("med-1").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("med-2").onclick = function(){
    checkAnswer(document.getElementById("med-2").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("med-3").onclick = function(){
    checkAnswer(document.getElementById("med-3").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("med-4").onclick = function(){
    checkAnswer(document.getElementById("med-4").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("med-5").onclick = function(){
    checkAnswer(document.getElementById("med-5").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesMedium();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("easy-1").onclick = function(){
    checkAnswer(document.getElementById("easy-1").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesEasy();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("easy-2").onclick = function(){
    checkAnswer(document.getElementById("easy-2").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesEasy();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("easy-3").onclick = function(){
    checkAnswer(document.getElementById("easy-3").innerText);
    checkRoundCount();
    restartRound();
    getIntervalChoicesEasy();
    document.getElementById("step4b").style.display = "inline";
    document.getElementById("step4").style.display = "none";
    document.getElementById("next-tutorial").style.display = "inline";
    document.getElementById("minor-2nd").style.display = "inline";
}

document.getElementById("yes").onclick = function(){
    alert("Saved Game");
}
