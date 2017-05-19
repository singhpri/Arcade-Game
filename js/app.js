// Enemies our player must avoid
var firstPos = -10;
var score = 0;
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
var enemy1 = new Enemy(-10,100,150);
var enemy2 = new Enemy(-10, 150, 100);
var enemy3 = new Enemy(-10, 125, 50);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if(player.x < (this.x + 60) && player.x > (this.x - 60)){
       if(player.y < (this.y + 70) && (player.y + 50) > this.y){
         $('h3').text("You Lost! Next game!");
         player.reset();
    }}
    if(this.x > 500){
      this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.reset = function(){
  this.x = firstPos;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = null;
  this.x = x;
  this.y = y;
  this.score = 0;
}
Player.prototype.update = function(){
  if (this.sprite === null){
    $('h2').text("Pick the player!");
  }
  else if (this.y < 5){
    this.score++;
    this.reset();
    $('h3').text("You win! Your score is " + this.score);
  }
  if(this.sprite != null){
    $('h2').text("Dodge the bugs!");
  }
};
Player.prototype.render = function(){
  if(this.sprite != null){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  else
    this.players();
};
//Draw the selection of players on screen
Player.prototype.players = function(){
 ctx.drawImage(Resources.get('images/char-boy.png'), 120, 350);
 ctx.drawImage(Resources.get('images/char-cat-girl.png'), 220, 350);
 ctx.drawImage(Resources.get('images/char-horn-girl.png'), 320, 350);
 }
 //Let user select one of the players
 Player.prototype.playerSelection = function(a, b){
   var imageBoy = 'images/char-boy.png';
   var catGirl = 'images/char-cat-girl.png';
   var hornGirl = 'images/char-horn-girl.png';
   if ((b < 350 + 140)&&(b > 350 + 80)){
     if((a > 120 + 20)&& (a < 120 + 80)){
       this.sprite = imageBoy;
     }
     else if((a > 220)&& (a < 220 + 80)){
       this.sprite = catGirl;
     }
     else if((a > 320) && (a < 320 + 80)){
       this.sprite = hornGirl;
     }
    }
}
//User moves the selected player in chosen direction
Player.prototype.handleInput = function(keycode){
    var moveX = 20;
    var moveY = 20;
    if ((keycode == "left") && (this.x > -10)){
      this.x -= moveX;
    }
    else if((keycode == "right") && (this.x < 410)){
      this.x += moveX;
    }
    else if ((keycode == "up") && (this.y >= 2)){
      this.y -= moveY;
    }
    else if ((keycode == "down") && (this.y < 425)){
      this.y += moveY;
    }
};
//puts the player back in the original place
Player.prototype.reset = function(){
  this.x = 200;
  this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player(200,400);

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
//This listens for clicks and sends the coordinates to
//Player.playerSelection() method.
document.addEventListener('click', function(event){
  var rect = canvas.getBoundingClientRect();
  var a = event.clientX - rect.left,
        b = event.clientY - rect.top;
        player.playerSelection(a, b);
});
