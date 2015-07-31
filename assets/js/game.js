function Game() {
  this.players = [];
  this.round = 0;
  this.roundNumber = 0;
  this.gameOver = false;
  this.playerWins = false;
  this.deck = new Deck(this);

  this.deck.setup();
  this.players.push(new Player(), new Player(true));

  this.on('start:round', function() {
    _.invoke(this.players, 'scoreDinner');

    // Checks if 3 rounds have been played
    if (this.roundNumber < 3) {
      this.roundNumber++;
      console.info('Starting round', this.roundNumber);

      this.dealRound();
    } else {
      this.gameOver = true;
      this.trigger('change');
    }
  });

  this.on('submit:card', function(index) {
    this.currentPlayer().chooseCard(index);
    _.invoke(this.aiPlayers(), 'chooseCard');

    if (this.currentPlayer().cards.length) {
      this.trigger('change');
    } else {
      this.trigger('start:round');
    }
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
