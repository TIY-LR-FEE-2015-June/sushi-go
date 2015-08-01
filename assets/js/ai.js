function AI() {
  Player.apply(true);
}

AI.prototype = _.extend({
  constructor: AI,
  chooseCard: function() {
    var highest = _.max(this.cards, 'aiScore');
    var index = this.cards.indexOf(highest);

    Player.prototype.chooseCard.apply(this, index);
  }
}, Player);
