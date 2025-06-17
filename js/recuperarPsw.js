/**
 * Verifica si los datos ingresados coinciden con un usuario registrado
 * y, en caso positivo, muestra el formulario para crear una nueva contraseña.
 */
function verificar() {
    const tipoId = document.getElementById("tipo-id").value;
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();

    // Validar campos vacíos
    if (!tipoId || !identificacion || !email) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor completa todos los campos.'
        });
        return;
    }

    // Obtener usuarios registrados del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar coincidencia con los datos ingresados
    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.tipoId === tipoId &&
        usuario.identificacion === identificacion &&
        usuario.email.toLowerCase() === email
    );

    // Si no se encuentra el usuario
    if (!usuarioEncontrado) {
        Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            text: 'No se encontró ningún usuario con esa información.'
        });
        return;
    }

    // Mostrar formulario para crear nueva contraseña
    document.getElementById("contenedor-formulario-verificarDatos").style.display = "none";
    document.getElementById("contenedor-formulario-crearPsw").style.display = "block";
}

/**
 * Valida las nuevas contraseñas y actualiza la contraseña del usuario
 * en el almacenamiento local si la validación es exitosa.
 */
async function crearPsw() {
    const nuevaClave = document.getElementById("psw").value.trim();
    const confirmarClave = document.getElementById("validar-psw").value.trim();

    // Verificar campos vacíos
    if (!nuevaClave || !confirmarClave) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor completa ambos campos.'
        });
        return;
    }

    // Validar formato y coincidencia de las contraseñas
    if (!validarClave(nuevaClave, confirmarClave)) {
        return;
    }

    const tipoId = document.getElementById("tipo-id").value;
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();

    // Obtener usuarios y buscar el índice del usuario a modificar
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex(usuario =>
        usuario.tipoId === tipoId &&
        usuario.identificacion === identificacion &&
        usuario.email.toLowerCase() === email
    );

    // Validar si el usuario aún existe
    if (index === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'El usuario ya no se encuentra disponible.'
        });
        return;
    }

    // Hashear nueva contraseña y actualizar en el usuario
    const hash = await hashPassword(nuevaClave);
    usuarios[index].clave = hash;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Notificar éxito y redirigir
    Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
        confirmButtonText: 'Volver a inicio'
    }).then(() => {
        window.location.href = "/index.html";
    });
}

/**
 * Valida que la contraseña cumpla con los requisitos de seguridad
 * y que ambas contraseñas ingresadas coincidan.
 *
 * @param {string} clave - Nueva contraseña.
 * @param {string} confirmarClave - Confirmación de la nueva contraseña.
 * @returns {boolean} true si la clave es válida, false en caso contrario.
 */
function validarClave(clave, confirmarClave) {
    // Requiere: mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
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

/**
 * Convierte una contraseña en un hash SHA-256 utilizando Web Crypto API.
 *
 * @param {string} password - Contraseña a hashear.
 * @returns {Promise<string>} Hash en formato hexadecimal.
 */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}
