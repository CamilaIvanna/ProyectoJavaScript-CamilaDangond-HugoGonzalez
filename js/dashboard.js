// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Intenta obtener el usuario activo desde el almacenamiento local
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario activo, alerta y redirige al login
    if (!usuario) {
        Swal.fire({
            icon: 'warning',
            title: 'Sesión no iniciada',
            text: 'Por favor inicia sesión para acceder a tu cuenta.',
            confirmButtonText: 'Ir al login'
        }).then(() => {
            window.location.href = "/index.html"; // Redirección al inicio de sesión
        });
        return;
    }

    // Formatear la fecha de creación de la cuenta del usuario
    const fechaFormateada = new Date(usuario.fechaCreacion).toLocaleDateString();

    // Establecer los datos del usuario en la interfaz
    document.getElementById("nombre-usuario").textContent = `${usuario.nombres} ${usuario.apellidos}`;
    document.getElementById("numero-cuenta").textContent = usuario.numeroCuenta;
    document.getElementById("fecha-creacion").textContent = fechaFormateada;
    document.getElementById("saldo-cuenta").textContent = usuario.saldo !== undefined
        ? `$${Number(usuario.saldo).toLocaleString()}` // Formateo de saldo con separadores de miles
        : "$0";
});
