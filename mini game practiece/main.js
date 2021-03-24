"use strict";
const container = document.querySelector(".items");

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
  <li class="item" data-type=${item.type} data-color=${item.color}>
  <img src="${item.img}" alt="${item.type}" class="item__thumnail" />
  <span class="item__description">${item.gender}, ${item.color}</span>
  </li>`;
}

function onButtonItem(e) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  } else {
    updateItems(key, value);
    changeColor(e);
  }
}
function updateItems(key, value) {
  const allitems = document.querySelectorAll(".item");
  allitems.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function changeColor(e) {
  console.log(e.target);
  const color = e.target.dataset.color;
  container.style.backgroundColor = color;
}

function onBgColorChange(items) {
  container.style.backgroundColor = "transparent";

  displayItems(items);
}

function setEventListener(items) {
  const logo = document.querySelector(".home__logo");
  const button = document.querySelector("#buttons");
  logo.addEventListener("click", () => onBgColorChange(items));
  button.addEventListener("click", (e) => onButtonItem(e));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
