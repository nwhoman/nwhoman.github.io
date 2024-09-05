const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const rulesBtn = document.getElementById("rules-btn");

const rulesContainer = document.querySelector(".rules-container");
let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
    diceValuesArr = [];
  
    for (let i = 0; i < 5; i++) {
      const randomDice = Math.floor(Math.random() * 6) + 1;
      diceValuesArr.push(randomDice);
    };
  
    listOfAllDice.forEach((dice, index) => {
      dice.textContent = diceValuesArr[index];
    });
  };

rulesBtn.addEventListener("click", () => {
    
    if (!isModalShowing) {
        rulesBtn.innerText = "Hide rules"
        rulesContainer.style.display = "block";

    } else {
        rulesBtn.innerText = "Show rules"
        rulesContainer.style.display = "none";

    }
    isModalShowing = !isModalShowing;
})

rollDiceBtn.addEventListener("click", () => {
    if (rolls === 3) {
        alert("You must select a score")
        return;
    }
    rollDice();
    rolls++;
    updateStats();
    getHighestDuplicates(diceValuesArr);
})

function updateStats(){
    roundElement.textContent = round;
    rollsElement.textContent = rolls;
    console.log(diceValuesArr);
}
function updateRadioOption(index, score){
    scoreInputs[index].value = score;
    scoreInputs[index].disabled = false;
    scoreSpans[index].textContent = `${score}`;
}
function getHighestDuplicates(arr){
    let dupArr = [0,0,0,0,0,0];
    console.log(arr);
    for (let i = 0; i < 5; i++){
        
        dupArr[diceValuesArr[i]-1] = dupArr[diceValuesArr[i]-1] + 1;
    }
    console.log(dupArr);
}
