// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.width = 65;
    this.height = 65;
    this.xStride = 101;
    this.yStride = 83;
    this.sprite = sprite;
    this.hasWon = false;
    this.hasCollision = false;
  }

	// Retrieve x coordinate of player
  getX() {
    return this.x;
  };

	// Retrieve y coordinate of player
  getY() {
    return this.y;
  }

	// Retrieve length of stride (step) in x direction
  getXStride() {
    return this.xStride;
  }

	// Retrieve length of stride (step) in y direction
  getYStride() {
    return this.yStride;
  }

	// Retrieve whether player has collided with enemy
  getHasCollision() {
    return this.hasCollision;
  }

	// Retrieve whether player has reached shore
  getHasWon() {
    return this.hasWon;
  }

  setX(x) {
    this.x = x;
  }
  
  setY(y) {
    this.y = y;
  }

  setHasWon(won) {
    this.hasWon = won;
  }

  setHasCollision(collision) {
    this.hasCollision = collision;
  }

	// Bring player to start, reset their win status, and reset collision status
  reset() {
		this.x = 202;
		this.y = 400;
		this.hasWon = false;
		this.hasCollision = false;
  }

  // Update the player's position, required method for game
  // Parameter: dt, a time delta between ticks
  update() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.  
    if(!this.hasWon && this.y === 68) {
        this.setHasWon(true);
    }
  };

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

	// Based on direction chosen, move the player a single stride, avoiding boundaries
  handleInput(direction) {
    switch(direction) {
			case 'left':	
				if(this.x > 0) {
						this.setX(this.x - this.xStride);
				}
				break;
			case 'right':
				if(this.x < this.xStride * 4) {
						this.setX(this.x + this.xStride);
				}
				break;
			case 'up':
				if(this.y > this.yStride) {
						this.setY(this.y - this.yStride);
				}
				break;
			case 'down':
				if(this.y < this.yStride * 4) {
						this.setY(this.y + this.yStride);
				}
				break;
			default:
    }
  }
}

class Enemy {
  constructor ({x, y, speed}) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started

		this.x = x ? x : this.getRandomX();
		this.y = y;
		this.width = 65;
		this.height = 65;
		this.speed = speed ? speed : this.getRandomSpeed();

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	};

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > ctx.canvas.width) {
        this.x = this.getRandomX();
        this.speed = this.getRandomSpeed();
    }
  };

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

	// Determine if enemy collided with player
  check(player) {
    let enemyLeft = this.x < player.x && this.x > player.x - this.width;
    let enemyRight = this.x > player.x && this.x < player.x + this.width;
    if(this.y === player.y && (enemyLeft || enemyRight)) {
        return true;
    }
    return false;
	}

	// Provides a random x coordinate off screen to the left
	getRandomX() {
		return Math.round(Math.random() * -250) - 100;
	}

	// Provides a random speed
  getRandomSpeed() {
    return Math.round(Math.random()*(375 - 250) + 250);
  }
}

class Game {
	constructor(player) {
		this.isOver = false;
		this.player = player;
	}

	setIsOver(over) {
		this.isOver = over;
	}

	// Updates player's collision status and win status
	update() {
		if(this.player.getHasCollision()) {
			alert('Ow! 🤕 You touched a bug. Looks like you got bitten. Try again');
			this.reset();
		}
		if(this.player.getHasWon()) {
			document.querySelector('.modal').classList.remove('hidden');
		}
	};  

	// Reset game by resetting player and clearing canvas
	reset() {
		player.reset(); 
		if(document.querySelector('.hidden') === null) {
			document.querySelector('.modal').classList.add('hidden');
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202, 400, 'images/char-pink-girl.png');
const game = new Game(player);
const enemyPositions = [
	player.getYStride() - 15,
	player.getYStride() * 2 - 15,
	player.getYStride() * 3 - 15
];

const allEnemies = enemyPositions.map((y, index) => {
	return new Enemy({ y });
})

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
	};
	
	if(!player.getHasWon()) {
			player.handleInput(allowedKeys[e.keyCode]);
	}
});

// If the user clicks the replay button, start game over
let replay = document.querySelector('.replay');

replay.addEventListener('click', () => {
	game.reset();
});
