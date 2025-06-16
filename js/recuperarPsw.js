// Validación de campos de verificación
function verificar() {
    const tipoId = document.getElementById("tipo-id").value;
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();

    if (!tipoId || !identificacion || !email) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor completa todos los campos.'
        });
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.tipoId === tipoId &&
        usuario.identificacion === identificacion &&
        usuario.email.toLowerCase() === email
    );

    if (!usuarioEncontrado) {
        Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            text: 'No se encontró ningún usuario con esa información.'
        });
        return;
    }

    // Si se encuentra, mostrar el formulario para crear nueva clave
    document.getElementById("contenedor-formulario-verificarDatos").style.display = "none";
    document.getElementById("contenedor-formulario-crearPsw").style.display = "block";
}

// Validar nueva clave y actualizar
async function crearPsw() {
    const nuevaClave = document.getElementById("psw").value.trim();
    const confirmarClave = document.getElementById("validar-psw").value.trim();

    if (!nuevaClave || !confirmarClave) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor completa ambos campos.'
        });
        return;
    }

    if (!validarClave(nuevaClave, confirmarClave)) {
        return;
    }

    const tipoId = document.getElementById("tipo-id").value;
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const index = usuarios.findIndex(usuario =>
        usuario.tipoId === tipoId &&
        usuario.identificacion === identificacion &&
        usuario.email.toLowerCase() === email
    );

    if (index === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'El usuario ya no se encuentra disponible.'
        });
        return;
    }

    const hash = await hashPassword(nuevaClave);
    usuarios[index].clave = hash;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        icon: 'success',
        title: '¡Contraseña actualizada!',
        text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
        confirmButtonText: 'Volver a inicio'
    }).then(() => {
        window.location.href = "/index.html";
    });
}

// Validador de clave segura
function validarClave(clave, confirmarClave) {
    const claveSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!claveSegura.test(clave)) {
        Swal.fire({
            icon: 'error',
            title: 'Clave insegura',
            html: 'Debe tener al menos 8 caracteres,<br>una mayúscula, una minúscula, un número y un símbolo.'
        });
        document.getElementById("psw").focus();
        return false;
    }

    if (clave !== confirmarClave) {
        Swal.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden',
            text: 'Verifica que ambas sean iguales.'
        });
        document.getElementById("validar-psw").focus();
        return false;
    }

    return true;
}

// Función para hashear la contraseña
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}
