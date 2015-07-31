function Player(computerPlayer) {
  Hand.apply(this);
  this.computerPlayer = computerPlayer || false;
}

Player.prototype = _.extend({
  constructor: Player
}, Hand.prototype);
