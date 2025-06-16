document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("boton-menu");
  const aside = document.getElementById("menu-lateral");

  boton.addEventListener("click", () => {
  aside.classList.toggle("visible");
  });
});
