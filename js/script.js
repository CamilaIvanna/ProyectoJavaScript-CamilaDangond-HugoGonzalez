// Cargar navbar
fetch("/html/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;

        // Esperar a que el DOM ya tenga el botón insertado
        const boton = document.getElementById("boton-menu");
        const aside = document.getElementById("menu-lateral");

        if (boton && aside) {
            boton.addEventListener("click", () => {
                aside.classList.toggle("visible");
            });
        }
    });

// Cargar footer
fetch("/html/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


document.querySelectorAll('.div-input input, .div-input select').forEach((input) => {
  const label = input.nextElementSibling;

  // Aplicar clase activa si el campo ya tiene contenido al cargar
  if (input.value.trim() !== '') {
    label.classList.add('active');
  }

  input.addEventListener('focus', () => {
    label.classList.add('active');
  });

  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      label.classList.remove('active');
    }
  });
});



