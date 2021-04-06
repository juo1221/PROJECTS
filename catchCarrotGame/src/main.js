"use strict";

import * as sound from "./sound.js";
import PopUp from "./PopUp.js";

const carrotCount = 5;
const bugCount = 4;
const time = 10;

let timerId = null;
let gamePlay = false;
let score = carrotCount;

const IMG__WIDTH = 80;
const IMG__HEIGHT = 80;

const play__time = document.querySelector(".game__timer");
const playBtn = document.querySelector(".playBtn");
const icon = playBtn.querySelector(".fas");
const item__container = document.querySelector("#item__container");
const imgContainerW = item__container.getBoundingClientRect().width;
const imgContainerH = item__container.getBoundingClientRect().height;

const carrot__count = document.querySelector(".carrot__count");
const popUp = new PopUp();

popUp.setOnclick(() => {
  gameStart();
});

playBtn.addEventListener("click", () => {
  if (gamePlay) {
    gameStop("cancel");
  } else {
    gameStart();
  }
});

function gameStart() {
  gamePlay = true;
  init();
  sound.Playbg();
  countDown();
  showStopButton();
}

function gameStop(result) {
  gamePlay = false;
  hidePlayButton();
  gameResult(result);
}

item__container.addEventListener("click", itemClick);

function itemClick(e) {
  if (!gamePlay) {
    return;
  }
  if (e.target.className === "carrotImg") {
    e.target.remove();
    sound.playcarrotPull();
    showCarrotScore(score--);
  } else if (e.target.className === "bugImg") {
    gameStop("lose");
  }
}

function init() {
  score = carrotCount;
  item__container.innerHTML = "";
  showCarrotScore(score);
  itemsReady("carrotImg", "img/carrot.png", carrotCount);
  itemsReady("bugImg", "img/bug.png", bugCount);
}

//  게임 결과

function gameResult(result) {
  if (result === "win") {
    sound.playwinBgm();
    popUp.creatPopUpMsg("YOU WIN 👏");
  } else if (result === "lose") {
    sound.playlostBgm();
    popUp.creatPopUpMsg("YOU LOST 🤣");
  } else {
    sound.playalert();
    popUp.creatPopUpMsg("REPLAY ?");
  }
  sound.stopbg();
  clearInterval(timerId);
}

// 데이터 준비(당근,벌레)

function itemsReady(itemClass, imgPath, count) {
  for (let i = 0; i < count; i++) {
    const coorX = Math.random() * (imgContainerW - IMG__WIDTH);
    const coorY = Math.random() * (imgContainerH - IMG__HEIGHT);
    const item = document.createElement("img");
    item.setAttribute("class", itemClass);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.transform = `translate(${coorX}px,${coorY}px)`;
    item__container.appendChild(item);
  }
}

// 카운트다운 시작

function countDown() {
  let currentTime = time;
  updateTimer(currentTime);
  timerId = setInterval(() => {
    if (currentTime <= 0) {
      gameStop("lose");
      return;
    }
    updateTimer(--currentTime);
  }, 1000);
}

// window.alert("하단 바 생성시 화면을 위로 드래그");

function updateTimer(time) {
  const minute = Math.floor(time / 60);
  const sec = time % 60;
  play__time.innerHTML = `
  <span class="time__count">${minute}:${sec}</span>
  `;
}

function showStopButton() {
  icon.classList.replace("fa-play", "fa-stop");
  playBtn.style.visibility = "visible";
}
function hidePlayButton() {
  playBtn.style.visibility = "hidden";
}

function showCarrotScore() {
  carrot__count.textContent = score;

  if (score === 0) {
    gameStop("win");
    return;
  }
}
