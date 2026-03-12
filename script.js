let lastScrollY = window.scrollY;
const header = document.querySelector("header");

/* HEADER SCROLL */

window.addEventListener("scroll", () => {

  const currentScrollY = window.scrollY;

  if (currentScrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;

});


/* HERO BUTTON */

function scrollToProducts() {

  const section = document.getElementById("products");

  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }

}


/* CONTACT FORM */

const form = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYouMessage");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    form.classList.add("hidden");
    thankYou.classList.remove("hidden");

    setTimeout(() => {

      thankYou.classList.add("hidden");
      form.classList.remove("hidden");
      form.reset();

    }, 10000);

  });

}


/* SCROLL REVEAL */

const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  });

  reveals.forEach(r => observer.observe(r));

}


/* MOBILE MENU */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (hamburger) {

  hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

  });

}

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");

  });

});


/* ================= PRODUCT DATA ================= */

const productData = {

  "pop-it": {
    title: "Pop IT",
    tagline: "Smart • Fun • Creative",
    image: "assets/products/pop-it.webp",
    description:
      "Pop IT is a fun sensory toy designed to improve focus, creativity, and fine motor skills in kids.",
    highlights: [
      "🧸 Safe & child-friendly materials",
      "🎨 Boosts creativity and focus",
      "🚀 Durable and lightweight",
      "👶 Suitable for ages 3+"
    ]
  },

  "labubu": {
    title: "Labubu Coca Cola Series",
    tagline: "Soft • Fun • Exciting",
    image: "assets/products/labubu.webp",
    description:
      "Cute Labubu collectible toy loved by kids and collectors alike.",
    highlights: [
      "🧸 Soft plush design",
      "🎨 Collectible character",
      "🚀 High quality finish",
      "🎁 Perfect gift"
    ]
  },

  "baby-balance-bike": {
    title: "Baby Balance Bike",
    tagline: "Balance • Playful • Fun",
    image: "assets/products/baby-balance-cycle.webp",
    description:
      "A beginner balance bike that helps toddlers develop coordination and confidence.",
    highlights: [
      "🚴 Improves balance",
      "🧸 Safe toddler design",
      "⚙️ Durable frame",
      "👶 Perfect for early riders"
    ]
  },

  "remote-control-car": {
    title: "Remote Control Car",
    tagline: "Creative • Colorful • Educational",
    image: "assets/products/remote-control-car.webp",
    description:
      "Fun remote control car designed for exciting indoor and outdoor play.",
    highlights: [
      "🚗 Easy remote control",
      "🎮 Smooth driving",
      "🔋 Long battery life",
      "🎁 Great gift toy"
    ]
  },

  "baby-panda-keychain": {
    title: "Baby Panda KeyChain",
    tagline: "Creative • Colorful • KeyChains",
    image: "assets/products/baby-panda-keychain.webp",
    description:
      "Cute panda keychain accessory perfect for bags and keys.",
    highlights: [
      "🐼 Cute panda design",
      "🔑 Durable keyring",
      "🎒 Perfect bag accessory",
      "🎁 Ideal gift item"
    ]
  },

  "goku-keychain": {
    title: "Goku KeyChain",
    tagline: "Creative • Colorful • KeyChains",
    image: "assets/products/goku.webp",
    description:
      "Anime themed Goku keychain loved by Dragon Ball fans.",
    highlights: [
      "🔥 Iconic anime character",
      "🎨 Bright colors",
      "🔑 Strong keyring",
      "🎁 Great collectible"
    ]
  }

};


/* LOAD PRODUCT */

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productData[productId]) {

  const product = productData[productId];

  document.getElementById("pageTitle").textContent =
    product.title + " | CorVus Toys";

  document.getElementById("productTitle").textContent =
    product.title;

  document.getElementById("productTagline").textContent =
    product.tagline;

  document.getElementById("productImage").src =
    product.image;

  document.getElementById("productDescription").textContent =
    product.description;

  const list = document.getElementById("productHighlights");

  product.highlights.forEach(item => {

    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);

  });

}