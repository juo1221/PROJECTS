"use strict";
const slide__list = document.querySelector(".slide__list");
const slide__contents = document.querySelectorAll(".slide__content");
const slide__width = 400;
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const toggles = document.querySelector(".toggles");
const toggleArr = document.querySelectorAll(".toggle");

// 노드 카피
let firstChild = slide__list.firstElementChild;
let lastChild = slide__list.lastElementChild;
let cloneFisrt = firstChild.cloneNode(true);
let cloneLast = lastChild.cloneNode(true);
slide__list.appendChild(cloneFisrt);
slide__list.insertBefore(cloneLast, firstChild);

const slideCount = slide__list.childElementCount;
slide__list.style.width = `${slideCount * slide__width}px`;
let curIndex = 1;

// 클릭 시 처리
nextBtn.addEventListener("click", onNextBtn);
prevBtn.addEventListener("click", onPrevBtn);
toggles.addEventListener("click", onToggleBtn);

function onNextBtn() {
  if (curIndex <= slideCount - 1) {
    slide__list.style.transition = "300ms";
    slide__list.style.transform = `translateX(${
      -slide__width * (curIndex + 1)
    }px)`;
    curIndex++;
  }
  if (curIndex === slideCount - 1) {
    setTimeout(() => {
      slide__list.style.transition = "0ms";
      slide__list.style.transform = `translateX(-${slide__width}px)`;
    }, 300);
    curIndex = 1;
  }
}

function onPrevBtn() {
  console.log(curIndex);
  if (curIndex >= 0) {
    slide__list.style.transition = "300ms";
    slide__list.style.transform = `translateX(${
      -slide__width * (curIndex - 1)
    }px)`;
    curIndex--;
  }
  if (curIndex === 0) {
    setTimeout(() => {
      slide__list.style.transition = "0ms";
      slide__list.style.transform = `translateX(-${slide__width * 5}px)`;
    }, 300);
    curIndex = 5;
  }
}

function onToggleBtn(e) {
  toggleArr.forEach((toggle) => {
    toggle.classList.remove("selected");
  });
  const target = e.target;
  if (target.matches(".toggle")) {
    target.classList.add("selected");
  }
}
