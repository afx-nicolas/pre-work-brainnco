const nameInput = document.querySelector('[data-js="name"]');
const selectColors = document.querySelector('[data-js="colors"]');

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

function manipulateChilds(element) {
  const divWrapper = document.querySelector('[data-js="container"]');
  const value = element.value;
  const divBox = document.createElement("div");
  divBox.setAttribute("class", `box ${value}`);

  const currentColor = document.querySelector(`.${value}`);
  const elementNotExists = !currentColor;
  // Se o elemento estiver selecionado
  if (element.selected) {
    // Se o elemento não existir, o elemento será criado
    if (elementNotExists) divWrapper.appendChild(divBox);
  }
  // Se o elemento estiver deselecionado
  else {
    // Se o elemento existe, o elemento será removido
    if (!elementNotExists) divWrapper.removeChild(currentColor);
  }
}

selectColors.addEventListener("change", (e) => {
  const options = [...e.target.options];
  options.map((el) => manipulateChilds(el));
});
