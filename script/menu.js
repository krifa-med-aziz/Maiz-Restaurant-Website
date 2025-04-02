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
