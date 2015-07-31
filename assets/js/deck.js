/**
 * Constructor for a Deck of Card objects
 * @param {Game} game - The current game to tell when game over
 */
function Deck(game) {
  this.game = game;
  this.cards = [];
}

Deck.prototype.setupInfo = [
  {
    number: 14,
    name: 'Tempura',
    type: 'tempura',
    aiScore: 1
  },
  {
    number: 14,
    name: 'Sashimi',
    type: 'sashimi',
    aiScore: 1
  },
  {
    number: 14,
    name: 'Dumpling',
    type: 'dumpling',
    aiScore: 1
  },
  {
    number: 12,
    name: '2 Maki Rolls',
    type: 'maki-rolls',
    aiScore: 1
  },
  {
    number: 8,
    name: '3 Maki Rolls',
    type: 'maki-rolls',
    aiScore: 1
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
    aiScore: 1
  },
  {
    number: 5,
    name: 'Squid Nigiri',
    type: 'nigiri',
    aiScore: 1
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

Deck.prototype.setup = function() {
  // Take every card in setupInfo and add it to this.cards
  this.cards = _(this.setupInfo).reduce(function(cards, cardInfo) {
    for (var i = cardInfo.number - 1; i >= 0; i--) {
      cards.push(new Card(cardInfo.name, cardInfo.type, cardInfo.aiScore));
    }

    return cards;
  }, []);

  // Shuffle Deck
  this.cards = _(this.cards).shuffle();
};

Deck.prototype.deal = function(amount) {
  var hand = [];

  for (var i = 0; i < amount; i++) {
    var drawnCard = this.cards.pop();

    if (drawnCard) {
      hand.push(drawnCard);
    } else if (this.game) {
      this.game.trigger('gameOver', 'Out of cards');
    }
  }

  return hand;
};
