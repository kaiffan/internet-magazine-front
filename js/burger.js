document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.getElementById("burger-button");
  const mobileMenu = document.getElementById("mobileMenu");
  burgerButton.addEventListener("click", function () {
    if (mobileMenu.classList.contains("show")) {
      mobileMenu.classList.remove("show");
    } else {
      mobileMenu.classList.add("show");
    }
  });
});
