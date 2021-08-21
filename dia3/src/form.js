const nameInput = document.querySelector('[data-js="name"]');

// Exercise 01

nameInput.addEventListener("input", (e) => {
  const excludeWords = ["da", "de", "do", "das", "dos"];
  const valueArray = e.target.value.split(" ");
  const maskText = valueArray.map((el) => {
    return excludeWords.includes(el.toLowerCase())
      ? el.toLowerCase()
      : el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
  });
  e.target.value = maskText.join(" ");
});

// Exercise 02

// const selectColors = document.querySelector('[data-js="colors"]');

function $query(selector) {
  return document.querySelector(`[data-js="${selector}"]`);
}

function $create(el, attr = false, value = "") {
  const element = document.createElement(`${el}`);

  attr ? element.setAttribute(attr, value) : element;
  return element;
}

const form = $query("form");
const select = $create("select", "multiple");
const colors = ["red", "yellow", "green", "blue", "purple"];
const colorContainer = $create("div", "data-js", "colors");
colorContainer.style.display = "flex";

colors.forEach((color) => {
  const option = createOption(color);
  select.appendChild(option);
});

form.appendChild(select);
form.insertAdjacentElement("afterend", colorContainer);
console.log(select);
console.log(colors);

select.addEventListener("change", (e) => {
  colorContainer.innerHTML = "";
  Array.from(e.target.selectedOptions).forEach((option) => {
    const div = createDivColor(option.value);
    colorContainer.appendChild(div);
  });
});

function createOption(color) {
  const option = $create("option", "value", color);
  option.textContent = color;
  return option;
}

function createDivColor(value) {
  const div = $create("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.backgroundColor = value;
  return div;
}
