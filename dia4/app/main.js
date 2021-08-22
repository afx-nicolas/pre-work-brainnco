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

const url = "http://localhost:3333/cars";

const req = {
  get: {
    method: "GET",
  },
  post: (car) => {
    return {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        image: car.image,
        brandModel: car.brandModel,
        year: car.year,
        plate: car.plate,
        color: car.color,
      }),
    };
  },
};

async function refreshTable() {
  const cars = await getCars();
  tableBody.innerHTML = "";

  if (cars.length) {
    cars.forEach((car) => {
      const tr = $create("tr");
      car.forEach((element) => {
        const td = elementTypes[element.type](element.value);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  } else {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5"><h2>Nenhum carro encontrado.</h2></td>
      <tr>
    `;
  }
}

function showMsg(msg) {
  const errorText = $query("error");
  if (msg.error) {
    if (errorText.classList.contains("hide")) {
      errorText.classList.remove("hide");
    }
    errorText.textContent = msg.message;
  } else {
    if (!errorText.classList.contains("hide")) {
      errorText.classList.add("hide");
    }
  }
}

async function getCars() {
  const cars = fetch(url, req.get)
    .then((res) => res.json())
    .then((res) => res);

  return formatCar(await cars);
}

async function postCar(car) {
  const result = fetch(url, req.post(car))
    .then((response) => response.json())
    .then((res) => showMsg(res));

  refreshTable();
}

function formatCar(cars) {
  const carsObject = [];
  cars.map((car) => {
    const carArray = [
      { type: "image", value: car.image },
      { type: "text", value: car.brandModel },
      { type: "text", value: car.year },
      { type: "text", value: car.plate },
      { type: "color", value: car.color },
    ];
    carsObject.push(carArray);
  });
  return carsObject;
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
  td.style.height = "128px";
  td.style.backgroundColor = value;
  return td;
}

const getFormElement = (e) => (elementName) => {
  return e.target.elements[elementName];
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);
  const car = {
    image: getElement("image").value,
    brandModel: getElement("brand-model").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  form.reset();
  form.image.focus();
  postCar(car);
});

refreshTable();
