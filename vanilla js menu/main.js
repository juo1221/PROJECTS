"use strict";

const menuList = document.querySelector(".menu__list");

let REMOVE = false;

menuList.addEventListener("click", onClick);

function onClick(e) {
  const target = e.target;
  const icon = e.target.children[1];
  const menu__contetns = e.target.children[2];
  const active = REMOVE && creatActiveClass();
  active && removeClass(active);

  if (target.matches(".menu")) {
    REMOVE = true;
    target.classList.add("active");
    icon && icon.classList.toggle("selected");
    menu__contetns && menu__contetns.classList.toggle("visible");
  }
}

function creatActiveClass() {
  const active = document.querySelector(".active");
  return active;
}

function removeClass(active) {
  active.classList.remove("active");
}
