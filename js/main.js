const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector(".filter-status");
const dialog = document.querySelector("#case-study-modal");
const modalTrigger = document.querySelector(".modal-trigger");
const modalClose = document.querySelector(".modal-close");
const contactForm = document.querySelector(".contact-form");
const currentYear = document.querySelector("#current-year");

root.dataset.js = "true";

themeToggle.addEventListener("click", () => {
  const isLight = root.dataset.theme === "light";
  root.dataset.theme = isLight ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "light" : "dark"} theme`);
  themeLabel.textContent = isLight ? "Light mode" : "Dark mode";
  themeIcon.textContent = isLight ? "☼" : "☾";
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navMenu.classList.toggle("is-open", !isExpanded);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.hidden = !matches;
      visibleCount += Number(matches);
    });

    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown.`;
  });
});

modalTrigger.addEventListener("click", () => {
  dialog.showModal();
});

modalClose.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `${formData.get("message")}\n\nFrom: ${formData.get("name")}\nEmail: ${formData.get("email")}`,
  );
  window.location.href = `mailto:gillandsabile09@gmail.com?subject=${subject}&body=${body}`;
});

currentYear.textContent = String(new Date().getFullYear());
