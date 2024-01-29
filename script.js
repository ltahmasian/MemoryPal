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
    this.resetGame = this.resetGame.bind(this);

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
    this.levelContainer.textContent = `Level ${this.level}`;
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
    this.resetLvlBtn.addEventListener("click", this.reset);
    this.btnContainer.appendChild(this.startLvlBtn);
    this.btnContainer.appendChild(this.resetLvlBtn);
    this.mainContainer.appendChild(this.btnContainer);
  }

  async startLevel() {
    for (let i = 0; i < this.numLoops; i++) {
      this.levelContainer.textContent = `Level ${this.level + 1}`;
      let randomID = Math.floor(Math.random() * 9);
      this.gameChoices.push(randomID);
      //console.log(this.gameChoices);
      let randomTile = document.getElementById(`tile${randomID}`);
      //console.log(randomTile);
      randomTile.textContent = "😊";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      randomTile.textContent = "";
    }
  }

  resetGame() {
    // Implement the logic for resetting the game
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
