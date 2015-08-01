/**
 * Creates a new Player object
 * @param {boolean} computerPlayer
 */
function Player(computerPlayer) {
  // A Player should have a dinner set of Cards
  this.dinner = [];
  this.score = 0;

  // Extend Hand and now players have `this.cards`
  // A Player should have a Hand of Cards
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
