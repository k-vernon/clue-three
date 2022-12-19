

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
// let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


/*------------------------ Cached Element References ------------------------*/

const cardEls = document.querySelectorAll(".card")
// console.log(cardEls)
const unknownEl = document.getElementById("unknown")
// console.log(unknownEl)
const messageEl = document.getElementById("game-result")
// console.log(messageEl)
const subMessageEl = document.getElementById("sub-result")
// console.log(subMessageEl)
const clueMessageEls = document.querySelectorAll(".clue")
// console.log(clueMessageEls)
const clueCountEl = document.getElementById("clue-count")
// console.log(clueCountEl)
const inputEl = document.getElementById("input")
// console.log(inputEl)
const submitButtonEl = document.getElementById("submit")
// console.log(submitButtonEl)
const guessButtonEl = document.getElementById("guess-button")
// console.log(guessButtonEl)
const instructsButtonEl = document.getElementById("instructions")
// console.log(instructsButtonEl)
const resetButtonEl = document.getElementById("reset")
// console.log(resetButtonEl)


/*----------------------------- Event Listeners -----------------------------*/

  cardEls.forEach(function(card){
    card.addEventListener("click", clickTest)
  })


/*-------------------------------- Functions --------------------------------*/

function init() {
    winner = false
    clues = 3


}

function shuffleCharacters (chars){
    let unshuffledChars = [...charactersData]
    let shuffledChars = []

    return shuffleChars

}

 function characterObjs (){
    characters.forEach(function(character, charIdx){ 
        // console.log(character)
        // cardEls.forEach(function(card, cardIdx){
        //     card[cardIdx] = character[charIdx]
        // })    
       cardEls[charIdx].textContent = character.name

    });
 }

 characterObjs()
