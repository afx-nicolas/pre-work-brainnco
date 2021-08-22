import "./style.css";

function $create(el, attr = false, value = "") {
  const element = document.createElement(el);
  attr ? element.setAttribute(attr, value) : element;
  return element;
}

function $query(el, all = false) {
  const elements = document.querySelectorAll(`[data-js="${el}"]`);
  const element = document.querySelector(`[data-js="${el}"]`);
  if (all) {
    return elements;
  } else {
    return element;
  }
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

function deleteCar(e) {
  deletePlate(e.target.dataset.plate);
}

async function refreshTable() {
  const cars = await get();
  tableBody.innerHTML = "";

  if (cars.length) {
    cars.forEach((car) => {
      const tr = $create("tr");
      car.forEach((element) => {
        const td = elementTypes[element.type](element.value);
        tr.appendChild(td);
      });
      const button = $create("button");
      button.textContent = "Excluir";
      button.dataset.plate = car[3].value;

      button.addEventListener("click", (e) => deleteCar(e));

      tr.appendChild(button);
      tableBody.appendChild(tr);
    });
  } else {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6"><h2>Nenhum carro encontrado.</h2></td>
      <tr>
    `;
  }
}

function showMsg(error) {
  const msgElement = $query("error");
  if (error.error) {
    msgElement.textContent = error.message;
    if (msgElement.classList.contains("hide")) {
      msgElement.classList.remove("hide");
    }
  } else {
    if (!msgElement.classList.contains("hide")) {
      msgElement.classList.add("hide");
    }
  }
}

async function get() {
  const cars = fetch(url, req.get)
    .then((res) => res.json())
    .then((res) => res);

  return formatCar(await cars);
}

async function post(car) {
  const res = await fetch(url, req.post(car)).then((response) =>
    response.json()
  );

  showMsg(res);
  refreshTable();
}

async function deletePlate(plate) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ plate: plate }),
  });

  showMsg(res);
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
const tableBody = $query("table-body");

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

// function createDelete() {
//   const td = $create("td");
//   const button = $create("button", "data-js", "delete");
//   button.textContent = "Deletar";
//   td.appendChild(button);
//   return td;
// }

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
  const div = $create("div");
  const td = $create("td");
  div.style.width = "100%";
  div.style.height = "128px";
  div.style.backgroundColor = value;
  td.appendChild(div);
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
  post(car);
});

refreshTable();
