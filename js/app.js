

/*-------------------------------- Constants --------------------------------*/
// import characters from "./data.js"

/*---------------------------- Variables (state) ----------------------------*/

let winner = false
let clues = 3
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


/*------------------------ Cached Element References ------------------------*/

const cardEls = document.querySelectorAll(".card")
console.log(cardEls)
const unknownEl = document.getElementById("unknown")
console.log(unknownEl)
const messageEl = document.getElementById("game-result")
console.log(messageEl)
const subMessageEl = document.getElementById("sub-result")
console.log(subMessageEl)
const clueMessageEls = document.querySelectorAll(".clue")
console.log(clueMessageEls)
const clueCountEl = document.getElementById("clue-count")
console.log(clueCountEl)




  
/*----------------------------- Event Listeners -----------------------------*/

  


/*-------------------------------- Functions --------------------------------*/