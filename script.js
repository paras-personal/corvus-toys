function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("messageStatus").innerText =
    "Thank you! Your message has been sent 🎉";
  return false;
}
