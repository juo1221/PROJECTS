"use strict";
import * as sound from "./sound.js";
import { ItemField, itemImg } from "./itemField.js";

export const gameResult = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withCarrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }
  withBugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }
  withProgressTime(time) {
    this.time = time;
    return this;
  }
  builder() {
    return new Game(this.time, this.carrotCount, this.bugCount);
  }
}
class Game {
  constructor(time, carrotCount, bugCount) {
    this.time = time;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.timerId = null;
    this.gamePlay = false;
    this.score = 10;

    this.itemField = new ItemField(this.carrotCount, this.bugCount);
    this.itemField.onFieldClick(this.itemClick);

    this.play__time = document.querySelector(".game__timer");
    this.playBtn = document.querySelector(".playBtn");
    this.playBtn.addEventListener("click", () => {
      if (this.gamePlay) {
        this.stop(gameResult.cancel);
      } else {
        this.start();
      }
    });

    this.icon = this.playBtn.querySelector(".fas");
    this.carrotScore = document.querySelector(".carrotScore");
  }

  setGameResult(onResult) {
    this.onResult = onResult;
  }

  itemClick = (item) => {
    if (!this.gamePlay) {
      return;
    }
    if (item === itemImg.carrotImg) {
      this.showCarrotScore(this.score--);
    } else if (item === itemImg.bugImg) {
      this.stop(gameResult.lose);
    }
  };

  start = () => {
    this.gamePlay = true;
    this.init();
    sound.Playbg();
    this.countDown();
    this.showStopButton();
  };

  stop(result) {
    this.gamePlay = false;
    this.hidePlayButton();
    clearInterval(this.timerId);
    this.onResult && this.onResult(result);
  }

  init() {
    this.itemField.init();
    this.score = this.carrotCount;
    this.showCarrotScore(this.score);
  }

  countDown() {
    let currentTime = this.time;
    this.updateTimer(currentTime);
    this.timerId = setInterval(() => {
      if (currentTime <= 0) {
        this.stop(gameResult.lose);
        return;
      }
      this.updateTimer(--currentTime);
    }, 1000);
  }

  showCarrotScore() {
    this.carrotScore.textContent = this.score;

    if (this.score === 0) {
      this.stop(gameResult.win);
      return;
    }
  }

  hidePlayButton() {
    this.playBtn.style.visibility = "hidden";
  }

  updateTimer(time) {
    const minute = Math.floor(time / 60);
    const sec = time % 60;
    this.play__time.innerHTML = `
    <span class="time__count">${minute}:${sec}</span>
    `;
  }

  showStopButton() {
    this.icon.classList.replace("fa-play", "fa-stop");
    this.playBtn.style.visibility = "visible";
  }
}
