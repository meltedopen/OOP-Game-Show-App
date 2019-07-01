class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // Adds letter placeholders to the display when the game starts.
  addPhraseToDisplay() {
    const chars = this.phrase.split('');
    const patt = /[a-z]/;

    for (let char of chars) {
      let result = patt.test(char);
      if (result) {
        let li = document.createElement('li');

        li.textContent = char;
        li.classList.add('hide', 'letter', char);

        document.querySelector('#phrase ul').appendChild(li);
      } else {
        let li = document.createElement('li');

        li.textContent = char;
        li.className = 'space';

        document.querySelector('#phrase ul').appendChild(li);
      }
    }
  }

  // Checks to see if the letter selected by player matches a letter in the phrase
  checkLetter(letter) {
    if (this.phrase.toLowerCase().includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  // Reveals the letters on the board that match the selection

  showMatchedLetter(letter) {
    let matched = document.querySelectorAll(`.${letter}`);
    matched.forEach(matching => (matching.className = `show letter ${letter}`));
  }
}
