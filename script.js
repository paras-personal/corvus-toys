const products = [
  {
    id: "addie-girl",
    title: "Addie Girl",
    category: "Soft toys",
    filter: "soft-toys",
    badge: "Best seller",
    tagline: "Soft comfort for story-led play.",
    image: "assets/products/addie-girl/main.webp",
    images: [
      "assets/products/addie-girl/main.webp",
      "assets/products/addie-girl/image-2.webp",
      "assets/products/addie-girl/image-3.webp",
      "assets/products/addie-girl/image-4.webp"
    ],
    description: "A soft companion made for cuddles, pretend play, and calm bedtime routines.",
    highlights: [
      "Plush feel with a friendly size for young kids.",
      "Good for gifting, room decor, and comfort play.",
      "Multiple photos available on the product page.",
      "Recommended for ages 3 and up."
    ]
  },
  {
    id: "addie-boy",
    title: "Addie Boy",
    category: "Soft toys",
    filter: "soft-toys",
    badge: "Soft pick",
    tagline: "A cheerful plush for everyday comfort.",
    image: "assets/products/addie-boy/main.webp",
    images: [
      "assets/products/addie-boy/main.webp",
      "assets/products/addie-boy/image-2.webp",
      "assets/products/addie-boy/image-3.webp",
      "assets/products/addie-boy/image-4.webp"
    ],
    description: "A cozy soft toy designed for gentle play, gifting, and bedtime companionship.",
    highlights: [
      "Soft fabric finish for easy cuddling.",
      "Lightweight design for small hands.",
      "Helpful as a birthday or festive gift.",
      "Recommended for ages 3 and up."
    ]
  },
  {
    id: "baby-balance-bike",
    title: "Baby Balance Bike",
    category: "Active play",
    filter: "active-play",
    badge: "Movement toy",
    tagline: "Early balance practice for toddlers.",
    image: "assets/products/baby-balance-cycle.webp",
    images: ["assets/products/baby-balance-cycle.webp"],
    description: "A beginner ride-on that helps toddlers build confidence, coordination, and balance through play.",
    highlights: [
      "Low seat height for early riders.",
      "Stable design for indoor and supervised outdoor use.",
      "Encourages movement and coordination.",
      "Suitable for toddlers with adult supervision."
    ]
  },
  {
    id: "remote-control-car",
    title: "Remote Control Car",
    category: "Active play",
    filter: "active-play",
    badge: "Fast fun",
    tagline: "Simple remote control action for playtime.",
    image: "assets/products/remote-control-car.webp",
    images: ["assets/products/remote-control-car.webp"],
    description: "A bright remote control car for quick races, obstacle games, and indoor driving fun.",
    highlights: [
      "Easy controls for beginner drivers.",
      "Compact size for home play.",
      "Great for racing games and gift bundles.",
      "Best used with adult setup support."
    ]
  },
  {
    id: "pop-it-fidget",
    title: "Pop It Fidget",
    category: "Sensory play",
    filter: "sensory-play",
    badge: "Pocket play",
    tagline: "Tactile play for busy hands.",
    image: "assets/products/pop-it.webp",
    images: ["assets/products/pop-it.webp"],
    description: "A colorful fidget toy for tactile play, focus breaks, travel, and small return gifts.",
    highlights: [
      "Reusable pop texture for repeat play.",
      "Compact and easy to carry.",
      "Works well for party favors and small gifts.",
      "Simple sensory activity with no setup."
    ]
  },
  {
    id: "baby-panda-keychain",
    title: "Baby Panda Keychain",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Bag charm",
    tagline: "A cute accessory for keys and bags.",
    image: "assets/products/baby-panda-keychain.webp",
    images: ["assets/products/baby-panda-keychain.webp"],
    description: "A small character keychain that adds a playful detail to bags, pencil cases, and key rings.",
    highlights: [
      "Lightweight charm for daily carry.",
      "Easy add-on gift for kids and collectors.",
      "Works for bags, keys, and school accessories.",
      "Compact size for gifting in bundles."
    ]
  },
  {
    id: "goku-keychain",
    title: "Goku Keychain",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Fan favorite",
    tagline: "A colorful anime-inspired collectible.",
    image: "assets/products/goku.webp",
    images: ["assets/products/goku.webp"],
    description: "A bold character keychain made for fans, collectors, and playful bag accessories.",
    highlights: [
      "Bright finish that stands out on bags.",
      "Strong keyring for everyday carry.",
      "Good as a small gift or collection piece.",
      "Compact enough for return gift sets."
    ]
  },
  {
    id: "labubu-charm",
    title: "Labubu Charm",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Collectible",
    tagline: "A playful charm for bags and shelves.",
    image: "assets/products/labubu.webp",
    images: ["assets/products/labubu.webp"],
    description: "A collectible charm with a playful look for display, gifting, and everyday accessorizing.",
    highlights: [
      "Eye-catching character style.",
      "Good for collectors and gift hampers.",
      "Compact display size.",
      "Pairs well with other small accessories."
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initProductGrid();
  initProductPage();
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
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initProductGrid() {
  const grid = document.querySelector("[data-product-grid]");
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (!grid) {
    return;
  }

  renderProductCards(grid, products);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      const visibleProducts = filter === "all" ? products : products.filter((product) => product.filter === filter);

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      renderProductCards(grid, visibleProducts);
    });
  });
}

function initProductPage() {
  const page = document.querySelector("[data-product-page]");
  const mainImage = document.getElementById("mainProductImage");

  if (!page || !mainImage) {
    return;
  }

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = products.find((item) => item.id === productId);

  if (!product) {
    renderMissingProduct(page);
    return;
  }

  document.title = `${product.title} | CorVus Toys`;
  setText("pageTitle", `${product.title} | CorVus Toys`);
  setText("productCategory", product.category);
  setText("productTitle", product.title);
  setText("productTagline", product.tagline);
  setText("productBadge", product.badge);
  setText("productDescription", product.description);

  mainImage.src = product.images[0];
  mainImage.alt = product.title;

  renderHighlights(product.highlights);
  renderThumbnails(product, mainImage);
  renderInquiryLink(product);
  renderRelatedProducts(product);
}

function renderProductCards(grid, productList) {
  grid.replaceChildren();

  productList.forEach((product) => {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = `product.html?id=${encodeURIComponent(product.id)}`;
    card.setAttribute("aria-label", `View ${product.title}`);

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-card__image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.loading = "lazy";
    imageWrap.append(image);

    const body = document.createElement("div");
    body.className = "product-card__body";

    const meta = document.createElement("span");
    meta.className = "product-card__meta";
    meta.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const tagline = document.createElement("p");
    tagline.textContent = product.tagline;

    body.append(meta, title, tagline);
    card.append(imageWrap, body);
    grid.append(card);
  });
}

function renderHighlights(highlights) {
  const list = document.getElementById("productHighlights");

  if (!list) {
    return;
  }

  list.replaceChildren();

  highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    list.append(item);
  });
}

function renderThumbnails(product, mainImage) {
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  if (!thumbnailContainer) {
    return;
  }

  thumbnailContainer.replaceChildren();

  product.images.forEach((imagePath, index) => {
    const button = document.createElement("button");
    button.className = "thumb-button";
    button.type = "button";
    button.setAttribute("aria-label", `Show ${product.title} photo ${index + 1}`);

    if (index === 0) {
      button.classList.add("is-active");
    }

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = "";
    image.loading = "lazy";
    button.append(image);

    button.addEventListener("click", () => {
      mainImage.src = imagePath;
      thumbnailContainer.querySelectorAll(".thumb-button").forEach((thumb) => thumb.classList.remove("is-active"));
      button.classList.add("is-active");
    });

    thumbnailContainer.append(button);
  });
}

function renderInquiryLink(product) {
  const inquiry = document.getElementById("productInquiry");

  if (!inquiry) {
    return;
  }

  inquiry.href = `index.html?product=${encodeURIComponent(product.id)}#contact`;
}

function renderRelatedProducts(product) {
  const relatedGrid = document.querySelector("[data-related-products]");

  if (!relatedGrid) {
    return;
  }

  const related = products
    .filter((item) => item.id !== product.id)
    .filter((item) => item.filter === product.filter)
    .concat(products.filter((item) => item.id !== product.id && item.filter !== product.filter))
    .slice(0, 3);

  renderProductCards(relatedGrid, related);
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
  const product = products.find((item) => item.id === productId);

  if (product) {
    message.value = `I would like to know more about ${product.title}.`;
  }
}

function renderMissingProduct(page) {
  page.replaceChildren();

  const section = document.createElement("section");
  section.className = "empty-state";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Toy not found";

  const title = document.createElement("h1");
  title.textContent = "This product is not available.";

  const copy = document.createElement("p");
  copy.textContent = "The toy may have moved or the link may be outdated. Browse the full CorVus Toys catalog instead.";

  const link = document.createElement("a");
  link.className = "button button--primary";
  link.href = "index.html#products";
  link.textContent = "View products";

  section.append(eyebrow, title, copy, link);
  page.append(section);
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}
