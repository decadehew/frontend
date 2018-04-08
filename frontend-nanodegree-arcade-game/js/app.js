"use strict";

const playerScore = document.querySelector('.player-score');
const chooseGender = document.querySelector('.choose-gender');
let score = 0;

// Character Object
var Character = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y =y;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = Math.floor(Math.random() * 100) + 100; 
    Character.call(this, 'images/enemy-bug.png', x, y);
};

// check Collisions
Enemy.prototype.checkCollisions = function() {
    if(this.x < player.x + 60 && 
        this.x + 60 > player.x && 
        this.y < player.y + 60 && 
        this.y + 60 > player.y) {
		score = 0;
        playerScore.textContent = score;
		player.reset();
    }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505) this.x += this.speed * dt;
    else this.x = -90;

    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function() {
    Character.call(this, 'images/char-boy.png', 200, 400);
}

// This class requires an update(), render() and
Player.prototype.update = function() {
    if(this.y < 20) {
        score++;
        playerScore.textContent = score;
        this.reset();
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(way) {
    if(way == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if(way == 'right' && this.x < 400) {
        this.x += 100;
    }
    if(way == 'up' && this.y > 3) {
        this.y -= 90;
    }
    if(way == 'down' && this.y < 400) {
        this.y += 90;
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Now instantiate your objects.
const enemy1 = new Enemy(-90, 60);
const enemy2 = new Enemy(-100, 140);
const enemy3 = new Enemy(-200, 225);
const enemy4 = new Enemy(-300, 140);
const enemy5 = new Enemy(-400, 60);
const enemy6 = new Enemy(-500, 225);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
chooseGender.addEventListener('change', function(e) {
    switch(g) {
        case "boy": 
            player.sprite = "images/char-boy.png";
            score = 0;
            playerScore.textContent = score;
            player.reset();
            break;
        case "girl": 
            player.sprite = "images/char-pink-girl.png";
            score = 0;
            playerScore.textContent = score;
            player.reset();
            break;
        default:
            break;
    }
})
chooseGender.addEventListener('keypress', function(e) {
    if(e.keyCode == 13) {
        this.blur();
    }
})
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
