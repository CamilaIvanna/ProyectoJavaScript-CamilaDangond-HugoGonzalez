fetch("/html/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Mostrar nombre del usuario
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const nombre = document.getElementById("nombre-navbar");
    if (usuario && nombre) {
      nombre.textContent = `${usuario.nombres} ${usuario.apellidos}`;
    }

    // Funcionalidad de cerrar sesión
    const cerrarSesion = document.getElementById("cerrar-sesion");
    if (cerrarSesion) {
      cerrarSesion.addEventListener("click", (e) => {
        e.preventDefault(); // evita navegación por defecto
        localStorage.removeItem("usuarioActivo"); // limpia sesión
        window.location.href = "/index.html"; // redirige
      });
    }

    // Menú lateral
    const boton = document.getElementById("boton-menu");
    const aside = document.getElementById("menu-lateral");
    if (boton && aside) {
      boton.addEventListener("click", () => {
        aside.classList.toggle("visible");
      });
    } else if (boton && !aside) {
      boton.style.display = "none";
    }
  });


// Cargar footer
fetch("/html/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Activación de etiquetas flotantes
document.querySelectorAll('.div-input input, .div-input select').forEach((input) => {
  const label = input.nextElementSibling;

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const tipoIdSelect = document.getElementById('tipo-id');
  const identificacionInput = document.getElementById('identificacion');
  const passwordInput = document.getElementById('psw');
  const loginButton = document.querySelector('.b-ingreso');

  // Función para hashear la contraseña ingresada
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const tipoId = tipoIdSelect.value;
    const numeroId = identificacionInput.value.trim();
    const password = passwordInput.value.trim();

    if (!tipoId || !numeroId || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const claveHash = await hashPassword(password);

    const usuario = usuarios.find(user =>
      user.tipoId === tipoId &&
      user.identificacion === numeroId &&
      user.clave === claveHash
    );

    if (usuario) {
      Swal.fire({
        icon: 'success',
        title: `¡Buen día ${usuario.nombres}!`,
        text: 'Has iniciado sesión correctamente.'
      }).then(() => {
        // Guardar sesión activa (opcional)
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        window.location.href = '/html/dashboard.html';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales inválidas',
        text: 'Datos incorrectos, intenta nuevamente.'
      });
    }
  });
});
