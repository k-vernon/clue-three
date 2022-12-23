

/*-------------------------------- Constants --------------------------------*/
const charactersData = [
    { number: 1, name: "Amour", gender: "guy", hair: "black", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true, imgFile: './assets/amour.png'},
    { number: 2, name: "Ashley", gender: "girl", hair: "black", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: true, imgFile: './assets/ashley.png'},
    { number: 3, name: "Bella", gender: "girl", hair: "brown", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: false, imgFile: './assets/bella.png'},
    { number: 4, name: "Ember", gender: "girl", hair: "red", eyes:"green", glasses: false, facialHair: false, bald: false, jewelry: true, imgFile: './assets/ember.png'},
    { number: 5, name: "Khalil", gender: "guy", hair: "black", eyes:"brown", glasses: false, facialHair: false, bald: false, jewelry: true, imgFile: './assets/khalil.png'},
    { number: 6, name: "Olivia", gender: "girl", hair: "brown", eyes:"blue", glasses: true, facialHair: false, bald: false, jewelry: false, imgFile: './assets/olivia.png'},
    { number: 7, name: "Phoebe", gender: "girl", hair: "blonde", eyes:"blue", glasses: false, facialHair: false, bald: false, jewelry: false, imgFile: './assets/phoebe.png'},
    { number: 8, name: "Pierre", gender: "guy", hair: "blonde", eyes:"blue", glasses: false, facialHair: true, bald: false, jewelry: false, imgFile: './assets/pierre.png'},
    { number: 9, name: "Tony", gender: "guy", hair: "black", eyes:"brown", glasses: true, facialHair: false, bald: false, jewelry: false, imgFile: './assets/tony.png'},
    { number: 10, name: "Zeke", gender: "guy", hair: "red", eyes:"green", glasses: false, facialHair: true, bald: true, jewelry: true, imgFile: './assets/zeke.png'}
 
]

const characterKeys = ['name', 'gender', 'hair', 'eyes', 'glasses', 'facialHair', 'bald', 'jewelry'] 
const characterNames = ['Amour', 'Ashley', 'Bella', 'Ember', 'Khalil', 'Olivia', 'Phoebe', 'Pierre', 'Tony', 'Zeke']
const characterValues = ['guy', 'girl', 'black', 'green', 'blue', 'brown', 'red', 'blonde']



/*---------------------------- Variables (state) ----------------------------*/

let winner = false
let clues = 3
let shuffledCharacters
let unknownCharacter



/*------------------------ Cached Element References ------------------------*/

const cardEls = document.querySelectorAll(".card")
console.log(cardEls)

const unknownEl = document.getElementById("unknown-card")

const messageEl = document.getElementById("game-result")

const subMessageEl = document.getElementById("sub-result")

const clueMessageEls = document.querySelectorAll(".clue")

const clueCountEl = document.getElementById("clue-count")

const invalidEl = document.getElementById("invalid")

const inputEl = document.getElementById("input")

const submitButtonEl = document.getElementById("submit")

const guessButtonEl = document.getElementById("guess-button")

const instructsButtonEl = document.getElementById("instructionsbtn")

const resetButtonEl = document.getElementById("reset")

const guessInputEl = document.getElementById("guess-input")

const instructsPageEl = document.getElementById("instructions-page")

const exitButtonEl = document.getElementById("exit")



/*----------------------------- Event Listeners -----------------------------*/

cardEls.forEach(function(card){
    card.addEventListener("click", console.log)
})
resetButtonEl.addEventListener("click", reset)
submitButtonEl.addEventListener("click", submitHandleClick)
guessButtonEl.addEventListener("click", guessName)
instructsButtonEl.addEventListener("click", displayInstructions)
exitButtonEl.addEventListener("click", exitInstructions)



/*-------------------------------- Functions --------------------------------*/

init()

function init(){
    winner = false
    clues = 3
    shuffledCharacters = shuffleCharacters()
    unknownCharacter = unknownCharacterPick()
    render()
    removeInputValue()
    resetGameResult()
    enableButtons()
    invalidEl.textContent = ''

}

function reset(){
    init()

}

function render(){    
    clueCount()
    assignCards()
    assignUnknownCard()
}


function submitHandleClick(){
    checkInput()
    clueCount()
    removeInputValue()
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

    })
    shuffledCharacters.forEach(function(character, charIdx){
        cardEls[charIdx].style.backgroundImage = `url(${character.imgFile})`
        cardEls[charIdx].style.backgroundSize = "cover"
        cardEls[charIdx].style.backgroundPosition = "center"
 
    })
}

function unknownCharacterPick(){
    randomChar = Math.floor(Math.random() * shuffledCharacters.length)
    unknownCharacter = shuffledCharacters[randomChar]
    return unknownCharacter
}

function assignUnknownCard(){
    unknownEl.textContent = unknownCharacter.name      
    unknownEl.style.backgroundImage = `url(${unknownCharacter.imgFile})`
    unknownEl.style.backgroundSize = "cover"
    unknownEl.style.backgroundPosition = "center"
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
        guessName()
    }
    clueCountEl.textContent = clues
}

function checkInput(){
    inputElLowerCase = inputEl.value.toLowerCase()
    if (inputElLowerCase.includes(unknownCharacter.gender) && inputElLowerCase.includes(`${Object.keys(unknownCharacter)[2]}`) && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (unknownCharacter.bald === false && inputElLowerCase.includes(unknownCharacter.hair) && inputElLowerCase.includes(`${Object.keys(unknownCharacter)[3]}`) && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (inputElLowerCase.includes(unknownCharacter.eyes) && inputElLowerCase.includes(`${Object.keys(unknownCharacter)[4]}`) && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (inputElLowerCase.includes(`${Object.keys(unknownCharacter)[5]}`) && unknownCharacter.glasses === true && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (inputElLowerCase.includes("facial hair") && unknownCharacter.facialHair === true && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (inputElLowerCase.includes(`${Object.keys(unknownCharacter)[7]}`) && unknownCharacter.bald === true && inputElLowerCase.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else if (inputElLowerCase.includes(`${Object.keys(unknownCharacter)[8]}`) && unknownCharacter.jewelry === true && inputElLowerCase.value.includes("?")){
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} YES!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} YES!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} YES!`
        }
    } else {
        checkFormat()

    }
}

function checkFormat(){
    inputElLowerCase = inputEl.value.toLowerCase()
    if (!inputElLowerCase.includes("?")){
        invalidEl.textContent = `Invalid input. Must include "?"`
    } else if (!checkIfInputContainsKey(inputElLowerCase)){
        invalidEl.textContent = `Invalid input. Must include a valid trait.`
    } else {
        if (clues === 3){
            clueMessageEls[0].textContent = `${inputEl.value} NO!`
        } else if (clues === 2){
            clueMessageEls[1].textContent = `${inputEl.value} NO!`
        } else if (clues === 1){
            clueMessageEls[2].textContent = `${inputEl.value} NO!`
        }
    }

}

function checkIfInputContainsKey(playerText){
    let isIncluded = false
    playerText = playerText.slice(0, -1)
    playerText = playerText.split(" ")
    playerText.forEach(function(value){
       if (characterKeys.includes(value)){
            isIncluded = true
       }
    })
    return isIncluded
}

function guessName(){
    inputEl.disabled = true
    inputEl.style.cursor = "not-allowed"
    submitButtonEl.disabled = true
    guessButtonEl.style.backgroundColor = ""
    submitButtonEl.style.backgroundColor = "rgb(238, 238, 238)"
    submitButtonEl.style.cursor = "not-allowed"
    guessButtonEl. disabled = false
    guessInputEl.disabled = false
    guessButtonEl.style.cursor = "pointer"
    guessInputEl.style.cursor = "pointer"
    guessInputEl.removeAttribute("hidden")
    guessButtonEl.removeEventListener("click", guessName)
    guessButtonEl.addEventListener("click", checkGuessInput)
    guessButtonEl.style.animationPlayState = "running"
    messageEl.textContent = "TAKE YOUR GUESS!"
    subMessageEl.textContent = "Choose wisely! You have one chance!"
}

function enableButtons (){
    inputEl.disabled = false
    inputEl.style.cursor = "auto"
    submitButtonEl.disabled = false
    submitButtonEl.style.cursor = "pointer"
    guessInputEl.setAttribute("hidden", "")
    guessButtonEl.addEventListener("click", guessName)
    guessButtonEl.style.cursor = "pointer"
    guessButtonEl.disabled = false
    guessButtonEl.style.animationPlayState = ""
    guessButtonEl.style.backgroundColor = ""



}

function checkGuessInput (){
    guessInputElLowerCase = guessInputEl.value.toLowerCase()
    unknownCharacterLowercase = unknownCharacter.name.toLowerCase()
    if (unknownCharacterLowercase === guessInputElLowerCase){
        messageEl.textContent = "YOU WIN" 
        subMessageEl.textContent = "You should be a detective!"
        winner = true
    } else {
        messageEl.textContent = "YOU LOSE"
        subMessageEl.textContent = "Use your clues more wisely!"
        winner = false
    }
    guessButtonEl.disabled = true
    guessButtonEl.style.cursor = "not-allowed"
    guessInputEl.disabled = true
    guessInputEl.style.cursor = "not-allowed"
    guessButtonEl.style.backgroundColor = "rgb(238, 238, 238)"
    guessButtonEl.style.animationPlayState = ""
}
function removeInvalidText(){
    invalidEl.textContent = ''
}


function removeInputValue(){
    inputEl.value = ''

}

function displayInstructions(){
    instructsPageEl.removeAttribute("hidden")
    
}

function exitInstructions(){
    instructsPageEl.setAttribute("hidden", "")
}

function resetGameResult(){
    messageEl.textContent = ''
    subMessageEl.textContent = ''
}

