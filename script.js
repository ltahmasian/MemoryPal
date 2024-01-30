class MemoryPal {
  constructor() {
    this.mainContainer = document.querySelector(".main-container");
    this.menuLogo = document.querySelector(".menu-logo");
    this.menuTitle = document.querySelector(".menu-title");
    this.menuStartBtn = document.querySelector(".menu-start-btn");

    this.gameBoard = null;
    this.levelContainer = null;
    this.gameChoices = [];
    this.userChoices = [];
    this.startLvlBtn = null;
    this.resetLvlBtn = null;
    this.tile = null;
    this.tileId = null;
    this.btnContainer = null;
    this.level = 0;
    this.numLoops = 2;

    this.startLevel = this.startLevel.bind(this);
    this.resetLevel = this.resetLevel.bind(this);

    this.menuStartBtn.addEventListener("click", this.startGame.bind(this));
  }

  hideMenu() {
    const elementsToRemove = [this.menuLogo, this.menuTitle, this.menuStartBtn];
    elementsToRemove.forEach((element) => {
      element.style.transition = "opacity 0.2s";
      element.style.opacity = 0;
      setTimeout(() => this.mainContainer.removeChild(element), 200);
    });
  }

  loadLevelContainer() {
    this.levelContainer = document.createElement("div");
    this.levelContainer.classList.add("level-container");
    this.levelContainer.textContent = "Click Start to Begin";
    this.mainContainer.insertBefore(this.levelContainer, this.gameBoard);
  }

  loadGameBoard() {
    this.gameBoard = document.createElement("div");
    this.gameBoard.classList.add("game-board");
    this.mainContainer.appendChild(this.gameBoard);
  }

  loadGameTiles() {
    for (let i = 0; i < 9; i++) {
      this.tile = document.createElement("div");
      this.tileId = `tile${i}`;
      this.tile.setAttribute("id", this.tileId);
      this.tile.classList.add("tile");
      this.gameBoard.appendChild(this.tile);
    }
  }

  loadGameBtns() {
    this.btnContainer = document.createElement("div");
    this.btnContainer.classList.add("btn-container");

    this.startLvlBtn = document.createElement("button");
    this.startLvlBtn.classList.add("start-lvl-btn");
    this.startLvlBtn.textContent = "Start";
    this.startLvlBtn.addEventListener("click", this.startLevel);

    this.resetLvlBtn = document.createElement("button");
    this.resetLvlBtn.classList.add("reset-lvl-btn");
    this.resetLvlBtn.textContent = "Reset";
    this.resetLvlBtn.addEventListener("click", this.resetLevel);
    this.btnContainer.appendChild(this.startLvlBtn);
    this.btnContainer.appendChild(this.resetLvlBtn);
    this.mainContainer.appendChild(this.btnContainer);
  }

  async generateTiles(loopCount) {
    this.gameChoices = [];
    const emojis = ["😊", "😍", "🥳", "🎉", "👏", "🌟", "🚀", "🎈", "❤️"];
    for (let i = 0; i < loopCount; i++) {
      this.levelContainer.textContent = `Level ${this.level + 1}`;
      let randomID = Math.floor(Math.random() * 9);
      this.gameChoices.push(randomID);
      console.log(this.gameChoices);
      let randomTile = document.getElementById(`tile${randomID}`);
      let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      randomTile.textContent = randomEmoji;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      randomTile.textContent = "";
    }
  }

  handleUserClicks() {
    this.userChoices = [];
    this.levelContainer.textContent = "Your turn.";
    const self = this;
    this.gameBoard.addEventListener("click", function handleClick(event) {
      if (event.target.classList.contains("tile")) {
        let clickedTileId = event.target.id;
        self.userChoices.push(Number(clickedTileId.slice(-1)));
        console.log(self.userChoices);

        if (self.userChoices.length === self.gameChoices.length) {
          self.gameBoard.removeEventListener("click", handleClick); // Remove the click event listener
          self.compareArrays();
        }
      }
    });
  }

  handleClick(event) {
    this.userChoices = [];
    let clickedTileId = event.target.id;
    this.userChoices.push(Number(clickedTileId.slice(-1)));
    console.log(this.userChoices);

    if (this.userChoices.length === this.gameChoices.length) {
      this.compareArrays();
    }
  }

  compareArrays() {
    if (
      this.userChoices.length === this.gameChoices.length &&
      this.userChoices.every(
        (value, index) => value === this.gameChoices[index]
      )
    ) {
      console.log("Arrays match!");
      this.userChoices = [];
      this.gameChoices = [];
      this.numLoops++;
      this.level++;
      this.startLevel();
    } else {
      console.log("Arrays do not match.");
      this.userChoices = [];
      this.gameChoices = [];
      this.numLoops = 2;
      this.level = 0;
      this.levelContainer.textContent = "Game over. Start again.";
    }
  }

  async startLevel() {
    this.userChoices = [];
    this.gameChoices = [];
    await this.generateTiles(this.numLoops);
    this.handleUserClicks();
  }

  resetLevel() {
    for (let i = 0; i < 9; i++) {
      let tileToErase = (document.getElementById(`tile${i}`).textContent = "");
    }
    this.levelContainer.textContent = "Click Start to Begin";
  }

  startGame() {
    this.hideMenu();
    setTimeout(() => this.loadLevelContainer(), 200);
    setTimeout(() => this.loadGameBoard(), 200);
    setTimeout(() => this.loadGameTiles(), 200);
    setTimeout(() => this.loadGameBtns(), 200);
  }
}

const memoryGame = new MemoryPal();
