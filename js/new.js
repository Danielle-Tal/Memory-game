

const cards = document.querySelectorAll(".card");

window.onload = shuffle();

var counter = 0;
var pairs = 0;

let hasFlippedCard = false;
let firstCard,secondCard;
let lockBoard = false;

function flipCard(){
    if (lockBoard) return;
    if (this=== firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    }else{
        hasFlippedCard = false;
        secondCard = this;
       checkForMatch();
    }
}

function checkForMatch(){
    if(firstCard.dataset.name === secondCard.dataset.name){
       disableCards();
       pairs++;
       if(pairs == 1){
           youWonPopUp();
       }
    }else{
       unFlippCards();
       counter++;
       document.getElementById("counter").innerHTML = `${counter}`
    }
}

function disableCards(){
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);
    resetBoard();
}

function unFlippCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
        }, 1500); 
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(){
    cards.forEach(card =>{
        let randomplace = Math.floor(Math.random()*12);
        card.style.order = randomplace;
      });
}

function newGame(){
    window.location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard))

document.getElementById("reset-button").addEventListener("click", newGame);

 function youWonPopUp () {
    var popup = document.getElementById("the-modal");
    modal.style.display = "block";
  };

function closemodal(){
    modal.style.display = "none";
}  

document.getElementById("newgame").addEventListener("click", newGame);
document.getElementById("newgame").addEventListener("click", closemodal);
document.getElementById("closeModal").addEventListener("click",closemodal);

// Get the modal
var modal = document.getElementById("the-modal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



