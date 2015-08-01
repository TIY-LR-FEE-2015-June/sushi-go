/**
 * Constructor for a Deck of Card objects
 * @param {Game} game - The current game to tell when game over
 */
function Deck(game) {
  this.game = game;

  // A Deck should store many Cards
  this.cards = [];
}

// A Deck should know it's initial card set
Deck.prototype.setupInfo = [
  {
    number: 14,
    name: 'Tempura',
    type: 'tempura',
    aiScore: 2 / 5
  },
  {
    number: 14,
    name: 'Sashimi',
    type: 'sashimi',
    aiScore: 10 / 3
  },
  {
    number: 14,
    name: 'Dumpling',
    type: 'dumpling',
    aiScore: 10 / 4
  },
  {
    number: 12,
    name: '2 Maki Rolls',
    type: 'maki-rolls',
    aiScore: 2
  },
  {
    number: 8,
    name: '3 Maki Rolls',
    type: 'maki-rolls',
    aiScore: 3
  },
  {
    number: 6,
    name: '1 Maki Rolls',
    type: 'maki-rolls',
    aiScore: 1
  },
  {
    number: 10,
    name: 'Salmon Nigiri',
    type: 'nigiri',
    aiScore: 2
  },
  {
    number: 5,
    name: 'Squid Nigiri',
    type: 'nigiri',
    aiScore: 3
  },
  {
    number: 5,
    name: 'Egg Nigiri',
    type: 'nigiri',
    aiScore: 1
  },
  {
    number: 10,
    name: 'Pudding',
    type: 'pudding',
    aiScore: 1
  },
  {
    number: 6,
    name: 'Wasabi',
    type: 'wasabi',
    aiScore: 1
  }
];

/**
 * A Deck should be able to initialize with standard Card set
 *
 * @return {null}
 */
Deck.prototype.setup = function() {
  // Take every card in setupInfo and add it to this.cards
  this.cards = _(this.setupInfo).reduce(function(cards, cardInfo) {
    for (var i = cardInfo.number - 1; i >= 0; i--) {
      cards.push(new Card(cardInfo.name, cardInfo.type, cardInfo.aiScore));
    }

    return cards;
  }, []);

  // Shuffle Deck
  this.shuffle();
};

/**
 * A Deck should be able to shuffle
 *
 * @return {null}
 */
Deck.prototype.shuffle = function() {
  this.cards = _(this.cards).shuffle();
};

/**
 * A Deck should be able to draw Cards
 *
 * @param  {number} amount
 * @return {Array}         Array of Card objects
 */
Deck.prototype.deal = function(amount) {
  var dealt = [];

  for (var i = 0; i < amount; i++) {
    // Remove returned cards from the deck
    var drawnCard = this.cards.pop();

    if (drawnCard) {
      dealt.push(drawnCard);
    } else if (this.game) {
      this.game.trigger('gameOver', 'Out of cards');
    }
  }

  // Returns a single card or number of cards requested
  return dealt;
};
