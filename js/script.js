// Cargar navbar
fetch("/html/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

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
        title: `¡Bienvenido ${usuario.nombres}!`,
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
