let lastScrollY = window.scrollY;
const header = document.querySelector("header");

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("messageStatus").innerText =
    "Thank you! Your message has been sent 🎉";
  return false;
}

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
