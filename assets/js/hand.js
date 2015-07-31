function Hand() {
  this.cards = [];
}

Hand.prototype = {
  constructor: Hand,

  addCards: function(cards) {
    this.cards = this.cards.concat(cards);
  },

  resetCards: function() {
    this.cards = [];
  }
};
