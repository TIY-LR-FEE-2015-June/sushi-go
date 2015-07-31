function Game() {
  this.players = [];
  this.turnNumber = 0;
  this.deck = new Deck();

  this.deck.setup();
}

Game.prototype = _.extend({
    constructor: Game
}, Backbone.Events);
