let lastScrollY = window.scrollY;
const header = document.querySelector("header");

/* HEADER SCROLL */

window.addEventListener("scroll", () => {

  const currentScrollY = window.scrollY;

  if (header) {
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

if (form && thankYou) {
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

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});


/* ================= PRODUCT DATA ================= */

const productData = {

  "addie-girl": {
    title: "Addie Girl",
    tagline: "Soft • Fun • Exciting",
    images: ["assets/products/addie-girl/main.webp", "assets/products/addie-girl/image-2.webp", "assets/products/addie-girl/image-3.webp", "assets/products/addie-girl/image-4.webp"],
    description:
      "Addie Girl is a delightful sensory soft toy that encourages imagination, focus, and hands-on play for young children.",
    highlights: [
      "🧸 Ultra-soft, plush fabric for a cozy feel",
      "💖 Perfect for cuddling and emotional comfort",
      "🌙 Great for bedtime companionship",
      "🧼 Easy to clean and maintain",
      "👶 Suitable for ages 3+"
    ]
  },

  "addie-boy": {
    title: "Addie Boy",
    tagline: "Soft • Fun • Exciting",
    images: ["assets/products/addie-boy/main.webp", "assets/products/addie-boy/image-2.webp", "assets/products/addie-boy/image-3.webp", "assets/products/addie-boy/image-4.webp"],
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
    images: ["assets/products/baby-balance-cycle.webp"],
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
    images: ["assets/products/remote-control-car.webp"],
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
    images: ["assets/products/baby-panda-keychain.webp"],
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
    images: ["assets/products/goku.webp"],
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


/* ================= LOAD PRODUCT (FIXED) ================= */

function loadProduct() {

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

    if (!productId || !productData[productId]) {
      console.error("Invalid product ID");
      return;
    }

  const product = productData[productId];

  // TEXT
  document.getElementById("pageTitle").textContent =
    product.title + " | CorVus Toys";

  document.getElementById("productTitle").textContent =
    product.title;

  document.getElementById("productTagline").textContent =
    product.tagline;

  document.getElementById("productDescription").textContent =
    product.description;

  // HIGHLIGHTS
  const list = document.getElementById("productHighlights");
  if (list) {
    list.innerHTML = "";
    product.highlights.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

  // IMAGES
  const mainImage = document.getElementById("mainProductImage");
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  if (mainImage && thumbnailContainer) {
    thumbnailContainer.innerHTML = "";

    mainImage.src = product.images[0];

    product.images.forEach(img => {
      const thumb = document.createElement("img");
      thumb.src = img;

      thumb.addEventListener("click", () => {
        mainImage.src = img;
      });

      thumbnailContainer.appendChild(thumb);
    });
  }

}

// run only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  const isProductPage = document.getElementById("mainProductImage");

  if (isProductPage) {
    loadProduct();
  }

});