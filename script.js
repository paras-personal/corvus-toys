// CorVus Toys - interactivity layer.
// All content lives in static HTML for SEO; this script only adds
// behavior: nav, filters, gallery, scroll reveals, and the demo form.

const productNames = {
  "addie-girl": "Addie Girl Soft Toy",
  "addie-boy": "Addie Boy Soft Toy",
  "baby-balance-bike": "Baby Balance Bike",
  "remote-control-car": "Remote Control Car",
  "pop-it-fidget": "Pop It Fidget Toy",
  "baby-panda-keychain": "Baby Panda Keychain",
  "goku-keychain": "Goku Keychain",
  "labubu-charm": "Labubu Charm"
};

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initFilters();
  initGallery();
  initReveal();
  initContactForm();
});

function initHeader() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (header) {
    const setHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initFilters() {
  const grid = document.querySelector("[data-product-grid]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const emptyNote = document.querySelector("[data-empty-note]");

  if (!grid || !filterButtons.length) {
    return;
  }

  const applyFilter = (filter) => {
    let visibleCount = 0;

    grid.querySelectorAll(".product-card").forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
      if (matches) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      const isActive = (button.dataset.filter || "all") === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (emptyNote) {
      emptyNote.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
  });

  // Category tiles above the grid jump to the section pre-filtered.
  document.querySelectorAll("[data-jump-filter]").forEach((tile) => {
    tile.addEventListener("click", () => applyFilter(tile.dataset.jumpFilter));
  });
}

function initGallery() {
  const mainImage = document.getElementById("mainProductImage");
  const thumbs = document.querySelectorAll("[data-thumbnails] .thumb-button");

  if (!mainImage || !thumbs.length) {
    return;
  }

  thumbs.forEach((button) => {
    button.addEventListener("click", () => {
      mainImage.src = button.dataset.fullImage;
      thumbs.forEach((thumb) => thumb.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const thankYou = document.getElementById("thankYouMessage");

  prefillProductMessage();

  if (!form || !thankYou) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.hidden = true;
    thankYou.hidden = false;
    thankYou.scrollIntoView({ block: "center", behavior: "smooth" });

    window.setTimeout(() => {
      thankYou.hidden = true;
      form.hidden = false;
      form.reset();
      prefillProductMessage();
    }, 8000);
  });
}

function prefillProductMessage() {
  const message = document.querySelector('textarea[name="message"]');

  if (!message) {
    return;
  }

  const productId = new URLSearchParams(window.location.search).get("product");
  const name = productNames[productId];

  if (name) {
    message.value = `Hi! I would like to know the availability and price of the ${name}.`;
  }
}
