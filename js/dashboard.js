        document.addEventListener("DOMContentLoaded", () => {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (!usuario) {
            Swal.fire({
            icon: 'warning',
            title: 'Sesión no iniciada',
            text: 'Por favor inicia sesión para acceder a tu cuenta.',
            confirmButtonText: 'Ir al login'
            }).then(() => {
            window.location.href = "/index.html";
            });
            return;
        }

        // Formatear fecha
        const fechaFormateada = new Date(usuario.fechaCreacion).toLocaleDateString();

        // Establecer valores en la interfaz
        document.getElementById("nombre-usuario").textContent = `${usuario.nombres} ${usuario.apellidos}`;
        document.getElementById("numero-cuenta").textContent = usuario.numeroCuenta;
        document.getElementById("fecha-creacion").textContent = fechaFormateada;
        document.getElementById("saldo-cuenta").textContent = usuario.saldo !== undefined
            ? `$${Number(usuario.saldo).toLocaleString()}`
            : "$0";
        });
