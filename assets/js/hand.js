var Hand = Backbone.Collection.extend({
  // A Hand should be able to add cards
  addCards: function(cards) {
    this.add(cards);
  },

  resetCards: function() {
    this.reset([]);
  },

  chooseCard: function(index) {
    var card = this.at(index);
    this.remove(card);

    return card;
  }
});
