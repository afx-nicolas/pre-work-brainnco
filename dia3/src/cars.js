// Exercício 03

function $query(el) {
  return document.querySelector(`[data-js="${el}"]`);
}

function $create(el, attr = false, value = "") {
  const element = document.createElement(el);
  attr ? element.setAttribute(attr, value) : element;
  return element;
}

const form = $query("car-form");
const table = $query("table");

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

function createImage(value) {
  const td = $create("td");
  const img = $create("img");
  img.src = value;
  img.width = 100;
  td.appendChild(img);
  return td;
}

function createText(value) {
  const td = $create("td");
  td.textContent = value;
  return td;
}

function createColor(value) {
  const td = $create("td");
  const color = $create("div", "data-js", "car-color");
  color.style.backgroundColor = value;
  color.style.width = "100px";
  color.style.height = "100px";
  td.appendChild(color);
  return td;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);
  const image = getElement("image");

  const elements = [
    { type: "image", value: getElement("image").value },
    { type: "text", value: getElement("brand-model").value },
    { type: "text", value: getElement("year").value },
    { type: "text", value: getElement("plate").value },
    { type: "color", value: getElement("color").value },
  ];

  const tr = $create("tr");
  elements.forEach((element) => {
    const td = elementTypes[element.type](element.value);
    tr.appendChild(td);
  });

  table.appendChild(tr);
  e.target.reset();
  image.focus();
});
