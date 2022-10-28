//load html tags and scores from localStorage
const game = localStorage.getItem("latestGame");
let p = document.querySelector("#score");
let p2 = document.querySelector("#scoreDescription");
const mostRecentScore = localStorage.getItem("mostRecentScore");
let reference = document.querySelector("#again");

//which game was last played and adjust innerHTML of html tags
switch (game) {
  case "memory":
    p2.innerHTML = "Your score is: ";
    p.innerHTML = mostRecentScore;
    reference.addEventListener(
      "click",
      () => (window.location.href = "/verbalMemory/memory.html")
    );
    document.querySelector("#top").innerHTML = "Memory test";
    break;
  case "aim":
    p.innerHTML = mostRecentScore + "ms";
    reference.addEventListener(
      "click",
      () => (window.location.href = "/aim/aim.html")
    );
    document.querySelector("#top").innerHTML = "Aim trainer";
    break;
  case "numberMemory":
    p2.innerHTML = "Your score is: ";
    p.innerHTML = mostRecentScore;
    reference.addEventListener(
      "click",
      () => (window.location.href = "/dragndrop/dragndropstart.html")
    );
    document.querySelector("#top").innerHTML = "Number memory";
}

const saveScoreButton = document.querySelector("#submitScore");
//user can save his score and attempt to get into top 10 if they wish
saveScoreButton.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector("#input");
  const value = input.value;
  //validate form
  if (value.length < 3) {
    alert("Username must have more than 2 characters");
    input.value = "";
    return;
  } else if (value.length > 20) {
    alert("Username must have at most 20 characters");
    input.value = "";
    return;
  }

  //store the high scores if user is good enough
  switch (game) {
    case "memory":
      let highScores =
        JSON.parse(localStorage.getItem("memoryHighScores")) || [];
      highScores.push({ username: value, mostRecentScore });
      highScores.sort((a, b) => {
        return b.mostRecentScore - a.mostRecentScore;
      });
      highScores.splice(10);
      localStorage.setItem(
        "memoryHighScores",
        JSON.stringify(highScores)
      );
      break;
    case "aim":
      let highScores2 =
        JSON.parse(localStorage.getItem("aimHighScores")) || [];
      highScores2.push({ username: value, mostRecentScore });
      highScores2.sort((a, b) => {
        return a.mostRecentScore - b.mostRecentScore;
      });
      highScores2.splice(10);
      localStorage.setItem("aimHighScores", JSON.stringify(highScores2));
      break;
    case "numberMemory":
      let highScores3 =
        JSON.parse(localStorage.getItem("numberHighScores")) || [];
      highScores3.push({ username: value, mostRecentScore });
      highScores3.sort((a, b) => {
        return b.mostRecentScore - a.mostRecentScore;
      }); 
      highScores3.splice(10);
      localStorage.setItem(
        "numberHighScores",
        JSON.stringify(highScores3)
      );
      break;
  }

  //redirect to leaderboard
  window.location.href = "../leaderboard/leaderboard.html";
});