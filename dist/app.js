AppTemplates = {};

Handlebars.registerHelper('slug', function(str) {
  return str.toLowerCase().replace(' ', '-');
});

AppTemplates['game-over'] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "<h1>You Win!</h1>\n";
},"3":function(depth0,helpers,partials,data) {
    return "<h1>You Lose!</h1>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.playerWins : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
AppTemplates['game'] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,((stack1 = blockParams[0][0]) != null ? stack1.computerPlayer : stack1),{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams),"inverse":this.program(4, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,((stack1 = blockParams[0][0]) != null ? stack1.cards : stack1),{"name":"each","hash":{},"fn":this.program(6, data, 1, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "    <div class=\"computer\">\n";
},"4":function(depth0,helpers,partials,data) {
    return "    <div class=\"player\">\n";
},"6":function(depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "        <div class=\"card "
    + alias2((helpers.slug || (depth0 && depth0.slug) || alias1).call(depth0,((stack1 = blockParams[0][0]) != null ? stack1.type : stack1),{"name":"slug","hash":{},"data":data,"blockParams":blockParams}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n            "
    + alias2(this.lambda(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.players : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 1, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
AppTemplates['start'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Select Number of Players</h1>\n\n<button class=\"choose-character\">2</button>\n<button class=\"choose-character\">3</button>\n<button class=\"choose-character\">4</button>\n";
},"useData":true});
function Card(name, type, aiScore) {
  this.name = name;
  this.type = type;
  this.aiScore = aiScore;
}

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

function Hand() {
  this.cards = [];
}

Hand.prototype = {
  constructor: Hand,

  addCards: function(cards) {
    this.cards = this.cards.concat(cards);
  },

  resetCards: function() {
    this.cards = [];
  }
};

function Player(computerPlayer) {
  Hand.apply(this);
  this.computerPlayer = computerPlayer || false;
}

Player.prototype = _.extend({
  constructor: Player
}, Hand.prototype);

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

$('#game-board').html(AppTemplates.start());

$('#game-board').on('click', '.choose-character', function() {
  var game = new Game();

  $('#game-board').on('click', '.player .card', function() {
    var index = $(this).data('index');

    game.trigger('submit:card', index);
  });

  game.on('change', function() {
    if (game.gameOver) {
      $('#game-board').html(AppTemplates['game-over'](game));
    } else {
      $('#game-board').html(AppTemplates.game(game));
    }
  });

  game.trigger('start:round');
});
//# sourceMappingURL=app.map