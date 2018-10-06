// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.width = 65;
    this.height = 65;
    this.dx = getRandomSpeed();

    // The image/sprite or our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(player.hasWon) {
        return;
    }
    let enemyLeft = this.x < player.x && this.x > player.x - this.width;
    let enemyRight = this.x > player.x && this.x < player.x + this.width;
    if(this.y === player.y && (enemyLeft || enemyRight)) {
        setGame('lose');
        resetGame();
    }
    this.x += this.dx * dt;

    if(this.x > ctx.canvas.width) {
        this.x = getRandomX();
        this.dx = getRandomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getX = () => {
    return this.x;
}

Enemy.prototype.getY = () => {
    return this.y;
}

Enemy.prototype.setX = (x) => {
    this.x = x;
}

Enemy.prototype.setY = (y) => {
    this.y = y;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.width = 65;
    this.height = 65;
    this.xStride = 101;
    this.yStride = 83;
    this.sprite = sprite;
    this.hasWon = false;

    this.getX = () => {
        return this.x;
    }

    this.getY = () => {
        return this.y;
    }

    this.getXStride = () => {
        return this.xStride;
    }

    this.getYStride = () => {
        return this.yStride;
    }

    this.setX = (x) => {
        this.x = x;
    }
    
    this.setY = (y) => {
        this.y = y;
    }

    this.reset = () => {
        this.x = 202;
        this.y = 400;
    }
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    if(this.hasWon) {
        return;
    }  
    if(this.y === 68) {
        setGame('won');
    }
        
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(this.hasWon) {
        return;
    }
    let x = this.getX();
    let y = this.getY();
    let xStride = this.getXStride();
    let yStride = this.getYStride();
    switch(direction) {
        case 'left':
            
            if(x > 0) {
                this.setX(x - xStride);
            }
            break;
        case 'right':
            if(x < xStride * 4) {
                this.setX(x + xStride);
            }
            break;
        case 'up':
            if(y > yStride) {
                this.setY(y - yStride);
            }
            break;
        case 'down':
            if(y < yStride * 4) {
                this.setY(y + yStride);
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202, 400, 'images/char-pink-girl.png');
const enemyPositions = [
    player.getYStride() - 15,
    player.getYStride() * 2 - 15,
    player.getYStride() * 3 - 15
];

const getRandomX = () => {
    return Math.round(Math.random() * -150) - 100;
}

const getRandomSpeed = () => {
    return Math.round(Math.random()*(350 - 200) + 200);
}

const allEnemies = enemyPositions.map((y, index) => {
    return new Enemy(getRandomX(), y);
})

const resetGame = () => {
    player.reset();
    player.hasWon = false;
}

const setGame = (status) => {
    switch(status) {
        case 'won':
            document.querySelector('.modal').classList.remove('hidden');
            player.hasWon = true;
            break;
        case 'lose':
            alert('Ow! 🤕 You touched the bug. Looks like you got bitten. Try again');
            break;
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let replay = document.querySelector('.replay');

replay.addEventListener('click', () => {
    document.querySelector('.modal').classList.add('hidden');
    resetGame();
});
