document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuario) {
    const campos = {
      cuenta: usuario.numeroCuenta,
      nombre: `${usuario.nombres.toUpperCase()} ${usuario.apellidos.toUpperCase()}`,
      tipoId: usuario.tipoId,
      identificacion: usuario.identificacion,
      correo: usuario.email,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      departamento: usuario.departamento,
      ciudad: usuario.ciudad,
      genero: usuario.genero,
      fechaCreacion: `${new Date(usuario.fechaCreacion).toLocaleString()}`,
      saldo: `${usuario.saldo.toLocaleString("es-CO")}`
    };

    for (const clase in campos) {
      const elementos = document.querySelectorAll(`.${clase}`);
      elementos.forEach(el => {
        el.textContent = campos[clase];
      });
    }
  }
});
