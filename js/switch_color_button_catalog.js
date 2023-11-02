const button1 = document.getElementById("btn_not_active_head_setting");
const button2 = document.getElementById("btn_active_head_setting");

button1.addEventListener("click", () => {
  button2.style.border = window
    .getComputedStyle(button1)
    .getPropertyValue("border");
  button1.style.border = window
    .getComputedStyle(button2)
    .getPropertyValue("border");
  button1.style.backgroundColor = "yellow";
  button2.style.backgroundColor = "#FFA640";
});

button2.addEventListener("click", () => {
  button1.style.border = window
    .getComputedStyle(button2)
    .getPropertyValue("border");
  button2.style.border = window
    .getComputedStyle(button1)
    .getPropertyValue("border");
  button1.style.backgroundColor = "#FFA640";
  button2.style.backgroundColor = "yellow";
});
