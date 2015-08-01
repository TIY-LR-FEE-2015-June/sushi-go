// A User should see a start screen
$('#game-board').html(AppTemplates.start());

// A User should be able to choose a number of AI opponents
$('#game-board').on('click', '.choose-character', function() {
  // A Game should be started with a number of players
  var numberOfPlayers = parseInt($(this).html());
  var game = new Game(numberOfPlayers);

  // A User should be able to choose a card for this hand
  $('#game-board').on('click', '.player-hand .card', function() {
    var index = $(this).data('index');

    game.trigger('submit:card', index);
  });

  // A User should see the updated game whenever Dinners or Hands `change`
  game.on('change', function() {
    if (game.gameOver) {
      $('#game-board').html(AppTemplates['game-over'](game));
    } else {
      $('#game-board').html(AppTemplates.game(game));
    }
  });

  // Start first round
  game.trigger('start:round');
});
