#!/usr/bin/env node
/**
 * Generates static product pages into /products from the catalog below.
 * Static HTML keeps every product crawlable (real URLs, real content,
 * structured data) instead of JavaScript-rendered query-string pages.
 *
 * Usage: node tools/build-product-pages.js
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://corvustoys.com";

const products = [
  {
    id: "addie-girl",
    title: "Addie Girl Soft Toy",
    shortTitle: "Addie Girl",
    category: "Soft Toys",
    filter: "soft-toys",
    badge: "Best seller",
    age: "3+ years",
    tagline: "A huggable plush companion for story-led play and calm bedtimes.",
    image: "/assets/products/addie-girl/main.webp",
    images: [
      "/assets/products/addie-girl/main.webp",
      "/assets/products/addie-girl/image-2.webp",
      "/assets/products/addie-girl/image-3.webp",
      "/assets/products/addie-girl/image-4.webp"
    ],
    description:
      "Addie Girl is a soft, cuddly plush doll made for pretend play, comfort, and bedtime routines. Her friendly face and gentle size make her an easy favourite for young kids and a lovely birthday or festive gift.",
    highlights: [
      "Super-soft plush finish that is easy to cuddle",
      "Friendly size for small hands and bedtime company",
      "Great for gifting, room decor, and pretend play",
      "Recommended for ages 3 and up"
    ],
    metaDescription:
      "Buy Addie Girl, a soft cuddly plush doll for kids aged 3+. Perfect for bedtime comfort, pretend play, and gifting. See photos and ask CorVus Toys for availability."
  },
  {
    id: "addie-boy",
    title: "Addie Boy Soft Toy",
    shortTitle: "Addie Boy",
    category: "Soft Toys",
    filter: "soft-toys",
    badge: "Soft pick",
    age: "3+ years",
    tagline: "A cheerful plush buddy for everyday comfort and play.",
    image: "/assets/products/addie-boy/main.webp",
    images: [
      "/assets/products/addie-boy/main.webp",
      "/assets/products/addie-boy/image-2.webp",
      "/assets/products/addie-boy/image-3.webp",
      "/assets/products/addie-boy/image-4.webp"
    ],
    description:
      "Addie Boy is a cosy soft toy designed for gentle play, gifting, and bedtime companionship. Lightweight and cheerful, he pairs perfectly with Addie Girl for a sweet gift set.",
    highlights: [
      "Soft fabric finish made for easy cuddling",
      "Lightweight design that suits small hands",
      "Pairs with Addie Girl for a gift set",
      "Recommended for ages 3 and up"
    ],
    metaDescription:
      "Meet Addie Boy, a cheerful cuddly plush toy for kids aged 3+. Lightweight, soft, and gift-ready. View photos and check availability at CorVus Toys."
  },
  {
    id: "baby-balance-bike",
    title: "Baby Balance Bike",
    shortTitle: "Baby Balance Bike",
    category: "Active Play",
    filter: "active-play",
    badge: "Movement toy",
    age: "1-3 years",
    tagline: "A first ride-on that builds balance and confidence.",
    image: "/assets/products/baby-balance-cycle.webp",
    images: ["/assets/products/baby-balance-cycle.webp"],
    description:
      "This beginner balance bike helps toddlers build confidence, coordination, and balance through play. A low seat and stable frame make it a safe first ride-on for indoor play and supervised outdoor fun.",
    highlights: [
      "Low seat height designed for early riders",
      "Stable four-wheel design for indoor and supervised outdoor use",
      "Builds balance, movement, and coordination",
      "Best for toddlers with adult supervision"
    ],
    metaDescription:
      "Shop the Baby Balance Bike for toddlers at CorVus Toys. Low seat, stable ride-on design that builds early balance and coordination through play."
  },
  {
    id: "remote-control-car",
    title: "Remote Control Car",
    shortTitle: "RC Car",
    category: "Active Play",
    filter: "active-play",
    badge: "Fast fun",
    age: "4+ years",
    tagline: "Easy remote control racing for beginner drivers.",
    image: "/assets/products/remote-control-car.webp",
    images: ["/assets/products/remote-control-car.webp"],
    description:
      "A bright remote control car built for quick races, obstacle courses, and indoor driving fun. Simple controls make it a great first RC toy and a reliable hit as a birthday gift.",
    highlights: [
      "Easy controls that suit beginner drivers",
      "Compact size made for home play",
      "Great for racing games and gift bundles",
      "Best set up with a little adult help"
    ],
    metaDescription:
      "Race the Remote Control Car from CorVus Toys. Easy beginner controls, compact size for indoor fun, and a great birthday gift for kids aged 4+."
  },
  {
    id: "pop-it-fidget",
    title: "Pop It Fidget Toy",
    shortTitle: "Pop It Fidget",
    category: "Sensory Play",
    filter: "sensory-play",
    badge: "Pocket play",
    age: "3+ years",
    tagline: "Satisfying tactile play for busy little hands.",
    image: "/assets/products/pop-it.webp",
    images: ["/assets/products/pop-it.webp"],
    description:
      "A colourful pop it fidget toy for tactile play, focus breaks, and travel. Endlessly reusable and easy to carry, it makes a brilliant party favour or small return gift.",
    highlights: [
      "Reusable pop texture for endless repeat play",
      "Compact and easy to carry anywhere",
      "Popular as a party favour or return gift",
      "Simple sensory fun with zero setup"
    ],
    metaDescription:
      "Pop, flip, repeat! Get the colourful Pop It Fidget Toy at CorVus Toys. Reusable sensory fun, travel-friendly, and perfect for party favours and return gifts."
  },
  {
    id: "baby-panda-keychain",
    title: "Baby Panda Keychain",
    shortTitle: "Baby Panda Keychain",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Bag charm",
    age: "5+ years",
    tagline: "An adorable panda charm for keys, bags, and pencil cases.",
    image: "/assets/products/baby-panda-keychain.webp",
    images: ["/assets/products/baby-panda-keychain.webp"],
    description:
      "A small baby panda keychain that adds a playful detail to bags, pencil cases, and key rings. Lightweight, sturdy, and adorable - an easy add-on gift kids and collectors love.",
    highlights: [
      "Lightweight charm for everyday carry",
      "Sturdy keyring fits bags, keys, and school gear",
      "Easy add-on gift for kids and collectors",
      "Compact size that bundles well in gift sets"
    ],
    metaDescription:
      "Add the adorable Baby Panda Keychain to your bag or keys. A cute, lightweight collectible charm from CorVus Toys - perfect as a small gift."
  },
  {
    id: "goku-keychain",
    title: "Goku Keychain",
    shortTitle: "Goku Keychain",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Fan favorite",
    age: "5+ years",
    tagline: "A bold anime-inspired collectible for fans and bags.",
    image: "/assets/products/goku.webp",
    images: ["/assets/products/goku.webp"],
    description:
      "A bold Goku character keychain made for anime fans, collectors, and playful bag styling. The bright finish stands out on backpacks while the strong keyring handles everyday carry.",
    highlights: [
      "Bright finish that stands out on any bag",
      "Strong keyring built for everyday carry",
      "A small gift anime fans actually want",
      "Compact enough for return gift sets"
    ],
    metaDescription:
      "Power up your keys with the Goku Keychain from CorVus Toys. A bold anime collectible charm for fans, backpacks, and gift sets."
  },
  {
    id: "labubu-charm",
    title: "Labubu Charm",
    shortTitle: "Labubu Charm",
    category: "Collectibles",
    filter: "collectibles",
    badge: "Collectible",
    age: "5+ years",
    tagline: "A trending character charm for bags and display shelves.",
    image: "/assets/products/labubu.webp",
    images: ["/assets/products/labubu.webp"],
    description:
      "A collectible Labubu-style charm with a playful look for display, gifting, and everyday accessorising. Eye-catching on bags and just as happy on a shelf with the rest of a collection.",
    highlights: [
      "Eye-catching character style collectors love",
      "Great for gift hampers and display shelves",
      "Compact size that pairs with other charms",
      "A trending pick for kids and teens alike"
    ],
    metaDescription:
      "Get the trending Labubu Charm at CorVus Toys. A playful collectible for bags, shelves, and gift hampers that collectors of all ages love."
  }
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function productCard(p) {
  return `        <a class="product-card reveal" href="/products/${p.id}.html" data-category="${p.filter}">
          <div class="product-card__image">
            <span class="product-card__badge">${esc(p.badge)}</span>
            <img src="${p.image}" alt="${esc(p.title)}" loading="lazy" width="600" height="600">
          </div>
          <div class="product-card__body">
            <span class="product-card__meta">${esc(p.category)} · ${esc(p.age)}</span>
            <h3>${esc(p.shortTitle)}</h3>
            <p>${esc(p.tagline)}</p>
            <span class="product-card__cta">take a look <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>`;
}

function relatedProducts(current) {
  const sameCategory = products.filter((p) => p.id !== current.id && p.filter === current.filter);
  const others = products.filter((p) => p.id !== current.id && p.filter !== current.filter);
  return sameCategory.concat(others).slice(0, 3);
}

function galleryMarkup(p) {
  if (p.images.length < 2) {
    return `          <div class="main-image">
            <img id="mainProductImage" src="${p.images[0]}" alt="${esc(p.title)}" width="800" height="800">
          </div>`;
  }
  const thumbs = p.images
    .map(
      (img, i) => `            <button class="thumb-button${i === 0 ? " is-active" : ""}" type="button" data-full-image="${img}" aria-label="Show ${esc(p.shortTitle)} photo ${i + 1}">
              <img src="${img}" alt="${esc(p.shortTitle)} photo ${i + 1}" loading="lazy" width="160" height="160">
            </button>`
    )
    .join("\n");
  return `          <div class="main-image">
            <img id="mainProductImage" src="${p.images[0]}" alt="${esc(p.title)}" width="800" height="800">
          </div>
          <div class="thumbnail-images" data-thumbnails aria-label="More product photos">
${thumbs}
          </div>`;
}

function productJsonLd(p) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      description: p.description,
      image: p.images.map((img) => SITE_URL + img),
      url: `${SITE_URL}/products/${p.id}.html`,
      category: p.category,
      brand: { "@type": "Brand", name: "CorVus Toys" },
      audience: { "@type": "PeopleAudience", suggestedMinAge: parseInt(p.age, 10) || 3 }
    },
    null,
    2
  );
}

function breadcrumbJsonLd(p) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Toys", item: `${SITE_URL}/#products` },
        { "@type": "ListItem", position: 3, name: p.title, item: `${SITE_URL}/products/${p.id}.html` }
      ]
    },
    null,
    2
  );
}

function productPage(p) {
  const related = relatedProducts(p).map(productCard).join("\n");
  const highlights = p.highlights
    .map((h) => `            <li>${esc(h)}</li>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)} | CorVus Toys</title>
  <meta name="description" content="${esc(p.metaDescription)}">
  <link rel="canonical" href="${SITE_URL}/products/${p.id}.html">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="CorVus Toys">
  <meta property="og:title" content="${esc(p.title)} | CorVus Toys">
  <meta property="og:description" content="${esc(p.metaDescription)}">
  <meta property="og:url" content="${SITE_URL}/products/${p.id}.html">
  <meta property="og:image" content="${SITE_URL}${p.image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.title)} | CorVus Toys">
  <meta name="twitter:description" content="${esc(p.metaDescription)}">
  <meta name="twitter:image" content="${SITE_URL}${p.image}">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&family=Karla:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
${productJsonLd(p)}
  </script>
  <script type="application/ld+json">
${breadcrumbJsonLd(p)}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header" data-header>
    <div class="nav-shell">
      <a class="brand" href="/" aria-label="CorVus Toys home">
        <img src="/assets/logo.png" alt="CorVus Toys logo" width="56" height="56">
        <span class="brand__name">CorVus <em>Toys</em></span>
      </a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primaryNav" data-nav-toggle>
        <span class="sr-only">Menu</span>
        <span></span><span></span><span></span>
      </button>

      <nav class="site-nav" id="primaryNav" data-nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/#products">Toys</a>
        <a href="/#about">About</a>
        <a href="/#faq">FAQ</a>
        <a class="nav-cta" href="/#contact">Contact us</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <a href="/#products">Toys</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${esc(p.shortTitle)}</span>
    </nav>

    <section class="product-detail">
      <div class="product-gallery">
${galleryMarkup(p)}
      </div>

      <article class="product-info">
        <span class="product-badge">${esc(p.badge)}</span>
        <p class="eyebrow">${esc(p.category)} · ${esc(p.age)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="product-tagline">${esc(p.tagline)}</p>
        <p class="product-description">${esc(p.description)}</p>

        <h2 class="product-info__subhead">why kids love it</h2>
        <ul class="product-highlights">
${highlights}
        </ul>

        <div class="product-actions">
          <a class="button button--primary" href="/?product=${p.id}#contact">Ask for availability</a>
          <a class="button button--ghost" href="/#products">Browse more toys</a>
        </div>
      </article>
    </section>

    <section class="related-section">
      <div class="section-heading">
        <p class="eyebrow">more from the shelf</p>
        <h2>You may <span class="mark-yellow">also like</span></h2>
      </div>
      <div class="product-grid product-grid--compact">
${related}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/logo.png" alt="CorVus Toys logo" width="64" height="64">
        <p>Bright, gift-ready toys chosen for comfort, movement, collecting, and everyday imagination.</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <h3>Explore</h3>
        <a href="/">Home</a>
        <a href="/#products">Toys</a>
        <a href="/#about">About</a>
        <a href="/#faq">FAQ</a>
        <a href="/#contact">Contact</a>
      </nav>
      <nav class="footer-links" aria-label="Toy categories">
        <h3>Categories</h3>
        <a href="/#products">Soft toys</a>
        <a href="/#products">Sensory play</a>
        <a href="/#products">Active play</a>
        <a href="/#products">Collectibles</a>
      </nav>
    </div>
    <p class="footer-note">&copy; 2026 CorVus Toys. All rights reserved.</p>
  </footer>

  <script src="/script.js" defer></script>
</body>
</html>
`;
}

const outDir = path.join(__dirname, "..", "products");
fs.mkdirSync(outDir, { recursive: true });

for (const p of products) {
  const file = path.join(outDir, `${p.id}.html`);
  fs.writeFileSync(file, productPage(p));
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
}

module.exports = { products };
