"use strict";

const root = document.documentElement;
const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const projectCount = document.querySelector(".project-count");
const emptyState = document.querySelector(".empty-state");
const projectDialog = document.querySelector(".project-dialog");
const closeDialog = document.querySelector(".dialog-close");

document.querySelector("#current-year").textContent = new Date().getFullYear();

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  navLinks.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("pointerdown", (event) => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  if (isOpen && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 620) setMenuOpen(false);
});

themeToggle.addEventListener("click", () => {
  const useDarkTheme = root.dataset.theme !== "dark";
  if (useDarkTheme) {
    root.dataset.theme = "dark";
  } else {
    delete root.dataset.theme;
  }
  themeToggle.setAttribute("aria-label", useDarkTheme ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.textContent = useDarkTheme ? "☼" : "☾";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.categories.split(" ").includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    projectCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    emptyState.hidden = visibleCount > 0;
  });
});

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#dialog-title").textContent = button.dataset.title;
    document.querySelector("#dialog-type").textContent = button.dataset.type;
    document.querySelector("#dialog-description").textContent = button.dataset.description;
    const stack = document.querySelector("#dialog-stack");
    stack.replaceChildren(...button.dataset.stack.split(", ").map((label) => {
      const tag = document.createElement("span");
      tag.textContent = label;
      return tag;
    }));
    projectDialog.showModal();
  });
});

closeDialog.addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
