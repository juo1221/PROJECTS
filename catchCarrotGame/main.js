"use strict";

const playBtn = document.querySelector(".play");
const stpBtn = document.querySelector(".stop");
const redoBtn = document.querySelector(".redo");
const body = document.querySelector("body");
const play__time = document.querySelector(".play__time");
const result = document.querySelector(".result");
const clickDown = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);
const clickUp = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
);
const bg = new Audio("sound/bg.mp3");

const winBgm = new Audio("sound/game_win.mp3");

const onPlayBtn = () => {
  playBtn.classList.add("invisible");
  stpBtn.classList.remove("invisible");
};
const onStopBtn = () => {
  stpBtn.classList.add("invisible");
  playBtn.classList.remove("invisible");
};

let time = 10;
let timerId = null;

function creatResult() {
  result.innerHTML = `
    <button class="redo" data-key="key">
    <i class="fas fa-redo-alt" data-key="key"></i>
    </button>
    YOU WON
    `;
}

function countDown() {
  time--;
  play__time.innerHTML = `
  <span class="time__count">00:0${time}</span>
  `;
  if (time <= 0) {
    clearInterval(timerId);
    bg.pause();
    winBgm.play();
    creatResult();
    time = 10;
    play__time.innerHTML = `
    <span class="time__count">00:${time}</span>
    `;
  }
}

function gameStart(playOrNo) {
  if (!playOrNo) {
    bg.volume = 0.1;
    bg.play();
    timerId = setInterval(countDown, 1000);
  } else {
    bg.pause();
    // window.stop();
  }
}

function startOrStop() {
  playBtn.addEventListener("click", onPlayBtn);
  stpBtn.addEventListener("click", onStopBtn);
  let isPlay = playBtn.classList.contains("invisible");

  return isPlay;
}

function init() {
  body.addEventListener("mousedown", (e) => {
    const id = e.target.dataset.id || e.target.dataset.key;
    if (id) {
      clickDown.volume = 0.2;
      clickDown.play();
      const playOrNo = startOrStop();
      gameStart(playOrNo);
    }
  });
}

init();
