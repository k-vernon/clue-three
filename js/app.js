

/*-------------------------------- Constants --------------------------------*/
const charactersData = [
    { number: 1, name: "Amour", gender: "male", hair: "black", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 2, name: "Ashley", gender: "female", hair: "black", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 3, name: "Bella", gender: "female", hair: "brown", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 4, name: "Ember", gender: "female", hair: "red", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 5, name: "Khalil", gender: "male", hair: "black", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 6, name: "Olivia", gender: "female", hair: "brown", eyes:"blue", glasses: true, facialHair: false, bald: false, jewelry: false},
    { number: 7, name: "Phoebe", gender: "female", hair: "blonde", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 8, name: "Pierre", gender: "male", hair: "blonde", eyes:"blue", glasses: false, facialHair: true, bald: false, jewelry: false},
    { number: 9, name: "Tony", gender: "male", hair: "black", eyes:"brown", glasses: true, facialHair: false, bald: false, jewelry: false},
    { number: 10, name: "Zeke", gender: "male", hair: false, eyes:"green", glasses: false, facialHair: true, bald: true, jewelry: true}
 
]



/*---------------------------- Variables (state) ----------------------------*/

let winner = false
let clues = 3
let shuffledCharacters
let unknownCharacter


/*------------------------ Cached Element References ------------------------*/

const cardEls = document.querySelectorAll(".card")

const unknownEl = document.getElementById("unknown")

const messageEl = document.getElementById("game-result")

const subMessageEl = document.getElementById("sub-result")

const clueMessageEls = document.querySelectorAll(".clue")

const clueCountEl = document.getElementById("clue-count")

const inputEl = document.getElementById("input")

const submitButtonEl = document.getElementById("submit")

const guessButtonEl = document.getElementById("guess-button")

const instructsButtonEl = document.getElementById("instructions")

const resetButtonEl = document.getElementById("reset")



/*----------------------------- Event Listeners -----------------------------*/

  cardEls.forEach(function(card){
    card.addEventListener("click", console.log)
  })


resetButtonEl.addEventListener("click", reset)

submitButtonEl.addEventListener("click", checkInput)



/*-------------------------------- Functions --------------------------------*/

function init() {
    winner = false
    clues = 3
    shuffledCharacters = shuffleCharacters()
    unknownCharacter = unknownCharacterPick()
    render()
}
init()

function render(){
    assignCards()
    assignUnknownCard()
}


function shuffleCharacters(){
    let unshuffledChars = [...charactersData]
    let numToShuffle = unshuffledChars.length
    let shuffledChars = []
    for (let i = 0; i < numToShuffle; i++){
        randomIndex = Math.floor(Math.random() * unshuffledChars.length)
        shuffledChars.push(unshuffledChars[randomIndex])
        unshuffledChars.splice(randomIndex, 1)
    }
    return shuffledChars
}

function assignCards(){
    shuffledCharacters.forEach(function(character, charIdx){ 
       cardEls[charIdx].textContent = character.name
        console.log()
    });
 }

function unknownCharacterPick(){
    randomChar = Math.floor(Math.random() * shuffledCharacters.length)
    unknownCharacter = shuffledCharacters[randomChar]
    return unknownCharacter
}


function assignUnknownCard(){
    unknownEl.textContent = unknownCharacter.name
}

function reset(){
    init()
}

function clueCount(){
    clueCountEl.textContent = clues
}


function checkInput(){
    if (unknownCharacter.bald === false && inputEl.value.includes(unknownCharacter.gender) && inputEl.value.includes(`${Object.keys(unknownCharacter)[2]}`) && inputEl.value.includes("?")){
       
    } else if (inputEl.value.includes(unknownCharacter.hair) && inputEl.value.includes(`${Object.keys(unknownCharacter)[3]}`) && inputEl.value.includes("?")){
    console.log("YES")
    } else if (inputEl.value.includes(unknownCharacter.eyes) && inputEl.value.includes(`${Object.keys(unknownCharacter)[4]}`) && inputEl.value.includes("?")){
    console.log("YES")
    } else if (inputEl.value.includes(`${Object.keys(unknownCharacter)[5]}`) && unknownCharacter.glasses === true && inputEl.value.includes("?")){
    console.log("YES")
    } else if (inputEl.value.includes("facial hair") && unknownCharacter.facialHair === true && inputEl.value.includes("?")){
    console.log("YES")
    } else if ((inputEl.value.includes(`${Object.keys(unknownCharacter)[7]}`) && unknownCharacter.bald === true && inputEl.value.includes("?"))){
    console.log("YES")
    } else if ((inputEl.value.includes(`${Object.keys(unknownCharacter)[8]}`) && unknownCharacter.jewelry === true && inputEl.value.includes("?"))){
    console.log("YES")
    } else 

    console.log("NOPE")
}

console.log(unknownCharacter.jewelry)
console.log(Object.keys(unknownCharacter)[8])


