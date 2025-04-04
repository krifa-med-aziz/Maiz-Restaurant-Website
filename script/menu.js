"use strict";
///////////// Revealing section on scroll
const allSection = document.querySelectorAll(".section");
const sectionOnScroll = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(sectionOnScroll, {
  root: null,
  threshold: 0.3,
});
allSection.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});
///////////////
const scrollUp = document.querySelector(".ScrollUp");
// const nav = document.querySelector(".nav");
const nav = document.querySelector(".nav");
const stikyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    scrollUp.classList.add("show");
    scrollUp.classList.remove("hide");
  } else {
    scrollUp.classList.add("hide");
    scrollUp.classList.remove("show");
  }
};
const navObserver = new IntersectionObserver(stikyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${nav.getBoundingClientRect().height}px`,
});
scrollUp.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".nav").scrollIntoView({ behavior: "smooth" });
});
navObserver.observe(nav);
///////////////// Overlay
const overlay = document.querySelector(".overlay");
const btnBook = document.querySelector(".btn__Book");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const openModal = (modal) => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};
const closeModal = (modal) => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};
btnCloseModal.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(modal);
});

btnBook.addEventListener("click", function (e) {
  e.preventDefault();
  openModal(modal);
});
overlay.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(modal);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden"))
    closeModal(modal);
});
////////////////
const state = {
  menu: [
    {
      src: "images/Menu/Bukhari.png",
      name: "Bukhari",
      categorie: "feast",
    },
    {
      src: "images/Menu/SaudiMakboos.png",
      name: "Saudi Makboos",
      categorie: "feast",
    },
    {
      src: "images/Menu/Zurbiam.png",
      name: "Zurbiam",
      categorie: "feast",
    },
    {
      src: "images/Menu/Kabsa.png",
      name: "Kabsa",
      categorie: "feast",
    },
    {
      src: "images/Menu/Madfoon.png",
      name: "Madfoon",
      categorie: "feast",
    },
    {
      src: "images/Menu/MathLootha.png",
      name: "Math Lootha",
      categorie: "feast",
    },
    {
      src: "images/Menu/Margoug.png",
      name: "Margoug",
      categorie: "feast",
    },
    {
      src: "images/Menu/Sayadya.png",
      name: "Sayadya",
      categorie: "feast",
    },
    {
      src: "images/Menu/Saleeg.png",
      name: "Saleeg",
      categorie: "feast",
    },
    {
      src: "images/Menu/ghahwa.png",
      name: "ghahwa",
      categorie: "coffee",
    },
    {
      src: "images/Menu/DallahCoffee.jpg",
      name: "Dallah Coffee",
      categorie: "coffee",
    },
    {
      src: "images/Menu/Sobya.jpg",
      name: "Sobya",
      categorie: "cocktails",
    },
    {
      src: "images/Menu/Laban.jpg",
      name: "Laban",
      categorie: "cocktails",
    },
    {
      src: "images/Menu/Maamoul.jpg",
      name: "Maamoul",
      categorie: "dessert",
    },
  ],
};

const menuContainer = document.querySelector(".menu");
const links = document.querySelector(".links");
const linksBtns = document.querySelectorAll(".btn-link");

const renderSpinner = function () {
  const markup = ` <div class="spinner">
                      <svg>
                        <use href="./images/icons.svg#icon-loader"></use>
                      </svg>
                    </div>`;
  clearHtml(menuContainer);
  menuContainer.innerHTML = markup;
};

const clearHtml = (element) => {
  return (element.innerHTML = "");
};
const loadMenu = function (menu, categorie) {
  if (!categorie) {
    return menu
      .map((m) => {
        return `<div class="food-box">
                <div class="image-container">
                  <img src=${m.src} alt=${m.name} data-categorie=${m.categorie}/>
                </div>
                <div class="food-name">
                  <p>${m.name}</p>
                </div>
              </div>`;
      })
      .join("");
  } else {
    return menu
      .filter((m) => {
        return m.categorie === categorie.toLowerCase();
      })
      .map((m) => {
        return `<div class="food-box">
                  <div class="image-container">
                  <img src=${m.src} alt=${m.name} data-categorie=${m.categorie}/>
                </div>
                <div class="food-name">
                  <p>${m.name}</p>
                </div>
              </div>`;
      })
      .join("");
  }
};
const renderMenu = (element, markup) => {
  clearHtml(menuContainer);
  element.innerHTML = markup;
};
const buttonHandler = function (button, filter) {
  button.classList.add("active");
  const markup = loadMenu(state.menu, filter === "All" ? "" : filter);
  renderSpinner();
  setTimeout(() => {
    renderMenu(menuContainer, markup);
  }, 200);
};

links.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".btn-link");
  linksBtns.forEach((b) => b.classList.remove("active"));
  clicked.classList.add("active");
  buttonHandler(clicked, clicked.textContent);
});
