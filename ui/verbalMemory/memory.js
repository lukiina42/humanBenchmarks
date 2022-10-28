 //define words in the game
 const words = [
    "Vegetable",
    "Fruit",
    "Hypocrite",
    "Game",
    "Battleship",
    "Hangman",
    "Example",
    "Article",
    "Hammer",
    "Friend",
    "Book",
    "Possession",
    "Devil",
    "Angel",
    "Reader",
    "Implication",
    "Baseball",
    "Semicolon",
    "JavaScript",
    "Notebook",
    "Telephone",
    "Microphone",
    "Charger",
    "Monitor",
    "Keyboard",
    "Chair",
    "Table",
    "Apple",
    "Table",
    "Glass",
    "Sun",
    "Moon",
    "Tea",
    "Flower",
    "Phone",
    "Car",
    "Squirell",
    "House",
    "Chimney",
    "Roof",
    "Garden",
    "Frog",
    "Fireman",
    "Rain",
    "Gatekeeper",
    "Game",
    "Nut",
    "Lunch",
    "Breakfast",
    "Dinner",
    "Snack",
    "Carpet",
    "Freeze",
    "Living",
    "Pillow",
    "Dress",
    "Shirt",
    "Earrings",
    "Daughter",
    "Sun",
    "Teeth",
    "Bottle",
    "Lemon",
    "Orange",
    "Peas",
    "Wardrobe",
    "Door",
    "Pool",
    "Charger",
    "Lawn",
    "Riverside",
    "Water",
    "Watermelon",
    "Electricity",
    "Candle",
    "Plane",
    "Tea",
    "Teatree",
    "Nose",
    "Hair",
    "Heir",
    "Sea",
    "Lake",
    "Horse",
    "Body",
    "Citizen",
    "Citizenship",
    "Head",
    "Chair",
    "Mountain",
    "Magazine",
  ];

  //will add seen words into this array
  let seenWords = [];

  let score = 0;
  let hearts = 3;

  const textField = document.querySelector(".word");
  const scoreField = document.querySelector(".score");

  changeWord();

  let buttonSeen = document.querySelector("#seen");
  let buttonNew = document.querySelector("#new");

  //handle buttons which operate the game
  buttonSeen.addEventListener("click", handleSeenButton);
  buttonNew.addEventListener("click", handleNewButton);

  //change the shown word from the words array
  function changeWord() {
    let currentWordIndex = Math.floor(Math.random() * words.length) - 1;
    currentWordIndex = currentWordIndex < 0 ? 0 : currentWordIndex;
    currentWord = words[currentWordIndex];
    textField.innerHTML = currentWord;
  }

  //handle seen button, check if the word is in seenWords
  function handleSeenButton(e) {
    if (seenWords.filter((word) => word === currentWord).length == 0) {
      if (hearts === 0) {
        endGame();
        return;
      }
      removeHeart();
      changeWord();
      hearts -= 1;
    } else {
      changeWord();
      score += 1;
      scoreField.innerHTML = "Score: " + score;
    }
  }

  //end game, store score into local storage and redirect
  function endGame() {
    localStorage.setItem("latestGame", "memory");
    localStorage.setItem("mostRecentScore", score);
    window.location.href = "../end/end.html";
  }

  //remove heart if user selects wrong button
  function removeHeart() {
    let heart = document.querySelector("#heart" + hearts);
    heart.classList.toggle("disappear");
    heart.removeAttributeNS(null, "fill", heart);
    heart.setAttributeNS(null, "fill", "none");
  }

  //handle new button, if the word is not in seenWords, then the choice is correct
  function handleNewButton(e) {
    if (seenWords.filter((word) => word === currentWord).length != 0) {
      if (hearts === 0) {
        endGame();
        return;
      }
      removeHeart();
      changeWord();
      hearts -= 1;
    } else {
      seenWords.push(currentWord);
      changeWord();
      score += 1;
      scoreField.innerHTML = "Score: " + score;
    }
  }