const nameInput = document.querySelector('[data-js="name"]');

nameInput.addEventListener("input", (e) => {
  const excludeWords = ["da", "de", "do", "das", "dos"];
  const valueArray = e.target.value.split(" ");
  const maskText = valueArray.map((el) => {
    return excludeWords.includes(el.toLowerCase())
      ? el.toLowerCase()
      : el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
  });
  console.log(maskText);
  e.target.value = maskText.join(" ");
});
