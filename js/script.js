// Cargar navbar
fetch("/html/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Mostrar nombre y número de cuenta del usuario
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const nombre = document.getElementById("nombre-navbar");
    const cuenta = document.getElementById("n-cuenta");

    if (usuario) {
      if (nombre) {
        nombre.textContent = `${usuario.nombres} ${usuario.apellidos}`;
      }
      if (cuenta) {
        cuenta.textContent = `N° de cuenta: ${usuario.numeroCuenta}`;
      }
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

    // Menú lateral (mostrar u ocultar)
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

// Activación de etiquetas flotantes para inputs y selects
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

// Lógica de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const tipoIdSelect = document.getElementById('tipo-id');
  const identificacionInput = document.getElementById('identificacion');
  const passwordInput = document.getElementById('psw');
  const loginButton = document.querySelector('.b-ingreso');

  // Función para hashear la contraseña ingresada (SHA-256)
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  // Evento click en botón de ingreso
  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const tipoId = tipoIdSelect.value;
    const numeroId = identificacionInput.value.trim();
    const password = passwordInput.value.trim();

    // Validación de campos vacíos
    if (!tipoId || !numeroId || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Genera el hash de la contraseña
    const claveHash = await hashPassword(password);

    // Verifica existencia del usuario con credenciales válidas
    const usuario = usuarios.find(user =>
      user.tipoId === tipoId &&
      user.identificacion === numeroId &&
      user.clave === claveHash
    );

    // Resultado del intento de login
    if (usuario) {
      Swal.fire({
        icon: 'success',
        title: `¡Buen día ${usuario.nombres}!`,
        text: 'Has iniciado sesión correctamente.'
      }).then(() => {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario)); // Guarda sesión
        window.location.href = '/html/dashboard.html'; // Redirige al panel
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
