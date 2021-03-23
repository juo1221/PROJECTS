"use strict";

const playBtn = document.querySelector(".play");
const stpBtn = document.querySelector(".stop");
const body = document.querySelector("body");
const play__time = document.querySelector(".play__time");
const result__container = document.querySelector("#result__container");
const img__container = document.querySelector("#img__container");
const result = document.createElement("div");
const imgContainerW = img__container.getBoundingClientRect().width;
const imgContainerH = img__container.getBoundingClientRect().height;
const count = document.querySelector(".count");
const carrot__count = document.querySelector(".carrot__count");
result.setAttribute("class", "result");

const clickDown = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);
const clickUp = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
);
const bg = new Audio("sound/bg.mp3");

const winBgm = new Audio("sound/game_win.mp3");

const lostBgm = new Audio("sound/lost.mp3");

const alert = new Audio("sound/alert.wav");

const carrotPull = new Audio("sound/carrot_pull.mp3");

function loadBugimg() {
  return fetch("JSON/bugs.json")
    .then((response) => response.json())
    .then((json) => json.imgs);
}
const onPlayBtn = () => {
  playBtn.classList.add("invisible");
  stpBtn.classList.remove("invisible");
};
const onRePlay = () => {
  // window.location.reload(); // 새로고침
  playBtn.classList.add("invisible");
  stpBtn.classList.remove("invisible");
  result.remove();
  gameStart(false);
};

const onStopBtn = () => {
  stpBtn.classList.add("invisible");
  alert.play();
  result.innerHTML = `
    
        <button class="redo" data-key="key">
        <i class="fas fa-redo-alt" data-key="key"></i>
        </button>
        replay?
    
  `;
  result__container.appendChild(result);
  result__container.style.zIndex = "1";
  let redoBtn = document.querySelector(".redo");
  redoBtn.addEventListener("click", onRePlay);
};

let time = 10;
let timerId = null;

function creatLostResult() {
  result.innerHTML = `
    
        <button class="redo" data-key="key">
        <i class="fas fa-redo-alt" data-key="key"></i>
        </button>
        YOU LOST
    
  `;
  result__container.appendChild(result);
  result__container.style.zIndex = "1";
  stpBtn.classList.add("invisible");
  let redoBtn = document.querySelector(".redo");
  redoBtn.addEventListener("click", onRePlay);
}
function creatWinResult() {
  result.innerHTML = `
    
        <button class="redo" data-key="key">
        <i class="fas fa-redo-alt" data-key="key"></i>
        </button>
        YOU WIN!!!
    
  `;
  result__container.appendChild(result);
  result__container.style.zIndex = "1";
  stpBtn.classList.add("invisible");
  let redoBtn = document.querySelector(".redo");
  redoBtn.addEventListener("click", onRePlay);
}

function countDown() {
  time--;
  play__time.innerHTML = `
  <span class="time__count">00:0${time}</span>
  `;
  if (time <= 0) {
    clearInterval(timerId);
    bg.pause();
    bg.currentTime = 0;
    lostBgm.play();
    time = 10;
    play__time.innerHTML = `
    <span class="time__count">00:${time}</span>
    `;
    creatLostResult();
    removeCarrotClick();
  }
}

function startOrStop() {
  playBtn.addEventListener("click", onPlayBtn);
  stpBtn.addEventListener("click", onStopBtn);

  let isPlay = playBtn.classList.contains("invisible");

  return isPlay;
}

function creatString(img) {
  return `
  <img src="${img.imgC}" alt="당근당근" class="carrotImgs"/>
  <img src="${img.imgB}" alt="벌레벌레" class="bugImgs"/>
  `;
}

function setBugcoor(bug, imgwidth, imgheight) {
  const coorX = Math.random() * (imgContainerW - imgwidth);
  const coorY = Math.random() * (imgContainerH - imgheight);
  bug.setAttribute("data-bug", "1");
  bug.style.transform = `translate(${coorX}px,${coorY}px)`;
}
function setCarrotCoor(carrot, imgwidth, imgheight) {
  const coorX = Math.random() * (imgContainerW - imgwidth);
  const coorY = Math.random() * (imgContainerH - imgheight);
  carrot.setAttribute("data-carrot", "2");
  carrot.style.transform = `translate(${coorX}px,${coorY}px)`;
}

function displayImgs(imgs) {
  const html = imgs.map((img) => creatString(img)).join("");
  img__container.innerHTML = html;
  const bug = document.querySelector(".bugImgs");
  const bugwidth = bug.getBoundingClientRect().width;
  const bugheight = bug.getBoundingClientRect().height;
  const carrot = document.querySelector(".carrotImgs");
  const carrotwidth = carrot.getBoundingClientRect().width;
  const carrotheight = carrot.getBoundingClientRect().height;

  const bugsArray = Array.from(document.querySelectorAll(".bugImgs"));
  const carrotArray = Array.from(document.querySelectorAll(".carrotImgs"));

  bugsArray.forEach((bug) => setBugcoor(bug, bugwidth, bugheight));
  carrotArray.forEach((carrot) =>
    setCarrotCoor(carrot, carrotwidth, carrotheight)
  );

  creatCarrotCount();
}
function itemsReady() {
  loadBugimg().then((imgs) => {
    displayImgs(imgs);
  });
}

function gameStart(playOrNo) {
  if (!playOrNo) {
    bg.volume = 0.1;
    bg.play();
    itemsReady();
    timerId = setInterval(countDown, 1000);
  } else {
    bg.pause();
    bg.currentTime = 0;
    clearInterval(timerId);
    time = 10;
    play__time.innerHTML = `
    <span class="time__count">00:${time}</span>
    
`;
    removeCarrotClick();
  }
}

function onSetting() {
  clickDown.volume = 0.2;
  clickDown.play();
  const playOrNo = startOrStop();
  gameStart(playOrNo);
}

function gameDown() {
  bg.pause();
  bg.currentTime = 0;

  clearInterval(timerId);
  lostBgm.play();
  time = 10;
  play__time.innerHTML = `
  <span class="time__count">00:${time}</span>`;
  creatLostResult();
  removeCarrotClick();
}

function gameWin() {
  bg.pause();
  bg.currentTime = 0;

  clearInterval(timerId);
  winBgm.play();
  time = 10;
  play__time.innerHTML = `
  <span class="time__count">00:${time}</span>`;
  creatWinResult();
}
function removeCarrotClick() {
  const carrotArray = Array.from(document.querySelectorAll(".carrotImgs"));
  carrotArray.forEach((carrot) => {
    delete carrot.dataset.carrot;
  });
}

function creatCarrotCount() {
  const carrotArray = Array.from(document.querySelectorAll(".carrotImgs"));
  let carrotNum = carrotArray.length;
  carrot__count.innerHTML = `
  <span class="carrot__count">${carrotNum}</span>
  `;
  count.appendChild(carrot__count);

  if (carrotNum === 0) {
    gameWin();
  }
}

function carrotRemoveAndUpdate(e) {
  carrotPull.currentTime = 0; // 빠르게 클릭 시 소리 지연 방지
  carrotPull.play();
  const removeTarget = e.target;
  removeTarget.remove();
  creatCarrotCount();
}

function init() {
  window.alert("하단 바 생성시 화면을 위로 드래그");
  body.addEventListener("mousedown", (e) => {
    const id = e.target.dataset.id || e.target.dataset.key;
    const bug = e.target.dataset.bug;
    const carrot = e.target.dataset.carrot;
    id && onSetting();
    bug && gameDown();
    carrot && carrotRemoveAndUpdate(e);
  });
}

init();
