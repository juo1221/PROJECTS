"use strict";

const open__modalBtn = document.querySelector("#open__modalBtn");
const setWindow = document.querySelector(".setWindow");
const window__modal = document.querySelector(".window__modal");
open__modalBtn.addEventListener("click", showModalWindow);
setWindow.addEventListener("click", exitModal);
function showModalWindow() {
  open__modalBtn.classList.add("invisible");
  setWindow.classList.remove("invisible");
}

function exitModal(e) {
  const target = e.target;
  if (target.matches(".setWindow") || target.matches(".window__cancelBtn")) {
    open__modalBtn.classList.remove("invisible");
    setWindow.classList.add("invisible");
  } else if (target.matches(".window__okBtn")) {
    alert("반갑습니다!");
    open__modalBtn.classList.remove("invisible");
    setWindow.classList.add("invisible");
  }
}
