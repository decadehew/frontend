/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const stars = document.querySelectorAll('.stars li i')
const moves = document.querySelector('.moves');
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let timer = document.querySelector('.timer');

let cardDeck = [
    "fa-diamond", "fa-paper-plane-o", 
    "fa-anchor", "fa-bolt",  "fa-cube", "fa-leaf", 
    "fa-bicycle", "fa-bomb",   
    "fa-diamond", "fa-paper-plane-o", 
    "fa-anchor", "fa-bolt", "fa-cube", 
    "fa-leaf", "fa-bicycle", "fa-bomb"
]
let openCard = [];
let count = 0;
let starRate = 3;
let WIN = 0;
const cardNum = 16 / 2; //8
let seconds = 0;
let interval;


moves.textContent = 0;


// start time
function startTimer() {
    interval = setInterval(function() {
        seconds++;
        timer.textContent = seconds;
    }, 1000)
}

function clearTime() {
    seconds = 0;
    timer.textContent = seconds;
    clearInterval(interval);
}

// console.log(stars.children[0].children[0].classList.remove('fa-star'))
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleCards() {
    const s = shuffle(cardDeck);

    cards.forEach(function(c, i) {
        let tmp = c.children[0].className.slice(3);
        c.children[0].classList.remove(tmp);
        c.children[0].classList.add(s[i])
    }) 
}

function openModal() {
    const m = document.querySelector('.modal-moves');
    const s = document.querySelector('.modal-star');
    const t = document.querySelector('.modal-times');

    const closeModal = document.querySelector('.close');
    const playBtn = document.querySelector('.btn');

    const restart =  restartGame();
    m.textContent = count;
    s.textContent = starRate;
    t.textContent = seconds;
    document.querySelector('#myModal').style.display = 'block';
    closeModal.addEventListener('click', function() {
        document.querySelector('#myModal').style.display = 'none';
    });
    playBtn.addEventListener('click', function() {
        document.querySelector('#myModal').style.display = 'none';
        restartGame();
    })
}


function setRating() {
    for(let i=0; i<3; i++) {
        stars[i].classList.remove('fa-star-o');
        stars[i].classList.add('fa-star');
    }
}

function updateMoves() {
    count++;
    if(count === 1)  startTimer();
    moves.textContent = count;
    // reduce rate
    if(count > 10 && count < 15 ) {
        stars[2].classList.remove('fa-star');
        stars[2].classList.add('fa-star-o');    
        starRate = 2;
    }
    else if(count > 15 && count < 20) {
        stars[1].classList.remove('fa-star');
        stars[1].classList.add('fa-star-o');    
        starRate = 1;
    }
}

// display Card
function displayCard(c) {
    c.classList.add('open', 'show', 'bounce', 'animated');
    openCard.push(c);
}


// check card and then compare
function compareCard() {
    if(openCard.length === 2) {
        updateMoves();
        let c1 = openCard[0].children[0].className;
        let c2 = openCard[1].children[0].className;
        if(c1 === c2) {
            matchCard(openCard[0], openCard[1]);
        } else {
            notMatchCard(openCard[0], openCard[1]);
        }
    }
}


function matchCard(c1, c2) {
    WIN++;
    const card1 = c1;
    const card2 = c2;
    card1.classList.add('match');
    card2.classList.add('match');
    if(WIN === cardNum) {
        openModal();
        clearInterval(interval);
    }

    openCard = [];
}

function notMatchCard(c1, c2) {
    const card1 = c1;
    const card2 = c2;
    setTimeout(function() {
        c1.classList.remove('open', 'show', 'bounce', 'animated');
        c2.classList.remove('open', 'show', 'bounce', 'animated');
        c1.classList.add('wobble', 'animated', 'not-match');
        c2.classList.add('wobble', 'animated', 'not-match');
    }, 1000)
    setTimeout(function() {
        c1.classList.remove('wobble', 'animated', 'not-match');
        c2.classList.remove('wobble', 'animated', 'not-match');
        openCard = [];
    }, 1500)

}

function restartGame() {
    const restart = document.querySelectorAll('.restart');
    restart.forEach(function(r) {
        r.addEventListener('click', function(e) {
            openCard = [];
            count = 0;
            moves.textContent = count;
            shuffleCards();
            for(let card of cards) {
                card.classList.remove('open', 'show', 'match')
            }
            clearTime();
            setRating()
        })
    })
    
}


function startGame() {
    restartGame();
    shuffleCards();

    deck.addEventListener('click', function(e) {
        if(e.target.nodeName === 'LI') {
            if(e.target.classList.contains('open', 'show', 'match')) {
                return;
            }
            if(openCard.length === 2) return;
            displayCard(e.target);

        } else return;
        compareCard();
    })
}

startGame();

