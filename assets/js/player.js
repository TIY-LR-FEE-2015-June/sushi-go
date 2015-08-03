/**
 * Creates a new Player object
 * @param {boolean} computerPlayer
 */
var Player = Backbone.Model.extend({
  defaults: {
    score: 0,
    hand: null,
    dinner: null,
    computerPlayer: false
  },

  initialize: function() {
    this.set('hand', new Hand());
    this.set('dinner', []);
  },

  addCards: function(cards) {
    this.get('hand').addCards(cards);
  },

  chooseCard: function(index) {
    var card = this.get('hand').chooseCard(index);

    this.set('dinner', this.get('dinner').concat(card));
  },

  scoreDinner: function() {
    var score = this.get('score');
    this.set('score', score + this.get('dinner').length);
    console.info('Score: ', this.get('score'));

    this.set('dinner', []);
  },

  toJSON: function() {
    var og = Backbone.Model.prototype.toJSON.apply(this);

    og.hand = og.hand.toJSON();

    return og;
  }
});
