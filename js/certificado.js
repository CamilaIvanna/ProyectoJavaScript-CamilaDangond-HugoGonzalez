    document.addEventListener("DOMContentLoaded", () => {
    const fechaCruda = localStorage.getItem("fechaServicio");
    const campoFecha = document.querySelector(".fecha-servicio");

    if (fechaCruda && campoFecha) {
        const fecha = new Date(fechaCruda); // ← Esto solo funciona si el formato es ISO

        const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        };

        const fechaFormateada = new Intl.DateTimeFormat('es-CO', opciones).format(fecha);
        const capitalizada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

        campoFecha.textContent = capitalizada;
    }
    });