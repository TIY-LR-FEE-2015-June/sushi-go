function AI() {
  Player.apply(true);
}

AI.prototype = _.extend({
  constructor: AI,
  chooseCard: function() {
    var randIndex = _.random(this.cards - 1);

    Player.prototype.chooseCard.apply(this, randIndex);
  }
}, Player);
