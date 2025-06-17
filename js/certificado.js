document.addEventListener("DOMContentLoaded", () => {
  // Recupera el usuario activo desde el localStorage
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si existe un usuario activo
  if (usuario) {
    // Opciones para el formateo de la fecha
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Convierte la fecha de creación en objeto Date y formatea
    const fecha = new Date(usuario.fechaCreacion);
    const fechaFormateada = new Intl.DateTimeFormat('es-CO', opciones).format(fecha);
    
    // Capitaliza la primera letra de la fecha formateada
    const capitalizada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    // Objeto con los campos que se insertarán en el DOM
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

    // Inserta los valores en los elementos HTML que coinciden con las clases
    for (const clase in campos) {
      const elementos = document.querySelectorAll(`.${clase}`);
      elementos.forEach(el => {
        el.textContent = campos[clase];
      });
    }
  }
});
