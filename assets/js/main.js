const menuButton = document.querySelector("[data-menu-button]");
const siteNavigation = document.querySelector("[data-site-navigation]");
const downloadDropdown = document.querySelector("[data-download-dropdown]");
const downloadButton = document.querySelector("[data-download-button]");
const downloadMenu = document.querySelector("[data-download-menu]");

const closeDownloadMenu = (returnFocus = false) => {
  if (!downloadButton || !downloadMenu) return;

  downloadButton.setAttribute("aria-expanded", "false");
  downloadMenu.hidden = true;

  if (returnFocus) {
    downloadButton.focus();
  }
};

const openDownloadMenu = (focusFirstItem = false) => {
  if (!downloadButton || !downloadMenu) return;

  downloadButton.setAttribute("aria-expanded", "true");
  downloadMenu.hidden = false;

  if (focusFirstItem) {
    downloadMenu.querySelector("a")?.focus();
  }
};

if (downloadDropdown && downloadButton && downloadMenu) {
  downloadButton.addEventListener("click", () => {
    const isOpen = downloadButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeDownloadMenu();
    } else {
      openDownloadMenu();
    }
  });

  downloadButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDownloadMenu(true);
    }
  });

  downloadMenu.addEventListener("keydown", (event) => {
    const links = [...downloadMenu.querySelectorAll("a")];
    const currentIndex = links.indexOf(document.activeElement);
    let nextIndex = null;

    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % links.length;
    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + links.length) % links.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = links.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      links[nextIndex].focus();
    }
  });

  downloadDropdown.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!downloadDropdown.contains(document.activeElement)) {
        closeDownloadMenu();
      }
    }, 0);
  });

  document.addEventListener("click", (event) => {
    if (!downloadDropdown.contains(event.target)) {
      closeDownloadMenu();
    }
  });
}

if (menuButton && siteNavigation) {
  const closeNavigation = (returnFocus = false) => {
    closeDownloadMenu();
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Mở menu");
    siteNavigation.dataset.open = "false";
    document.body.classList.remove("nav-open");

    if (returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    closeDownloadMenu();
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
    siteNavigation.dataset.open = String(!isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeDownloadMenu();
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const downloadIsOpen = downloadButton?.getAttribute("aria-expanded") === "true";
      const navigationIsOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (downloadIsOpen) {
        closeDownloadMenu(true);
      } else if (navigationIsOpen) {
        closeNavigation(true);
      }
    }
  });

  document.addEventListener("click", (event) => {
    const navigationIsOpen = menuButton.getAttribute("aria-expanded") === "true";
    const clickedOutsideNavigation = !siteNavigation.contains(event.target)
      && !menuButton.contains(event.target);

    if (navigationIsOpen && clickedOutsideNavigation) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) {
      closeNavigation();
    }
  });
}
