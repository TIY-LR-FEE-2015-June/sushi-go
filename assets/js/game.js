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

  this.on('submit:card', function(index) {
    this.currentPlayer().chooseCard(index);
    _.invoke(this.aiPlayers(), 'chooseCard');

    this.trigger('change');
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
    return _.findWhere(this.players, {computerPlayer: false});
  },

  aiPlayers: function() {
    return _.where(this.players, {computerPlayer: true});
  }
}, Backbone.Events);
