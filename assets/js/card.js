/**
* A Card should have: name, score value, balance value
* @param {string} name
* @param {string} type    Type of card - used for scoring
* @param {number} aiScore Balance value for AI choices
*/
var Card = Backbone.Model.extend({
  defaults: {
    name: null,
    type: null,
    aiScore: null
  }
});
