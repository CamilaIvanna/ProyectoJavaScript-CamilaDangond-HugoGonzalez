function retirar() {
  const contenedorPrimero = document.querySelector('.contenedor-primero');
  const contenedorComprobante = document.querySelector('.contenedor-comprobante');

  // Oculta el formulario de retiro
  contenedorPrimero.classList.add('oculto');

  // Muestra el comprobante
  contenedorComprobante.classList.remove('oculto');

  // Opcional: actualizar valor e info dinámica
  const valor = document.getElementById('valor').value;
  contenedorComprobante.querySelector('.valor').textContent = `$${Number(valor).toLocaleString('es-CO')}`;

  // Puedes generar una referencia aleatoria
  const ref = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('referencia').innerHTML = `<b>REF:</b> ${ref}`;

}

