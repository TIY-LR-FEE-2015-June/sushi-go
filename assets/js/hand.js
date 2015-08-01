function Hand() {
  // A Hand should store many Cards
  this.cards = [];
}

Hand.prototype = {
  constructor: Hand,

  // A Hand should be able to add cards
  addCards: function(cards) {
    this.cards = this.cards.concat(cards);
  },

  resetCards: function() {
    this.cards = [];
  }
};
