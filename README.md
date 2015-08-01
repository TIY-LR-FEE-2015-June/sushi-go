# Sushi Go.js

This is an educational resource looking at JS prototypes, Backbone.Events, Handlebars, and _.extend.

This is not completed and is for educational purposes only.

Check out the current build at: http://tiy-lr-fee-2015-june.github.io/sushi-go/

## Features

* A Card should have: name, score value, balance value
* A Hand should store many Cards
* A Hand should be able to add cards
* A Deck should store many Cards
* A Deck should be able to initialize with standard Card set
* A Deck should be able to shuffle
* A Deck should be able to draw Cards
    - Returns a single card or number of cards requested
    - Remove returned cards from the deck
* A Player should have a Hand of Cards
* A Player should have a dinner set of Cards
* A Game should keep track of
    - The Deck in play
    - The turn number
    - The Players
    - The number of Cards in each starting Hand
* A User should see a start screen
    - Render a `start` template to the DOM
* A User should be able to choose a number of AI opponents
    - A Game should be started with a number of players
* A Game should be able to start a Round
    - Increment Round Number
    - Deal Cards to Players
* A User should see their hand after clicking start
    - Start a Round in our Game
* A User should see the updated game whenever Dinners or Hands `change`
    - Render a `game` template to the DOM with the current Game object as context
* A User should be able to choose a card for this turn
    - Game should send chosen card to Player
    - Game should trigger AI to choose a Card
* A Game should trade hands when all players have played
