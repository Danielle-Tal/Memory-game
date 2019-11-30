var counter = 0;
var pairs = 0;
var length = 0;

let hasFlippedCard = false;
let firstCard,secondCard;
let lockBoard = false;

cardsOptions = [{
    dataName: "Pika",
    frontFace: "images\\2437349-pikachu.png",
},
{
    dataName: "Jiggly",
    frontFace: "images\\1892299-039jigglypuff.png",
},
{
    dataName: "Squir",
    frontFace: "images\\1891764-007squirtle.png",
},{
    dataName: "Charm",
    frontFace: "images\\1891761-004charmander.png",  
},{
    dataName: "Balb",
    frontFace: "images\\1891758-001bulbasaur.png",  
},{
    dataName: "Pidg",
    frontFace: "images\\1891821-018pidgeot.png", 
},{
    dataName: "caterpie",
    frontFace: "images\\1892132-010caterpie.png", 
},{
    dataName: "butterfree",
    frontFace: "images\\1892298-012butterfree.png", 
},{
    dataName: "vulpix",
    frontFace: "images\\1891638-037vulpix.png", 
},{
    dataName: "oddish",
    frontFace: "images\\1891711-043oddish.png", 
},{
    dataName: "dewgong",
    frontFace: "images\\1892317-087dewgong.png", 
},{
    dataName: "ponyta",
    frontFace: "images\\1892309-077ponyta.png", 
}]
var game = document.getElementById("game");
var levelButton = document.getElementById("chooseLevel");
var levelModal = document.getElementById("level-modal");
levelButton.addEventListener("click", setupBoard);
levelButton.addEventListener("click",closelevelmodal);

function closelevelmodal(){
levelModal.style.display = "none"; 
}

function createCard(dataname, frontFace){
    var newcard = document.createElement("div");
    newcard.classList.add("card");
    newcard.dataset.name = dataname;
    var front = document.createElement("img");
    front.classList.add("front-face");
    front.src = frontFace;
    var back = document.createElement("img");
    back.classList.add("back-face");
    back.src = "images\\back-face.png";
    newcard.appendChild(front);
    newcard.appendChild(back);
    game.appendChild(newcard);
}

function setupBoard(){
    var easy = document.getElementById("easy").checked;
    var med = document.getElementById("med").checked;
    var hard = document.getElementById("hard").checked;
    if (easy == true){
        length = 6;
        game.style.width = "900px";
    }else if(med == true){
        length = 9;
        game.style.width = "1264px";
    }else if (hard == true){
        length = 12;
        game.style.width = "1264px";
    }
    for(var i=0; i<length; i++){
        createCard(cardsOptions[i].dataName, cardsOptions[i].frontFace);
        createCard(cardsOptions[i].dataName, cardsOptions[i].frontFace);
    }
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle(cards);
    counter = 0;
    pairs = 0;
}

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
       if(pairs == length){
        setTimeout(() => {
            youWonPopUp();
            }, 500); 
       }
    }else{
       unFlippCards();
       counter++;
       document.getElementById("counter").innerHTML = `${counter}`
       document.getElementById("popUpCounter").innerHTML = `${counter}`
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

function shuffle(cards){
    cards.forEach(card =>{
        let randomplace = Math.floor(Math.random()*12);
        card.style.order = randomplace;
      });
}

function newGame(){
    game.querySelectorAll('*').forEach(n => n.remove());
    levelModal.style.display = "block";
    counter = 0;
    document.getElementById("counter").innerHTML = `${counter}`
}


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

var modal = document.getElementById("the-modal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}







