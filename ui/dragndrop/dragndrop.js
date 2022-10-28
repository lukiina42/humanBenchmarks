//this game was written with the help of jQuery framework
$(document).ready(function () {
    jQuery.event.props.push("dataTransfer");

    class MemoryGame {
      //define variables
      constructor() {
        this.level = 1;
        this.hearts = 3;
        this.amountofDragto = 0;
        //start the first level of the game
        this.startLevel();
        setTimeout(this.hideOptions, 3000);
        this.init();
        //check selection button handler
        document
          .querySelector("#check")
          .addEventListener("click", (e) => this.handleCheckButton(e));
      }

      //Start and load the game
      init = function () {
        //handle drop of the number
        $(".dragto").on("drop", function (ev) {
          ev.preventDefault();
          let placeToDrop = ev.target;
          if (
            placeToDrop.children.length != 0 ||
            placeToDrop.className != "dragto"
          ) {
            return;
          }
          var data = ev.dataTransfer.getData("text");
          placeToDrop.appendChild(document.getElementById(data));
        });

        $(".dragto").on("dragover", function (ev) {
          ev.preventDefault();
        });

        $(".option").on("drop", function (ev) {
          ev.preventDefault();
        });

        $(".options").on("dragover", function (ev) {
          ev.preventDefault();
        });

        //on dragstart store id into the dragged item
        $(".option").on("dragstart", function (ev) {
          //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
          //too lazy to do it myself :)
          let func = function (length) {
            var result = [];
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result.push(
                characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                )
              );
            }
            let contains = false;
            //check if the generated id is unique
            $(".option").each((e) => {
              if (e.id === result.join("")) {
                contains = true;
              }
            });
            //if the generated id is unique, return it, call func again otherwise
            if (contains) {
              func(5);
            } else {
              return result.join("");
            }
          };
          //store id into dragged item
          if (!ev.target.id) {
            ev.target.id = func(5);
          }

          //set parametres of the data transfer
          ev.dataTransfer.setData("text", ev.target.id);
        });

        //if the number is in the box, return it back down on click
        $(".option").on("click", function (ev) {
          let clicked = ev.target;
          if (clicked.parentElement.className != "dragto") {
            return;
          }
          clicked.parentElement.removeChild(clicked);
          $("#chooseFrom").append(clicked);
        });

        //handle drop
        $(".options").on("drop", function (ev) {
          ev.preventDefault();
          let placeToDrop = ev.target;
          if (placeToDrop.className != "options") {
            return;
          }
          var data = ev.dataTransfer.getData("text");
          placeToDrop.appendChild(document.getElementById(data));
        });
      };
    }

    //load next level after correct completion of current level
    MemoryGame.prototype.nextLevel = function () {
      this.level += 1;
      this.clearAfterLevel();
      this.startLevel();
      this.init();
      setTimeout(this.hideOptions, 3000);
    };

    //repeat same level after wrong completion of current level
    MemoryGame.prototype.repeatLevel = function () {
      this.clearAfterLevel();
      this.startLevel();
      this.init();
      setTimeout(this.hideOptions, 3000);
    };

    MemoryGame.prototype.clearAfterLevel = function () {
      $(".option").remove();
    };

    //handle check button - check if user's order is correct, either repeat level, go to next level, or end game
    MemoryGame.prototype.handleCheckButton = function (e) {
      const dragToElems = document.querySelectorAll(".dragto");
      let correct = true;
      for (let i = 0; i < dragToElems.length; i++) {
        if (dragToElems[i].children.length === 0) {
          this.hearts -= 1;
          alert(
            "Wrong order, you got " +
              this.hearts +
              (this.hearts === 1 ? " heart left" : " hearts left")
          );
          if (this.hearts === 0) {
            this.endGame();
          }
          correct = false;
          break;
        }
        const child = dragToElems[i].firstChild;
        if ($(dragToElems[i]).data("foo") != child.innerHTML) {
          this.hearts -= 1;
          alert(
            "Wrong order, you got " +
              this.hearts +
              (this.hearts === 1 ? " heart left" : " hearts left")
          );
          correct = false;
          if (this.hearts === 0) {
            this.endGame();
          }
          break;
        }
      }
      if (correct) {
        this.nextLevel();
      } else {
        this.repeatLevel();
      }
    };

    //start new level with the help of variable this.level
    MemoryGame.prototype.startLevel = function () {
      document.querySelector("#check").disabled = true;
      let usedNumbers = [];
      for (let i = this.amountofDragto; i < this.level; i++) {
        this.amountofDragto += 1;
        let $newDiv = $("<div></div>").addClass("dragto");
        $(".places").append($newDiv);
      }
      const dragToElems = document.querySelectorAll(".dragto");
      for (let i = 0; i < dragToElems.length; i++) {
        let randNumber;
        while (true) {
          randNumber = Math.ceil(Math.random() * this.level);
          if (usedNumbers.filter((e) => e === randNumber).length === 0) {
            usedNumbers.push(randNumber);
            break;
          }
        }

        //newDiv = $('<div></div>').attr({ "draggable" : "true" }).addClass("option").html(randNumber);
        let elem = document.createElement("div");
        elem.setAttribute("draggable", "true");
        elem.className = "option";
        elem.innerHTML = randNumber;
        dragToElems[i].appendChild(elem);
        $(dragToElems[i]).data("foo", dragToElems[i].firstChild.innerHTML);
        console.log($(dragToElems[i]).data("foo"));
      }
    };

    //end the game, store scores into local storage and redirect user to end.html
    MemoryGame.prototype.endGame = function () {
      localStorage.setItem("mostRecentScore", this.level);
      localStorage.setItem("latestGame", "numberMemory");
      window.location.href = "../end/end.html";
    };

    //hide options after specified time
    MemoryGame.prototype.hideOptions = function () {
      document.querySelector("#check").disabled = false;
      //bad because I cannot sort it in nodeList form
      let optionsBad = document.querySelectorAll(".option"),
        i;

      //turn nodeList to array
      let turnObjToArray = function (obj) {
        return [].map.call(obj, function (element) {
          return element;
        });
      };

      let options = turnObjToArray(optionsBad);

      //sort array to make it easier for user
      options.sort((a, b) => {
        return parseInt(a.innerHTML) - parseInt(b.innerHTML);
      });

      options.forEach((e) => {
        e.parentElement.removeChild(e);
        $("#chooseFrom").append(e);
      });
    };

    new MemoryGame();
  });