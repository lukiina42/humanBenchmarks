const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const successToast = document.getElementsByClassName("successToast")[0];

const saveHighScore = (highScores) => {
  fetch("http://localhost:3000/highScores", 
  {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
      },
      body: JSON.stringify({highScores: highScores})
  }
  )
  .then(response => {
    if(response.status !== 201) throw new Error()
    successToast.classList.add("visible")
    console.log(response)
    return response.json()
  .then(data => {
    if(userInfo.highScores.id === undefined) {
      userInfo = {
        highScores: {
          id: data.highScoreId,
          ...highScores
        },
        ...userInfo
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
  })
  })
}

(function init(){
  successToast.addEventListener("click", (e) => successToast.classList.remove("visible"))
})();


(function handleNewScore(){
  console.log(userInfo)

  //load html tags and scores from localStorage
  const game = localStorage.getItem("latestGame");
  let p = document.querySelector("#score");
  let p2 = document.querySelector("#scoreDescription");
  const mostRecentScore = localStorage.getItem("mostRecentScore");
  let reference = document.querySelector("#again");
  if(!userInfo.highScores){
    userInfo.highScores = {
      verbalMemory: null,
      numberMemory: null,
      aimTrainer: null
    }
  }
  let highScores = undefined
  //which game was last played and adjust innerHTML of html tags and save high score if it is good enough
  switch (game) {
    case "memory":
      p2.innerHTML = "Your score is: ";
      p.innerHTML = mostRecentScore;
      reference.addEventListener(
        "click",
        () => (window.location.href = "../verbalMemory/memory.html")
      );
      document.querySelector("#top").innerHTML = "Memory test";
  
      if(userInfo.highScores.verbalMemory === null || mostRecentScore > userInfo.highScores.verbalMemory){
        highScores = {
          ...userInfo.highScores,
          verbalMemory: parseInt(mostRecentScore),
        }
        saveHighScore(highScores)
      }
      break;
    case "aim":
      p.innerHTML = mostRecentScore + "ms";
      reference.addEventListener(
        "click",
        () => (window.location.href = "../aim/aim.html")
      );
      document.querySelector("#top").innerHTML = "Aim trainer";
  
      if(userInfo.highScores.aimTrainer === null || mostRecentScore < userInfo.highScores.aimTrainer){
        highScores = {
          ...userInfo.highScores,
          aimTrainer: parseFloat(mostRecentScore),
        }
        saveHighScore(highScores)
      }
      break;
    case "numberMemory":
      p2.innerHTML = "Your score is: ";
      p.innerHTML = mostRecentScore;
      reference.addEventListener(
        "click",
        () => (window.location.href = "../dragndrop/dragndropstart.html")
      );
      document.querySelector("#top").innerHTML = "Number memory";
  
      if(userInfo.highScores.numberMemory === null || mostRecentScore > userInfo.highScores.numberMemory){
        highScores = {
          ...userInfo.highScores,
          numberMemory: parseInt(mostRecentScore),
        }
        saveHighScore(highScores)
      }
      break;
  }
  
  if(highScores){
    localStorage.setItem("userInfo", JSON.stringify({
      ...userInfo,
      highScores
    }))
  }
})()
