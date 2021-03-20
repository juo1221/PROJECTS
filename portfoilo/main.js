"use strict";

// Make navbar transparent when it is on the top

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu.
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target.dataset;
  const link = target.link;

  if (link == null) {
    return;
  } else {
    // 연타수정 도전해보기 (mission 1)
    navbarMenu.classList.remove("open");
    scrollIntoView(link);
  }
});
// show navbar menu when click toggle button.
const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//Handle click on "contact me" button on home"
const homeContactBtn = document.querySelector(".home__button");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = (homeHeight - window.scrollY) / homeHeight;
});

// Show "arrow up" button when scrolling down

const arrowBtn = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
const handleArrowUp = () => {
  scrollIntoView("#home");
  arrowBtn.removeEventListener("click", handleArrowUp);
  setTimeout(() => arrowBtn.addEventListener("click", handleArrowUp), 1000);
};
arrowBtn.addEventListener("click", handleArrowUp);

// Projects
const workBtncontainer = document.querySelector(".work__categroies");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtncontainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  } else {
    // Remove selectioin from the previous items and select the new one.
    const activate = document.querySelector(".category__btn.selected");
    activate.classList.remove("selected");
    const target =
      e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
    target.classList.add("selected");

    projectContainer.classList.add("anim-out");
    setTimeout(() => {
      projects.
      
    ((project) => {
        const projectDataType = project.dataset.type;
        if (filter === "*" || filter === projectDataType) {
          project.classList.remove("invisible");
        } else {
          project.classList.add("invisible");
        }
        projectContainer.classList.remove("anim-out");
      });
    }, 300);
  }
});

// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다.

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonial",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
console.log(navItems);

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// const callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   rootmargin: "0px",
//   threshold: 0.3,
// };
// const observer = new IntersectionObserver(callback, observerOptions);
// sections.forEach((section) => observer.observe(section));

// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
  root: null,
  rootmargin: "0px",
  threshold: 0.3,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라올때
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
        console.log(selectedNavIndex);
      } else {
        selectedNavIndex = index - 1;
        console.log(selectedNavIndex);
      }
    }
  });
};

const observer = new IntersectionObserver(callback, observerOptions);
sections.forEach((section) => observer.observe(section));
window.addEventListener("wheel", () => {
  // console.log(window.pageYOffset);
  // console.log(window.innerHeight);
  // console.log(document.body.clientHeight);
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(
      window.pageYOffset + window.innerHeight >= document.body.clientHeight
    )
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
