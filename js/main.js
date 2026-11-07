const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll('.nav-list a[href^="#"]')];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.querySelector(".filter-status");
const dialog = document.querySelector("#case-study-modal");
const modalTrigger = document.querySelector(".modal-trigger");
const modalClose = document.querySelector(".modal-close");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const contactFields = [...document.querySelectorAll(".form-field input, .form-field textarea")];
const contactActions = document.querySelector(".contact-form-actions");
const mailClientLink = document.querySelector(".mail-client-link");
const copyEmailButton = document.querySelector(".copy-email");
const currentYear = document.querySelector("#current-year");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 767px)");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const emailAddress = "gillandsabile09@gmail.com";
const themeStorageKey = "gilland-portfolio-theme";
const revealedElements = [...document.querySelectorAll("main section"), ...projectCards];
const scrollSpySections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section instanceof HTMLElement);

root.dataset.js = "true";

function getStoredTheme() {
  try {
    const theme = window.localStorage.getItem(themeStorageKey);
    return theme === "light" || theme === "dark" ? theme : null;
  } catch (error) {
    console.warn("The saved theme preference could not be read.", error);
    return null;
  }
}

function updateThemeControls(theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeLabel.textContent = `${nextTheme[0].toUpperCase()}${nextTheme.slice(1)} mode`;
  themeIcon.textContent = nextTheme === "light" ? "☼" : "☾";
}

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;
  updateThemeControls(theme);

  if (!persist) {
    return;
  }

  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    console.warn("The theme changed, but the preference could not be saved.", error);
  }
}

const initialTheme = getStoredTheme() || (prefersDark.matches ? "dark" : "light");
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  const changeTheme = () => applyTheme(nextTheme, true);

  if (document.startViewTransition && !reduceMotion.matches) {
    document.startViewTransition(changeTheme);
  } else {
    changeTheme();
  }
});

prefersDark.addEventListener("change", (event) => {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navMenu.classList.toggle("is-open", isOpen);
  body.classList.toggle("menu-open", isOpen && mobileViewport.matches);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileViewport.addEventListener("change", (event) => {
  if (!event.matches && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
  }
});

projectCards.forEach((card, index) => {
  card.style.setProperty("view-transition-name", `project-card-${index}`);
  card.style.setProperty("--card-index", index);
  card.style.setProperty("--stagger-delay", "calc(var(--card-index) * 80ms)");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    const updateCards = () => {
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(/\s+/);
        const matches = filter === "all" || categories.includes(filter);
        card.hidden = !matches;
        visibleCount += Number(matches);
      });

      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown.`;
    };

    if (document.startViewTransition && !reduceMotion.matches) {
      document.startViewTransition(() => updateCards());
    } else {
      updateCards();
    }
  });
});

if (reduceMotion.matches) {
  revealedElements.forEach((element) => element.classList.add("reveal", "reveal--visible"));
} else if ("IntersectionObserver" in window) {
  revealedElements.forEach((element) => element.classList.add("reveal"));
  root.dataset.revealEnabled = "true";

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealedElements.forEach((element) => revealObserver.observe(element));
} else {
  revealedElements.forEach((element) => element.classList.add("reveal", "reveal--visible"));
}

function setActiveNavigation(sectionId) {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
    link.classList.toggle("is-active", isCurrent);
  });
}

function getSectionAtReadingLine() {
  const readingLine = window.innerHeight * 0.42;
  return scrollSpySections.find((section) => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= readingLine && bounds.bottom > readingLine;
  });
}

if ("IntersectionObserver" in window) {
  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      const currentSection = getSectionAtReadingLine();
      if (currentSection) {
        setActiveNavigation(currentSection.id);
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.boundingClientRect.top <= window.innerHeight * 0.42) {
          setActiveNavigation(entry.target.id);
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  scrollSpySections.forEach((section) => scrollSpyObserver.observe(section));
} else {
  let scrollSpyFrame = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollSpyFrame) {
        scrollSpyFrame = window.requestAnimationFrame(() => {
          const currentSection = getSectionAtReadingLine();
          if (currentSection) {
            setActiveNavigation(currentSection.id);
          }
          scrollSpyFrame = 0;
        });
      }
    },
    { passive: true },
  );
}

if (!reduceMotion.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const pointerFrames = new WeakMap();

  projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      let pointer = pointerFrames.get(card);
      if (!pointer) {
        pointer = { frame: 0, x: 0, y: 0 };
        pointerFrames.set(card, pointer);
      }

      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!pointer.frame) {
        pointer.frame = window.requestAnimationFrame(() => {
          const bounds = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${pointer.x - bounds.left}px`);
          card.style.setProperty("--mouse-y", `${pointer.y - bounds.top}px`);
          pointer.frame = 0;
        });
      }
    });
  });
}

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

dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
  }
});

function getFieldError(field) {
  if (field.validity.valueMissing) {
    return "This field is required.";
  }

  if (field.validity.typeMismatch && field.type === "email") {
    return "Enter a valid email address.";
  }

  return "";
}

function showFieldError(field) {
  const errorMessage = document.querySelector(`#${field.id}-error`);
  const message = getFieldError(field);
  field.setAttribute("aria-invalid", String(Boolean(message)));
  errorMessage.textContent = message;
  return !message;
}

contactFields.forEach((field) => {
  field.addEventListener("input", () => {
    if (field.hasAttribute("aria-invalid")) {
      showFieldError(field);
    }
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalidFields = contactFields.filter((field) => !showFieldError(field));

  if (invalidFields.length) {
    formStatus.textContent = "Please correct the highlighted fields before preparing your email.";
    invalidFields[0].focus();
    return;
  }

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
  const message = encodeURIComponent(
    `${formData.get("message")}\n\nFrom: ${formData.get("name")}\nEmail: ${formData.get("email")}`,
  );
  mailClientLink.href = `mailto:${emailAddress}?subject=${subject}&body=${message}`;
  contactActions.hidden = false;
  formStatus.textContent = "Your message is ready. Open it in your email app or copy the recipient address.";
});

function copyTextFallback(text) {
  const temporaryField = document.createElement("textarea");
  temporaryField.value = text;
  temporaryField.setAttribute("readonly", "");
  temporaryField.style.position = "fixed";
  temporaryField.style.opacity = "0";
  document.body.append(temporaryField);
  temporaryField.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    console.warn("The browser's fallback copy command failed.", error);
  }
  temporaryField.remove();
  return copied;
}

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    formStatus.textContent = `Copied ${emailAddress} to your clipboard.`;
  } catch (error) {
    console.warn("Clipboard access was unavailable; trying the compatibility copy method.", error);
    if (copyTextFallback(emailAddress)) {
      formStatus.textContent = `Copied ${emailAddress} to your clipboard.`;
    } else {
      formStatus.textContent = `Copy was unavailable. You can select this address: ${emailAddress}`;
    }
  }
});

currentYear.textContent = String(new Date().getFullYear());
