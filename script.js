let lastScrollY = window.scrollY;
const header = document.querySelector("header");

/* =======================
   PRODUCT CAROUSEL LOGIC
   ======================= */

const productGrid = document.querySelector(".product-grid");
const products = productGrid.children;

const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Enable carousel only if more than 5 products
if (products.length > 5) {
  productGrid.classList.add("carousel");
  document.querySelector(".carousel-wrapper")
    .classList.add("carousel-active");
}

// Scroll by ONE card width
const CARD_WIDTH = 260;

nextBtn.addEventListener("click", () => {
  productGrid.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  productGrid.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
});

/* =======================
   HEADER SCROLL BEHAVIOR
   ======================= */

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Shadow + logo shrink
  if (currentScrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

/* =======================
   OTHER FUNCTIONS
   ======================= */

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

const form = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYouMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Hide form, show thank-you
  form.classList.add("hidden");
  thankYou.classList.remove("hidden");

  // Reset back after 10 seconds
  setTimeout(() => {
    thankYou.classList.add("hidden");
    form.classList.remove("hidden");
    form.reset();
  }, 10000);
});

function updateArrows() {
  prevBtn.disabled = productGrid.scrollLeft === 0;
  nextBtn.disabled =
    productGrid.scrollLeft + productGrid.clientWidth >=
    productGrid.scrollWidth;
}

productGrid.addEventListener("scroll", updateArrows);
updateArrows();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

reveals.forEach(r => observer.observe(r));