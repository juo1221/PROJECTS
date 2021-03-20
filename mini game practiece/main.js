"use strict";

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
  <li class="item" data-type=${item.type} data-color=${item.color}>
  <img src="${item.img}" alt="${item.type}" class="item__thumnail" />
  <span class="item__description">${item.gender}, ${item.color}</span>
  </li>`;
}

function onButtonItem(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  } else {
    updateItems(key, value);

    switch (value) {
      case "blue":
        const bacColorblue = document.querySelector(".items");
        bacColorblue.classList.remove(
          "colorChange",
          "coloryellow",
          "colorpink"
        );

        bacColorblue.classList.add("colorblue");
        return;
      case "yellow":
        const bacColoryellow = document.querySelector(".items");
        bacColoryellow.classList.remove(
          "colorChange",
          "colorblue",
          "colorpink"
        );
        bacColoryellow.classList.add("coloryellow");
        return;
      case "pink":
        const bacColorpink = document.querySelector(".items");
        bacColorpink.classList.remove(
          "colorChange",
          "colorblue",
          "coloryellow"
        );
        bacColorpink.classList.add("colorpink");
        return;
    }
  }
}
function updateItems(key, value) {
  const allitems = document.querySelectorAll(".item");
  allitems.forEach((item) => {
    console.log(`key: ${key}`);
    console.log(`item.dataset: ${item.dataset}`);
    console.log(`item.dataset[key]: ${item.dataset[key]}`);
    console.log(`value: ${value}`);

    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function onBgColorChange(items) {
  const bgColor = document.querySelector(".items");
  bgColor.classList.remove("colorpink", "colorblue", "coloryellow");
  bgColor.classList.add("colorChange");
  displayItems(items);
}

function setEventListener(items) {
  const logo = document.querySelector(".home__logo");
  const button = document.querySelector("#buttons");
  logo.addEventListener("click", () => onBgColorChange(items));
  button.addEventListener("click", (event) => onButtonItem(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
