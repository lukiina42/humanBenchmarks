let highScores;

const aimButton = document.getElementById("aim")
const verbalButton = document.getElementById("verbal")
const numberButton = document.getElementById("number")

const handleButtonClick = (gameName) => {
    fetch(`http://localhost:3000/highScores/${gameName}`).then(response => response.json()).then(data => console.log(data))
}

aimButton.addEventListener("click", () => handleButtonClick("aimTrainer"))
verbalButton.addEventListener("click", () => handleButtonClick("verbalMemory"))
numberButton.addEventListener("click", () => handleButtonClick("numberMemory"))

//load the scores into list on the page
// for (let i = 0; i < highScores.length; i++) {
//   let newScore = document.createElement("li");
//   newScore.className = "list";
//   if (game === "aim") {
//     newScore.innerHTML =
//       highScores[i].username +
//       ": " +
//       highScores[i].mostRecentScore +
//       "ms";
//   } else if (game === "memory" || game === "numberMemory") {
//     newScore.innerHTML =
//       highScores[i].username + ": " + highScores[i].mostRecentScore;
//   }
//   list.appendChild(newScore);
// }