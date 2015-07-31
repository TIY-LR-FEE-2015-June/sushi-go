function Player(computerPlayer) {
  this.dinner = [];
  this.score = 0;

  Hand.apply(this);
  this.computerPlayer = computerPlayer || false;
}

Player.prototype = _.extend({
  constructor: Player,

  chooseCard: function(index) {
    var card = this.cards.splice(index, 1);

    this.dinner = this.dinner.concat(card);
  },

  scoreDinner: function() {
    this.score += this.dinner.length;
    console.info('Score: ', this.score);

    this.dinner = [];
  }
}, Hand.prototype);
