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
// Guardar la fecha al hacer clic en el botón de certificado
document.addEventListener("DOMContentLoaded", () => {
  const enlaceCertificado = document.getElementById("ir-certificado");

  if (enlaceCertificado) {
    enlaceCertificado.addEventListener("click", (e) => {
      e.preventDefault(); 

      const fecha = new Date();
      const fechaISO = fecha.toISOString(); // Guardar en formato ISO

      localStorage.setItem("fechaServicio", fechaISO); // Esto sí se cambia

      // Espera un momento para asegurarse que se guarda
      setTimeout(() => {
        window.location.href = enlaceCertificado.href;
      }, 50); // 50 milisegundos es suficiente
    });
  }
});
