$('#game-board').html(AppTemplates.start());

$('#game-board').on('click', '.choose-character', function() {
  var game = new Game();

  $('#game-board').on('click', '.player-hand .card', function() {
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
