//load html and high scores from localStorage
let highScores;
let header = document.querySelector("#leaderboardHeader");
let list = document.querySelector("#leaderboard");
const game = localStorage.getItem("latestGame");
let mostRecentScore = localStorage.getItem("mostRecentScore");
let reference = document.querySelector("#again");

//adjust innerHTML of tags by the type of the game
switch (game) {
  case "memory":
    reference.addEventListener(
      "click",
      () => (window.location.href = "../verbalMemory/memory.html")
    );

    document.querySelector("#top").innerHTML = "Memory test";
    header.innerHTML = "The best scores in memory test:";

    highScores = JSON.parse(localStorage.getItem("memoryHighScores"));

    break;

  case "aim":
    reference.addEventListener(
      "click",
      () => (window.location.href = "../aim/aim.html")
    );

    document.querySelector("#top").innerHTML = "Aim trainer";
    header.innerHTML = "The best scores in aim trainer:";

    highScores = JSON.parse(localStorage.getItem("aimHighScores"));

    break;

  case "numberMemory":
    reference.addEventListener(
      "click",
      () => (window.location.href = "../dragndrop/dragndropstart.html")
    );

    document.querySelector("#top").innerHTML = "Number memory";
    header.innerHTML = "The best scores in number memory:";

    highScores = JSON.parse(localStorage.getItem("numberHighScores"));

    break;
}

//play the sounds - win sound if user got into top 10, lose sound otherwise
if(
      highScores.length < 10 ||
      (game === "aim" ? mostRecentScore >= highScores[9].mostRecentScore : mostRecentScore <= highScores[9].mostRecentScore)
  ) {
    const audioWin = new Audio("../sounds/win.wav");
    //toggle visibility of audio, user can play himself a song if he wants
    let div = document.querySelector(".toggleVisible");
    div.classList.remove("toggleVisible");
    div.classList.add("visible");
    audioWin.play();
  } else {
    const audioLose = new Audio("../sounds/lose.wav");
    audioLose.play();
  }

//load the scores into list on the page
for (let i = 0; i < highScores.length; i++) {
  let newScore = document.createElement("li");
  newScore.className = "list";
  if (game === "aim") {
    newScore.innerHTML =
      highScores[i].username +
      ": " +
      highScores[i].mostRecentScore +
      "ms";
  } else if (game === "memory" || game === "numberMemory") {
    newScore.innerHTML =
      highScores[i].username + ": " + highScores[i].mostRecentScore;
  }
  list.appendChild(newScore);
}