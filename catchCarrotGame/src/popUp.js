"use strict";

export default class PopUp {
  constructor() {
    this.popUp__container = document.querySelector("#popUp__container");
    this.popUp = document.querySelector(".popUp");
  }

  setOnclick(onClick) {
    this.onClick = onClick;
  }

  creatPopUpMsg(text) {
    this.popUp.innerHTML = `
  
    <button class="redo">
    <i class="fas fa-redo-alt"></i>
    </button>
    ${text}
  
    `;
    this.popUp__container.appendChild(this.popUp);
    this.popUp.classList.remove("hidePopUp");
    this.redoBtn = document.querySelector(".redo");
    this.redoBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  hide() {
    this.popUp.classList.add("hidePopUp");
  }
}
