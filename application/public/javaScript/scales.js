let score = 0;
let round = 0;
let maxRounds = 10;
let rootNote = "";
let wholeStep = 2;
let halfStep = 1;
let scale = "";
let scalesAsNotes = [];
let copyScale = [];

maxIndexOut = 33; //exclusive: for highest root note possible without running out of notes in a scale
minIndexOut = 0;

const PITCHES = [
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6"
    ];

const SCALES = ["Major", "Pentatonic Major", "Blues Major", "Minor", "Melodic Minor", "Harmonic Minor",
                "Pentatonic Minor", "Blues Minor"];


//Defining Functions//

function restartGame(){
    score = 0;
    round = 0;

    document.getElementById("score").innerText = score;
}

function getMajorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getPentMajorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getBluesMajorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getMinorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getMelodMinorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getHarmMinorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getPentMinorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
}

function getBluesMinorScale(){
    let scale = [];
    updatedNote = PITCHES.indexOf(rootNote);
    scale.push(rootNote);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep + halfStep;
    scale.push(PITCHES[updatedNote]);
    updatedNote += wholeStep;
    scale.push(PITCHES[updatedNote]);

    return scale;
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
    randomIndex = Math.floor(Math.random() * (maxIndexOut - minIndexOut) + minIndexOut);

    rootNote = PITCHES[randomIndex];
    scale = SCALES[Math.floor(Math.random() * SCALES.length)];

    scalesAsNotes = [];

    switch (scale) {
        case "Major":
            scalesAsNotes = getMajorScale();
            break;
        case "Pentatonic Major":
            scalesAsNotes = getPentMajorScale();
            break;
        case "Blues Major":
            scalesAsNotes = getBluesMajorScale();
            break;
        case "Minor":
            scalesAsNotes = getMinorScale();
            break;
        case "Harmonic Minor":
            scalesAsNotes = getHarmMinorScale();
            break;
        case "Melodic Minor":
            scalesAsNotes = getMelodMinorScale();
            break;
        case "Pentatonic Minor":
            scalesAsNotes = getPentMinorScale();
            break;
        case "Blues Minor":
            scalesAsNotes = getBluesMinorScale();
            break;
        default:

    }

    document.getElementById("root-button").innerText = rootNote;
}

function getScaleChoicesHard(){
    copyScale = [...SCALES];
    copyScale.splice(copyScale.indexOf(scale), 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyScale.splice(randomRemove, 1);
    copyScale.push(scale);
    shuffleArray(copyScale);
    document.getElementById("hard-1").innerText = copyScale[0];
    document.getElementById("hard-2").innerText = copyScale[1];
    document.getElementById("hard-3").innerText = copyScale[2];
    document.getElementById("hard-4").innerText = copyScale[3];
    document.getElementById("hard-5").innerText = copyScale[4];
    document.getElementById("hard-6").innerText = copyScale[5];
    document.getElementById("hard-7").innerText = copyScale[6];
}

function getScaleChoicesMedium(){
    copyScale = [...SCALES];
    copyScale.splice(copyScale.indexOf(scale), 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 6);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 5);
    copyScale.splice(randomRemove, 1);

    copyScale.push(scale);
    shuffleArray(copyScale);

    document.getElementById("med-1").innerText = copyScale[0];
    document.getElementById("med-2").innerText = copyScale[1];
    document.getElementById("med-3").innerText = copyScale[2];
    document.getElementById("med-4").innerText = copyScale[3];
    document.getElementById("med-5").innerText = copyScale[4];

}

function getScaleChoicesEasy(){
    copyScale = [...SCALES];
    copyScale.splice(copyScale.indexOf(scale), 1);
    randomRemove = Math.floor(Math.random() * 7);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 6);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 5);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 4);
    copyScale.splice(randomRemove, 1);
    randomRemove = Math.floor(Math.random() * 3);
    copyScale.splice(randomRemove, 1);

    copyScale.push(scale);
    shuffleArray(copyScale);

    document.getElementById("easy-1").innerText = copyScale[0];
    document.getElementById("easy-2").innerText = copyScale[1];
    document.getElementById("easy-3").innerText = copyScale[2];
}

function playScale(){

    synth.triggerAttackRelease(scalesAsNotes[0], "8n");

    setTimeout(function(){
        synth.triggerAttackRelease(scalesAsNotes[1], "8n");
        setTimeout(function(){
            synth.triggerAttackRelease(scalesAsNotes[2], "8n");
            setTimeout(function(){
                synth.triggerAttackRelease(scalesAsNotes[3], "8n");
                setTimeout(function(){
                    synth.triggerAttackRelease(scalesAsNotes[4], "8n");
                    setTimeout(function(){
                        synth.triggerAttackRelease(scalesAsNotes[5], "8n");
                        setTimeout(function(){
                            synth.triggerAttackRelease(scalesAsNotes[6], "8n");
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}

function checkAnswer(givenAnswer){
    if(givenAnswer == scale){
        score+=1;
    }

    document.getElementById("score").innerText = score;
}

function checkRoundCount(){
    round+=1;
    console.log("This is the round: " + round);
    if(round == maxRounds){
        document.getElementById("gameover").style.display = "inline";
        document.getElementById("gameover").innerText = "Game Over! Your score is " + score + "/10";
        document.getElementById("save").style.display = "inline";
        document.getElementById("saved-score").value = score;
        document.getElementById("yes").style.display = "inline";
        document.getElementById("no").style.display = "inline";
    }
}

//Set up the Tone Producer
var synth = new Tone.PolySynth().toDestination();

//Setting and Starting the game. Starting with Hard Mode
restartGame();
restartRound();
getScaleChoicesHard();

//Button Handlers
document.getElementById("play-root-button").onclick = function() {
    synth.triggerAttackRelease(rootNote, "8n");
}

document.getElementById("repeat").onclick = function() {
    playScale();
    document.getElementById("repeat").innerText = "Repeat Scale";
}

document.getElementById("easyDiff").onclick = function() {
    restartGame();
    restartRound();
    getScaleChoicesEasy();
    document.getElementById("easyDiff").style.backgroundColor = "#FFD700";
    document.getElementById("mediumDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("hardDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "none";
    document.getElementById("choices-hard").style.display = "none";
    document.getElementById("choices-easy").style.display = "inline";
}

document.getElementById("mediumDiff").onclick = function(){
    restartGame();
    restartRound();
    getScaleChoicesMedium();
    document.getElementById("mediumDiff").style.backgroundColor = "#FFD700";
    document.getElementById("easyDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("hardDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "inline";
    document.getElementById("choices-hard").style.display = "none";
    document.getElementById("choices-easy").style.display = "none";
}

document.getElementById("hardDiff").onclick = function(){
    restartGame();
    restartRound();
    getScaleChoicesHard();
    document.getElementById("hardDiff").style.backgroundColor = "#FFD700";
    document.getElementById("mediumDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("easyDiff").style.backgroundColor = "#FFFFFF";
    document.getElementById("choices-medium").style.display = "none";
    document.getElementById("choices-hard").style.display = "inline";
    document.getElementById("choices-easy").style.display = "none";
}

document.getElementById("hard-1").onclick = function(){
    checkAnswer(document.getElementById("hard-1").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-2").onclick = function(){
    checkAnswer(document.getElementById("hard-2").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-3").onclick = function(){
    checkAnswer(document.getElementById("hard-3").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-4").onclick = function(){
    checkAnswer(document.getElementById("hard-4").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-5").onclick = function(){
    checkAnswer(document.getElementById("hard-5").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-6").onclick = function(){
    checkAnswer(document.getElementById("hard-6").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("hard-7").onclick = function(){
    checkAnswer(document.getElementById("hard-7").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesHard();
}

document.getElementById("med-1").onclick = function(){
    checkAnswer(document.getElementById("med-1").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesMedium();
}

document.getElementById("med-2").onclick = function(){
    checkAnswer(document.getElementById("med-2").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesMedium();
}

document.getElementById("med-3").onclick = function(){
    checkAnswer(document.getElementById("med-3").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesMedium();
}

document.getElementById("med-4").onclick = function(){
    checkAnswer(document.getElementById("med-4").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesMedium();
}

document.getElementById("med-5").onclick = function(){
    checkAnswer(document.getElementById("med-5").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesMedium();
}

document.getElementById("easy-1").onclick = function(){
    checkAnswer(document.getElementById("easy-1").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesEasy();
}

document.getElementById("easy-2").onclick = function(){
    checkAnswer(document.getElementById("easy-2").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesEasy();
}

document.getElementById("easy-3").onclick = function(){
    checkAnswer(document.getElementById("easy-3").innerText);
    checkRoundCount();
    restartRound();
    getScaleChoicesEasy();
}

document.getElementById("yes").onclick = function(){
    document.getElementById("save-form").submit();
    alert("Saved Game");
}
