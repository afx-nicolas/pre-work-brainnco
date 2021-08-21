// Exercício 03

const addCarButon = document.querySelector('[data-js="add-car"]');

const checkFields = (data) => {
  const dataArray = [...Object.values(data)];
  return dataArray.includes("");
};

const clearFields = () => {
  const form = document.querySelector('[data-js="carForm"]');
  form.querySelectorAll("input").forEach((e) => (e.value = ""));
};

function addCar(carData) {
  const { car, brand, year, plate, color } = carData;
  const isNotFilled = checkFields(carData);

  if (isNotFilled) {
    alert("Preencha todos os campos");
  } else {
    const tableBody = document.querySelector('[data-js="car-table-body"]');
    const romTemplate = `
    <tr>
      <td>
        <img
          src="${car}"
          class="car-img"
        />
      </td>
      <td>${brand}</td>
      <td>${year}</td>
      <td>${plate}</td>
      <td>
        <div class="car-color" style="background-color: ${color}"></div>
      </td>
    </tr>
  `;
    tableBody.insertAdjacentHTML("beforeend", romTemplate);
    clearFields();
  }
}

addCarButon.addEventListener("click", (e) => {
  e.preventDefault();
  const formInputs = document.querySelector('[data-js="carForm"]');
  const carData = {
    car: formInputs.image.value,
    brand: formInputs.brand.value,
    year: formInputs.year.value,
    plate: formInputs.plate.value,
    color: formInputs.color.value,
  };
  addCar(carData);
});
