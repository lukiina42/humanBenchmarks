//create canvas, get context and fill with gradient
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let g = ctx.createLinearGradient(0, 0, 1000, 500);
g.addColorStop(0, "red");
g.addColorStop(1, "blue");
ctx.fillStyle = g;

//Class to hold variables and methods
class Timer {
  //defining variables
  constructor(canvas) {
    this._canvas = canvas;
    this._cxt = this._canvas.getContext("2d");
    this.beginning = Date.now();
    this.end;
    this.counter = 0;
    this.firstClick = false;
    this.amountOfCircles = 20;
    this.WIDTH = canvas.offsetWidth;
    this.HEIGHT = canvas.offsetHeight;
    this.finished = false;

    //add event listener when user clicks on canvas
    this._canvas.addEventListener("click", (e) => this.handleClick(e));
  }

  //draw circle on random place in canvas
  draw = function draw() {
    //get random coordinates in canvas
    let x = Math.abs(Math.random() * this.WIDTH - (35 + 6));
    let y = Math.abs(Math.random() * this.HEIGHT - (35 + 6));
    if (x < 35) {
      x += 35;
    }
    if (y < 35) {
      y += 35;
    }
    //draw circle
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  };

  //function to determine rgb structure of pixel(help from stackoverflow)
  rgbToHex = function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  };

  //handle click of the user on canvas
  handleClick(e) {
    if (this.finished) {
      return;
    }
    //start the game on first click
    if (!this.firstClick) {
      this.beginning = Date.now();
      this.firstClick = true;
      //draw first circle
      this.draw();
    }
    const canvasX = e.offsetX;
    const canvasY = e.offsetY;
    //get color of the pixel user clicked
    const p = this._cxt.getImageData(canvasX, canvasY, 1, 1).data;
    const hex =
      "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    //if color is different from background color, then user clicked on the circle -> increment points
    if (hex != "#000000") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.counter += 1;
      //if he clicked as many circles as is defined in amount of circles, end the game, else draw another circle
      if (this.counter === this.amountOfCircles) {
        this.end = Date.now();
        this.finished = true;
        this.handleEnd();
      } else {
        this.draw();
      }
    }
  }

  //end the game
  handleEnd() {
    const time = this.end - this.beginning;
    //count the average time per one circle of the user
    const averageTime =
      Math.round((time / this.amountOfCircles + Number.EPSILON) * 100) /
      100;
    //store score into local storage and redirect user to end site
    localStorage.setItem("mostRecentScore", averageTime);
    localStorage.setItem("latestGame", "aim");
    window.location.href = "../end/end.html";
  }
}

//start the game
new Timer(canvas);