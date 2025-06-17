document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuario) {
    // Formatea la fecha de creación
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const fecha = new Date(usuario.fechaCreacion); // <-- asegúrate que esto sea un objeto Date
    const fechaFormateada = new Intl.DateTimeFormat('es-CO', opciones).format(fecha);
    const capitalizada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    // Construir objeto de campos
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
      fechaCreacion: capitalizada,
      saldo: `${usuario.saldo.toLocaleString("es-CO")}`
    };

    // Reemplazar en HTML
    for (const clase in campos) {
      const elementos = document.querySelectorAll(`.${clase}`);
      elementos.forEach(el => {
        el.textContent = campos[clase];
      });
    }
  }
});
