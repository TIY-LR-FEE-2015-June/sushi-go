function Game() {
  this.players = [];
  this.turnNumber = 0;
  this.gameOver = false;
  this.deck = new Deck(this);

  this.deck.setup();
  this.players.push(new Player(), new Player(true));

  this.on('start:round', function() {
    this.turnNumber++;
    console.info('Starting turn', this.turnNumber);

    this.dealRound();
  });
}

Game.prototype = _.extend({
  constructor: Game,

  cardsPerPlayer: [
    {players: 2, cards: 10}
  ],

  dealRound: function() {
    var cardsToDeal = _.findWhere(this.cardsPerPlayer, {players: this.players.length}).cards;
    var deck = this.deck;

    this.players.forEach(function(player) {
      player.addCards(deck.deal(cardsToDeal));
    });

    this.trigger('change');
  },

  currentPlayer: function() {
    return this.players.findWhere({computerPlayer: false});
  }
}, Backbone.Events);
