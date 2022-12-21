

/*-------------------------------- Constants --------------------------------*/
const charactersData = [
    { number: 1, name: "Amour", gender: "guy", hair: "black", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 2, name: "Ashley", gender: "girl", hair: "black", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 3, name: "Bella", gender: "girl", hair: "brown", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 4, name: "Ember", gender: "girl", hair: "red", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true},
    { number: 5, name: "Khalil", gender: "guy", hair: "black", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 6, name: "Olivia", gender: "girl", hair: "brown", eyes:"blue", glasses: true, facialHair: false, bald: false, jewelry: false},
    { number: 7, name: "Phoebe", gender: "girl", hair: "blonde", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: false},
    { number: 8, name: "Pierre", gender: "guy", hair: "blonde", eyes:"blue", glasses: false, facialHair: true, bald: false, jewelry: false},
    { number: 9, name: "Tony", gender: "guy", hair: "black", eyes:"brown", glasses: true, facialHair: false, bald: false, jewelry: false},
    { number: 10, name: "Zeke", gender: "guy", hair: false, eyes:"green", glasses: false, facialHair: true, bald: true, jewelry: true}
 
]

const characterKeys = ['name', 'gender', 'hair', 'eyes', 'glasses', 'facialHair', 'bald', 'jewelry'] 
const characterNames = ['Amour', 'Ashley', 'Bella', 'Ember', 'Khalil', 'Olivia', 'Phoebe', 'Pierre', 'Tony', 'Zeke']



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

const invalidEl = document.getElementById("invalid")

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

submitButtonEl.addEventListener("click", submitHandleClick)

/*-------------------------------- Functions --------------------------------*/

function init(){
    winner = false
    clues = 3
    shuffledCharacters = shuffleCharacters()
    unknownCharacter = unknownCharacterPick()
    render()
    clueCount()
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
    if (clueMessageEls[0].textContent === ""){
        clues = 3
    } else if (clueMessageEls[0].textContent !== "" && clueMessageEls[1].textContent === ""){
        clues = 2
    } else if (clueMessageEls[1].textContent !== "" && clueMessageEls[2].textContent === ""){
        clues = 1
    } else {
        clues = 0
    }
    clueCountEl.textContent = clues
}

function submitHandleClick(){
    checkInput()
    clueCount()
}

function checkInput(){
    if (inputEl.value.includes(unknownCharacter.gender) && inputEl.value.includes(`${Object.keys(unknownCharacter)[2]}`) && inputEl.value.includes("?")){
        console.log("It includes this")
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (unknownCharacter.bald === false && inputEl.value.includes(unknownCharacter.hair) && inputEl.value.includes(`${Object.keys(unknownCharacter)[3]}`) && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (inputEl.value.includes(unknownCharacter.eyes) && inputEl.value.includes(`${Object.keys(unknownCharacter)[4]}`) && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (inputEl.value.includes(`${Object.keys(unknownCharacter)[5]}`) && unknownCharacter.glasses === true && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (inputEl.value.includes("facial hair") && unknownCharacter.facialHair === true && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (inputEl.value.includes(`${Object.keys(unknownCharacter)[7]}`) && unknownCharacter.bald === true && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        console.log("YES")
        } else if (clues === 2){
        clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
        clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else if (inputEl.value.includes(`${Object.keys(unknownCharacter)[8]}`) && unknownCharacter.jewelry === true && inputEl.value.includes("?")){
        if (clues === 3){
        clueMessageEls[0].textContent = `${inputEl.value} YES`
        } else if (clues === 2){
        clueMessageEls[1].textContent = `${inputEl.value} YES`
        } else if (clues === 1){
        clueMessageEls[2].textContent = `${inputEl.value} YES`
        }
    } else {
        checkFormat()
        console.log("NOPE")

    }
}

function checkFormat(){
    if (!inputEl.value.includes("?")){
        invalidEl.textContent = `Invalid input. Must include "?"`
    // } else if (!inputEl.value.includes("hey")){
    //     invalidEl.textContent = `Invalid input. Must include a valid trait`
    } else {
        clueMessageEls[0].textContent = `${inputEl.value} NO`
    }

}


