var Game = Backbone.Model.extend({
  defaults: {
    players: [],
    round: 0,
    roundNumber: 0,
    gameOver: false,
    playerWins: false,
    deck: null,

  },

  initialize: function () {
    // A Game should keep track of the Deck in Play
    this.set('deck', new Deck(this));

    // Setup our Deck
    this.get('deck').setup();

    // A Game should keep track of the Players
    this.get('players').push(new Player(), new Player({computerPlayer: true}));

    // A Game should be able to start a Round
    this.on('start:round', function() {
      _.invoke(this.get('players'), 'scoreDinner');

      var roundNumber = this.get('roundNumber');

      // Checks if 3 rounds have been played
      if (roundNumber < 3) {
        roundNumber++;
        this.set('roundNumber', roundNumber);
        console.info('Starting round', roundNumber);

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
  },

  // The number of Cards in each starting Hand
  cardsPerPlayer: [
    {players: 2, cards: 10}
  ],

  dealRound: function() {
    var players = this.get('players');
    var cardsToDeal = _.findWhere(this.cardsPerPlayer, {players: players.length}).cards;
    var deck = this.get('deck');

    players.forEach(function(player) {
      player.addCards(deck.deal(cardsToDeal));
    });

    this.trigger('change');
  },

  swapHands: function() {
    _.reduce(this.get('players'), function(prevHand, currentPlayer) {
      var handToPass = currentPlayer.cards;
      currentPlayer.cards = prevHand;

      return handToPass;
    }, this.lastPlayer().cards);
  },

  lastPlayer: function() {
    return this.get('players')[this.get('players').length - 1];
  },

  currentPlayer: function() {
    return _.findWhere(this.get('players'), {computerPlayer: false});
  },

  aiPlayers: function() {
    return _.where(this.get('players'), {computerPlayer: true});
  },

  toJSON: function() {
    var og = Backbone.Model.prototype.toJSON.apply(this);

    og.players = _.invoke(og.players, 'toJSON');
    og.deck = og.deck.toJSON();

    return og;
  }
});
