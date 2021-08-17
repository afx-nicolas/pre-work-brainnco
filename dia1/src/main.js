import "./style.css";

// Exercicio 03 querySelector corrigido para data-js
const app = document.querySelector('[data-js="app"]');
app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

// Exercicio 04 link que alterna a visibilidade do .app
const link = document.querySelector('[data-js="link"]');

link.addEventListener("click", (e) => {
  e.preventDefault();
  // Alternar visibilidade do .app
  app.classList.toggle("hide");
  // Alternar textContent de acordo com o estado do .app
  e.target.textContent = app.classList.contains("hide")
    ? "Mostrar"
    : "Esconder";
});
