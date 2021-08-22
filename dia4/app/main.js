import "./style.css";

function $create(el, attr = false, value = "") {
  const element = document.createElement(el);
  attr ? element.setAttribute(attr, value) : element;
  return element;
}

function $query(el) {
  const element = document.querySelector(`[data-js="${el}"]`);
  return element;
}

const req = {
  get: {
    method: "GET",
  },
};

async function getCars() {
  return fetch("http://localhost:3333/cars", req.get)
    .then((res) => res.json())
    .then((res) => res);
}

const form = $query("car-form");
const table = $query("table");
const tableBody = $query("table-body");

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

function createImage(value) {
  const td = $create("td");
  const img = $create("img");
  img.src = value;
  td.appendChild(img);
  return td;
}

function createText(value) {
  const td = $create("td");
  td.textContent = value;
  return td;
}

function createColor(value) {
  const td = $create("div");
  td.style.width = "100%";
  td.style.height = "100px";
  td.style.backgroundColor = value;
  return td;
}

async function refreshTable() {
  const cars = await getCars();

  if (cars.length) {
    // console.log(cars);
    cars.forEach((car) => {
      const tr = $create("tr");
      car.forEach((element) => {
        const td = elementTypes[element.type](element.value);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  } else {
    table.innerHTML = "<h2>Nenhum carro encontrado.</h2>";
  }
}

refreshTable();
