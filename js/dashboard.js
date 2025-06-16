document.addEventListener("DOMContentLoaded", function () {
  const btnMenu = document.querySelector(".img-menu");
  const aside = document.getElementById("menu-lateral");

  if (btnMenu && aside) {
    btnMenu.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que el <a> cause recarga
      aside.classList.toggle("visible");
    });
  } else {
    console.error("No se encontró el botón del menú o el menú lateral.");
  }
});

