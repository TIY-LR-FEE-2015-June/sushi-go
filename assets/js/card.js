/**
 * A Card should have: name, score value, balance value
 * @param {string} name
 * @param {string} type    Type of card - used for scoring
 * @param {number} aiScore Balance value for AI choices
 */
function Card(name, type, aiScore) {
  this.name = name;
  this.type = type;
  this.aiScore = aiScore;
}
