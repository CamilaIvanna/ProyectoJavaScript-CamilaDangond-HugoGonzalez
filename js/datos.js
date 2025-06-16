document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario) {
        const cuentaElementos = document.querySelectorAll(".cuenta");
        cuentaElementos.forEach(el => {
            el.textContent = usuario.numeroCuenta;
        });
    }
});
