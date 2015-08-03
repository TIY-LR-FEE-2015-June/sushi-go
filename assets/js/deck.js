/**
 * Constructor for a Deck of Card objects
 * @param {Game} game - The current game to tell when game over
 */
Deck = Backbone.Collection.extend({
  // A Deck should know it's initial card set
  setupInfo: [
    {
      number: 14,
      value: {
        name: 'Tempura',
        type: 'tempura',
        aiScore: 2 / 5
      }
    },
    {
      number: 14,
      value: {
        name: 'Sashimi',
        type: 'sashimi',
        aiScore: 10 / 3
      }
    },
    {
      number: 14,
      value: {
        name: 'Dumpling',
        type: 'dumpling',
        aiScore: 10 / 4
      }
    },
    {
      number: 12,
      value: {
        name: '2 Maki Rolls',
        type: 'maki-rolls',
        aiScore: 2
      }
    },
    {
      number: 8,
      value: {
        name: '3 Maki Rolls',
        type: 'maki-rolls',
        aiScore: 3
      }
    },
    {
      number: 6,
      value: {
        name: '1 Maki Rolls',
        type: 'maki-rolls',
        aiScore: 1
      }
    },
    {
      number: 10,
      value: {
        name: 'Salmon Nigiri',
        type: 'nigiri',
        aiScore: 2
      }
    },
    {
      number: 5,
      value: {
        name: 'Squid Nigiri',
        type: 'nigiri',
        aiScore: 3
      }
    },
    {
      number: 5,
      value: {
        name: 'Egg Nigiri',
        type: 'nigiri',
        aiScore: 1
      }
    },
    {
      number: 10,
      value: {
        name: 'Pudding',
        type: 'pudding',
        aiScore: 1
      }
    },
    {
      number: 6,
      value: {
        name: 'Wasabi',

        type: 'wasabi',
        aiScore: 1
      }
    }
  ],

  /**
   * A Deck should be able to initialize with standard Card set
   *
   * @return {null}
   */
  setup: function() {
    // Take every card in setupInfo and add it to the current collection
    this.reset(_(this.setupInfo).reduce(function(cards, cardInfo) {
      for (var i = cardInfo.number - 1; i >= 0; i--) {
        cards.push(new Card(cardInfo.value));
      }

      return cards;
    }, []));

    // Shuffle Deck
    this.shuffle();
  },

  /**
   * A Deck should be able to shuffle
   *
   * @return {null}
   */
  shuffle: function() {
    this.reset(Backbone.Collection.prototype.shuffle.apply(this));
  },

  /**
   * A Deck should be able to draw Cards
   *
   * @param  {number} amount
   * @return {Array}         Array of Card objects
   */
  deal: function(amount) {
    var dealt = [];

    for (var i = 0; i < amount; i++) {
      // Remove returned cards from the deck
      var drawnCard = this.pop();

      if (drawnCard) {
        dealt.push(drawnCard);
      } else if (this.game) {
        this.game.trigger('gameOver', 'Out of cards');
      }
    }

    // Returns a single card or number of cards requested
    return dealt;
  }
});
