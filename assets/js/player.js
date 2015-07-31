function Player(computerPlayer) {
  this.dinner = [];

  Hand.apply(this);
  this.computerPlayer = computerPlayer || false;
}

Player.prototype = _.extend({
  constructor: Player,

  chooseCard: function(index) {
    var card = this.cards.splice(index, 1);

    this.dinner.concat(card);
  }
}, Hand.prototype);
