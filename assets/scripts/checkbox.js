const checkboxs = document.querySelectorAll('input[type="checkbox"]');

checkboxs.forEach((checkbox) => {
  const display = checkbox.parentElement.querySelector(".checkbox__display");
  display.addEventListener("click", (ev) => {
    // Toggling checkbox when display is clicked
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});
