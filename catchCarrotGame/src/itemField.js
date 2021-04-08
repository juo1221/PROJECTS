"use strict";
import * as sound from "./sound.js";

export const itemImg = Object.freeze({
  carrotImg: "carrotImg",
  bugImg: "bugImg",
});

export class ItemField {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.IMG__WIDTH = 80;
    this.IMG__HEIGHT = 80;

    this.item__container = document.querySelector("#item__container");
    this.imgContainerW = item__container.getBoundingClientRect().width;
    this.imgContainerH = item__container.getBoundingClientRect().height;
    this.item__container.addEventListener("click", this.itemClick);
  }

  init() {
    this.item__container.innerHTML = "";
    this.itemsReady(itemImg.carrotImg, "img/carrot.png", this.carrotCount);
    this.itemsReady(itemImg.bugImg, "img/bug.png", this.bugCount);
  }

  onFieldClick(onClick) {
    this.onclick = onClick;
  }

  itemClick = (e) => {
    if (e.target.className === itemImg.carrotImg) {
      e.target.remove();
      sound.playcarrotPull();
      this.onclick && this.onclick(itemImg.carrotImg);
    } else if (e.target.className === itemImg.bugImg) {
      this.onclick && this.onclick(itemImg.bugImg);
    }
  };

  itemsReady(itemClass, imgPath, count) {
    for (let i = 0; i < count; i++) {
      const coorX = Math.random() * (this.imgContainerW - this.IMG__WIDTH);
      const coorY = Math.random() * (this.imgContainerH - this.IMG__HEIGHT);
      const item = document.createElement("img");
      item.setAttribute("class", itemClass);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      item.style.transform = `translate(${coorX}px,${coorY}px)`;
      this.item__container.appendChild(item);
    }
  }
}
