let highScores;

const aimButton = document.getElementById("aim")
const verbalButton = document.getElementById("verbal")
const numberButton = document.getElementById("number")

const list = document.getElementById("leaderboardWrapper")

const resetButtonColors = () => {
    aimButton.style.backgroundColor = "rgb(105, 169, 190)"
    verbalButton.style.backgroundColor = "rgb(105, 169, 190)"
    numberButton.style.backgroundColor = "rgb(105, 169, 190)"
}

const createBevel = (positionVertical, positionHorizontal) => {
    const bevelWrapperDiv = document.createElement("div")
    bevelWrapperDiv.classList.add("bvc")

    const bevelDiv = document.createElement("div")
    bevelDiv.classList.add("bevel")
    if(positionVertical === "bottom"){
        bevelDiv.classList.add("bottoml")
        bevelDiv.classList.add("bottomr")
    }else {
        bevelDiv.classList.add("topl")
        bevelDiv.classList.add("topr")
    }
    bevelDiv.classList.add(positionHorizontal)

    bevelWrapperDiv.appendChild(bevelDiv)

    return bevelWrapperDiv
}

const handleButtonClick = (gameName) => {
    //remove all current results from the table
    while (list.firstChild) {
        list.removeChild(list.lastChild);
      }
    fetch(`localhost:3000/highScores/${gameName}`)
    .then(response => response.json())
    .then(data => {
        data
        //filter null values
        .filter(item => item[gameName] !== null)
        .map(score => {
            return {
                ownerName: score.owner.username,
                score: score[gameName]
            }
        })
        .forEach((listItem, index) => {
            const newScoreListItem = document.createElement("div")
            newScoreListItem.classList.add("leaderboardRowWrapper")
            const placeDiv = document.createElement("div")
            placeDiv.classList.add("boardPlace")
            placeDiv.innerHTML = `${index + 1}.`

            const firstDiv = document.createElement("div")
            firstDiv.classList.add("horizontalDiv")
            firstDiv.appendChild(placeDiv)
            firstDiv.appendChild(createBevel("top", "rightBevel"))

            newScoreListItem.appendChild(firstDiv)

            const usernameDiv = document.createElement("div")
            usernameDiv.classList.add("name")
            usernameDiv.innerHTML = listItem.ownerName

            const secondDiv = document.createElement("div")
            secondDiv.classList.add("horizontalDiv")

            secondDiv.appendChild(createBevel("bottom", "leftBevel"))
            secondDiv.appendChild(usernameDiv)
            secondDiv.appendChild(createBevel("bottom", "rightBevel"))

            newScoreListItem.appendChild(secondDiv)

            const thirdDiv = document.createElement("div")
            thirdDiv.classList.add("horizontalDiv")

            thirdDiv.appendChild(createBevel("top", "leftBevel"))

            const scoreDiv = document.createElement("div")
            scoreDiv.innerHTML = gameName === "aimTrainer" ? `${listItem.score} ms` : listItem.score
            scoreDiv.classList.add("score")

            thirdDiv.appendChild(scoreDiv)

            newScoreListItem.appendChild(thirdDiv)

            list.appendChild(newScoreListItem)
        })
            if(list.firstChild === null){
                const noResultsTextDiv = document.createElement("div")
                noResultsTextDiv.innerHTML = "No results here yet :("
                noResultsTextDiv.style.fontWeight = "bold"
                list.appendChild(noResultsTextDiv)
            }
        })
    }

aimButton.addEventListener("click", () => {
    resetButtonColors()
    aimButton.style.backgroundColor = "darkblue"
    handleButtonClick("aimTrainer")
})
verbalButton.addEventListener("click", () => {
    resetButtonColors()
    verbalButton.style.backgroundColor = "darkblue"
    handleButtonClick("verbalMemory")
})
numberButton.addEventListener("click", () => {
    resetButtonColors()
    numberButton.style.backgroundColor = "darkblue"
    handleButtonClick("numberMemory")
})