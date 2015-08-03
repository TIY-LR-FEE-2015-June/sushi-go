function Game() {
  this.players = [];

  // A Game should keep track of the Turn Number
  this.round = 0;
  this.roundNumber = 0;
  this.gameOver = false;
  this.playerWins = false;

  // A Game should keep track of the Deck in Play
  this.deck = new Deck(this);

  // Setup our Deck
  this.deck.setup();

  // A Game should keep track of the Players
  this.players.push(new Player(), new Player(true));

  // A Game should be able to start a Round
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
    // Game should send chosen card to Player
    this.currentPlayer().chooseCard(index);

    // Game should trigger AI to choose a Card
    _.invoke(this.aiPlayers(), 'chooseCard');
    this.swapHands();

    // If a player still has cards in their hand, keep playing
    if (this.currentPlayer().cards.length) {
      this.trigger('change');
    } else { /* Else start a new round */
      this.trigger('start:round');
    }
  });
}

Game.prototype = _.extend({
  constructor: Game,

  // The number of Cards in each starting Hand
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

  swapHands: function() {
    _.reduce(this.players, function(prevHand, currentPlayer) {
      var handToPass = currentPlayer.cards;
      currentPlayer.cards = prevHand;

      return handToPass;
    }, this.lastPlayer().cards);
  },

  lastPlayer: function() {
    return this.players[this.players.length - 1];
  },

  currentPlayer: function() {
    return _.findWhere(this.players, {computerPlayer: false});
  },

  aiPlayers: function() {
    return _.where(this.players, {computerPlayer: true});
  }
}, Backbone.Events);
