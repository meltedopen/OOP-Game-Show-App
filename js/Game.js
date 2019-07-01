class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  // Game phrases
  createPhrases() {
    const phrases = [];
    const phraseStrings = [
      'The best of both worlds',
      'Speak of the devil',
      'See eye to eye',
      'Once in a blue moon',
      'To hit the nail on the head',
      'To cost an arm and a leg',
      'A piece of cake',
      'You can’t judge a book by its cover',
      'To feel under the weather',
      'To kill two birds with one stone',
      'To cut corners',
      'To add insult to injury'
    ];
    for (let phraseString of phraseStrings) {
      let phrase = new Phrase(phraseString);
      phrases.push(phrase);
    }
    return phrases;
  }

  // Selects random phrase
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * 10)];
  }

  startGame() {
    // Hides the start screen overlay, calls getRandomPhrase(), then adds phrase to gameboard
    const startDiv = document.getElementById('overlay');
    startDiv.style.display = 'none';

    const randomPhrase = this.getRandomPhrase();
    randomPhrase.addPhraseToDisplay();
    this.activePhrase = randomPhrase;

    document.getElementById('overlay').style.display = 'none';
  }

  // Checks to see if player has revealed all of the letters in the active phrase
  checkForWin() {
    const shown = document.getElementsByClassName('letter');
    const shownArr = [...shown];

    for (let show of shownArr) {
      if (show.classList.contains('hide')) {
        return false;
      }
    }
    return true;
  }

  // If player loses 5 lives, game ends

  gameOver(gameWon) {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = 'block';

    const gameEndMessage = document.getElementById('game-over-message');
    const gameEndOverlay = document.getElementById('overlay');
    if (gameWon) {
      gameEndMessage.textContent = 'Good Work, You Won!';
      gameEndOverlay.classList.replace('start', 'win');
    } else {
      gameEndMessage.textContent = 'You Lost... Beter Luck Next Time!';
      gameEndOverlay.classList.replace('start', 'lose');
    }
  }

  // Removes a life if player is wrong
  removeLife() {
    let heart = document.getElementsByTagName('img');
    heart[this.missed].setAttribute('src', 'images/lostHeart.png');
    this.missed += 1;

    if (this.missed === 5) {
      this.gameOver();
    }
  }

  // Disable selected letter's onscreen keyboard button
  // If phrase dosent include guessed letter , add wrong (CSS class)
  // If phrase includes the right letter, add correct (CSS class)
  handleInteraction(keyButton) {
    const keys = document.getElementsByClassName('key');
    for (let key of keys) {
      if (key.textContent === keyButton.textContent) {
        key.setAttribute('disabled', 'disabled');
      }
    }
    const isMatched = this.activePhrase.checkLetter(keyButton.textContent);
    if (isMatched) {
      keyButton.classList.add('chosen');
      this.activePhrase.showMatchedLetter(keyButton.textContent);
      if (this.checkForWin()) {
        this.gameOver(this.checkForWin());
      }
    } else {
      keyButton.classList.add('wrong');
      this.removeLife();
    }
    console.log(keyButton);
  }
}
