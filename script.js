const mainContainer = document.querySelector(".main-container");
let menuLogo = document.querySelector(".menu-logo");
let menuTitle = document.querySelector(".menu-title");
let menuStartBtn = document.querySelector(".menu-start-btn");

function hideMenu() {
  const elementsToRemove = [menuLogo, menuTitle, menuStartBtn];
  elementsToRemove.forEach((element) => {
    element.style.transition = "opacity 0.2s";
    element.style.opacity = 0;
    setTimeout(() => mainContainer.removeChild(element), 200);
  });
}

function loadLevelContainer() {
  let levelContainer = document.createElement("div");
  levelContainer.classList.add("level-container");
  mainContainer.appendChild(levelContainer).offsetHeight;
  levelContainer.classList.add("fade-in");
  levelContainer.textContent = "Level 0";
}

function startGame() {
  hideMenu();
  setTimeout(loadLevelContainer, 200);
}

menuStartBtn.addEventListener("click", startGame);
