// Genera una referencia aleatoria en formato REF-XXXXXXXX
function generarRef() {
  const ref = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('referencia').innerHTML = `<b>REF:</b> ${ref}`;
  return ref;
}

// Devuelve un objeto con fecha ISO, fecha local y hora local
function obtenerFechaYHora() {
  const ahora = new Date();
  return {
    iso: ahora.toISOString(),
    fecha: ahora.toLocaleDateString('es-CO'),
    hora: ahora.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
}

// Actualiza dinámicamente los valores del comprobante según los datos ingresados en el formulario
function actualizarValorComprobante(contenedorComprobante) {
  const valor = document.getElementById('valor')?.value;
  if (valor) {
    const valorElemento = contenedorComprobante.querySelector('.valor');
    if (valorElemento) {
      valorElemento.textContent = `$${Number(valor).toLocaleString('es-CO')}`;
    }
  }

  const bancoUserP = contenedorComprobante.querySelector('.baco-user');
  if (bancoUserP) {
    const banco = document.getElementById('banco')?.value || 'banco';
    const usuario = document.getElementById('usuario')?.value || 'usuario';
    bancoUserP.textContent = `Recarga por canal electrónico desde ${banco} - ${usuario}`;
  }

  const descripcionElemento = contenedorComprobante.querySelector('.descripción');
  const servicioSeleccionado = document.getElementById('servicio')?.value;

  if (descripcionElemento && servicioSeleccionado) {
    descripcionElemento.textContent = `Pago de servicio - ${servicioSeleccionado}`;
  }
}

// Cambia la vista del formulario al comprobante y actualiza su contenido
function generarComprobante() {
  const formulario = document.getElementById("contenedor-formulario-verificarDatos");
  const comprobante = document.querySelector(".contenedor-comprobante");

  if (!formulario || !comprobante) {
    console.error("No se encontró el formulario o el comprobante.");
    return;
  }

  actualizarValorComprobante(comprobante);
  formulario.classList.add("oculto");
  comprobante.classList.remove("oculto");
}

// Valida campos genéricos de un formulario con alertas personalizadas
function validarFormularioGenerico(formId) {
  const form = document.getElementById(formId);
  const campos = form.querySelectorAll('input, select, textarea');

  for (let campo of campos) {
    if (campo.type === 'button' || campo.type === 'submit') continue;

    const valor = campo.value.trim();
    const nombreCampo = campo.labels?.[0]?.innerText || campo.placeholder || campo.name || campo.id;

    if (!valor) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo incompleto',
        text: `Por favor completa el campo: ${nombreCampo}`
      });
      return false;
    }

    if (campo.type === 'number' || campo.type === 'range') {
      const valorNum = parseFloat(valor);
      if (isNaN(valorNum) || valorNum <= 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Valor inválido',
          text: `El campo "${nombreCampo}" debe ser un número mayor a 0`
        });
        return false;
      }
    }
  }

  return true;
}

// Actualiza el saldo del usuario activo y registra una transacción en su historial
function actualizarSaldoYTransaccion(valor, tipoTransaccion, servicio = "", referencia = "", fechaManual = "") {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
  if (!usuarioActivo?.numeroCuenta) {
    console.error('Usuario activo no válido o no encontrado.');
    return false;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const index = usuarios.findIndex(u => u.numeroCuenta === usuarioActivo.numeroCuenta);

  if (index === -1) {
    console.error('Usuario activo no encontrado en la lista de usuarios.');
    return false;
  }

  let tipo = "";
  let concepto = "";

  switch (tipoTransaccion) {
    case "Consignación":
      tipo = "consignación";
      concepto = "Consignación por canal electrónico";
      usuarios[index].saldo += valor;
      break;
    case "Retiro":
      tipo = "Retiro";
      concepto = "Retiro de dinero";
      usuarios[index].saldo -= valor;
      break;
    case "Pago":
      tipo = "Pago";
      concepto = `Pago de servicio público ${servicio}`;
      usuarios[index].saldo -= valor;
      break;
    default:
      console.error('Tipo de transacción no reconocido.');
      return false;
  }

  if (usuarios[index].saldo < 0) {
    Swal.fire({
      icon: 'error',
      title: 'Saldo insuficiente',
      text: 'No tienes fondos suficientes para realizar esta transacción.'
    });
    return false;
  }

  const transaccion = {
    fecha: fechaManual || new Date().toISOString(),
    referencia: referencia,
    tipo: tipo,
    concepto: concepto,
    valor: valor
  };

  usuarios[index].transacciones = usuarios[index].transacciones || [];
  usuarios[index].transacciones.push(transaccion);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));

  return {
    nuevoSaldo: usuarios[index].saldo,
    transaccion: transaccion
  };
}

// Maneja el flujo de un retiro, incluyendo validación y generación de comprobante
function retirar() {
  if (validarFormularioGenerico("formulario-retirar")) {
    const valorIngresado = parseFloat(document.getElementById('valor').value.trim());
    if (isNaN(valorIngresado) || valorIngresado <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Valor inválido',
        text: 'El valor ingresado debe ser un número mayor a 0'
      });
      return;
    }

    const referencia = generarRef();
    const { iso, fecha, hora } = obtenerFechaYHora();

    const resultado = actualizarSaldoYTransaccion(valorIngresado, "Retiro", "", referencia, iso);

    if (resultado) {
      const refElemento = document.getElementById('referencia');
      if (refElemento) {
        refElemento.innerHTML = `<b>REF:</b> ${referencia}`;
      }

      const fechaHoraElemento = document.getElementById('fecha-hora-comprobante');
      if (fechaHoraElemento) {
        fechaHoraElemento.innerHTML = `${fecha} -- ${hora}`;
      }

      generarComprobante();
    } else {
      document.getElementById('valor').value = "";
    }
  }
}

// Maneja el flujo de una recarga o consignación
function recargar() {
  if (validarFormularioGenerico("formulario-recargar")) {
    const valorIngresado = parseFloat(document.getElementById('valor').value.trim());
    if (isNaN(valorIngresado) || valorIngresado <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Valor inválido',
        text: 'El valor ingresado debe ser un número mayor a 0'
      });
      return;
    }

    const referencia = generarRef();
    const { iso, fecha, hora } = obtenerFechaYHora();

    const refElemento = document.getElementById('referencia');
    if (refElemento) {
      refElemento.innerHTML = `<b>REF:</b> ${referencia}`;
    }

    const fechaHoraElemento = document.getElementById('fecha-hora-comprobante');
    if (fechaHoraElemento) {
      fechaHoraElemento.innerHTML = `${fecha} -- ${hora}`;
    }

    actualizarSaldoYTransaccion(valorIngresado, "Consignación", "", referencia, iso);
    generarComprobante();
  }
}

// Maneja el flujo de pago de servicios
function pagar() {
  if (validarFormularioGenerico("formulario-pagar")) {
    const valorIngresado = parseFloat(document.getElementById('valor').value.trim());
    if (isNaN(valorIngresado) || valorIngresado <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Valor inválido',
        text: 'El valor ingresado debe ser un número mayor a 0'
      });
      return;
    }

    const servicio = document.getElementById('servicio')?.value || 'Servicio no especificado';
    const referencia = generarRef();
    const { iso, fecha, hora } = obtenerFechaYHora();

    const resultado = actualizarSaldoYTransaccion(valorIngresado, "Pago", servicio, referencia, iso);

    if (resultado) {
      const refElemento = document.getElementById('referencia');
      if (refElemento) {
        refElemento.innerHTML = `<b>REF:</b> ${referencia}`;
      }

      const fechaHoraElemento = document.getElementById('fecha-hora-comprobante');
      if (fechaHoraElemento) {
        fechaHoraElemento.innerHTML = `${fecha} -- ${hora}`;
      }

      generarComprobante();
    } else {
      const inputValor = document.getElementById('valor');
      inputValor.value = "";
      inputValor.focus();
    }
  }
}

// Imprime la sección del comprobante o la tabla de transacciones
function imprimir() {
  const comprobante = document.querySelector('.contenedor-comprobante') || document.querySelector('.contenedor-tabla');

  if (!comprobante) {
    console.error("No se encontró ningún contenedor para imprimir.");
    return;
  }

  const cerrar = comprobante.querySelector('.cerrar');
  const botonImprimir = comprobante.querySelector('input[type="button"], button');
  const filtro = comprobante.querySelector('.filtro');

  if (cerrar) cerrar.style.display = 'none';
  if (botonImprimir) botonImprimir.style.display = 'none';
  if (filtro) filtro.style.display = 'none';

  const contenidoOriginal = document.body.innerHTML;
  const contenidoAImprimir = comprobante.innerHTML;

  document.body.innerHTML = contenidoAImprimir;
  window.print();

  document.body.innerHTML = contenidoOriginal;
  window.location.reload();
}

// Filtra las transacciones entre dos fechas específicas
function filtrarPorFecha() {
  const fechaInicio = document.getElementById('fecha-inicio')?.value;
  const fechaFin = document.getElementById('fecha-fin')?.value;

  if (!fechaInicio || !fechaFin) {
    Swal.fire({
      icon: 'warning',
      title: 'Fechas requeridas',
      text: 'Debes seleccionar una fecha de inicio y una de fin.'
    });
    return;
  }

 const inicio = new Date(`${fechaInicio}T00:00:00.000`);
 const fin = new Date(`${fechaFin}T23:59:59.999`);


  if (inicio > fin) {
    Swal.fire({
      icon: 'error',
      title: 'Rango inválido',
      text: 'La fecha de inicio no puede ser posterior a la fecha de fin.'
    });
    return;
  }

  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
  const transacciones = usuarioActivo?.transacciones || [];

  const transaccionesFiltradas = transacciones.filter(tx => {
    const fechaTx = new Date(tx.fecha);
    return fechaTx >= inicio && fechaTx <= fin;
  });

  mostrarTransacciones(transaccionesFiltradas, fechaInicio, fechaFin);
}

// Muestra en el DOM las transacciones recibidas en una tabla
function mostrarTransacciones(lista, fechaInicio, fechaFin) {
  const contenedor = document.querySelector('.transacciones');

  if (lista.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin resultados',
      text: 'No se encontraron transacciones en el rango de fechas seleccionado.'
    });
    return;
  }

  document.getElementById('btn-imprimir').style.display = "block";

  const filasAnteriores = contenedor.querySelectorAll('.fila-transacciones');
  filasAnteriores.forEach(fila => fila.remove());

  const spanInicio = document.getElementById('fecha-inicio-span');
  const spanFin = document.getElementById('fecha-fin-span');

  if (spanInicio && spanFin) {
  spanInicio.textContent = new Date(`${fechaInicio}T00:00:00`).toLocaleDateString('es-CO');
  spanFin.textContent = new Date(`${fechaFin}T00:00:00`).toLocaleDateString('es-CO');

  }

  const transaccionesOrdenadas = lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  transaccionesOrdenadas.forEach(tx => {
    const fila = document.createElement('div');
    fila.className = 'item-transacciones container-grid fila-transacciones';
    fila.innerHTML = `
      <div class="fecha">${new Date(tx.fecha).toLocaleString('es-CO')}</div>
      <div class="referencia">${tx.referencia || '-'}</div>
      <div class="tipo-transaccion">${tx.tipo}</div>
      <div class="descripcion">${tx.concepto}</div>
      <div class="valor">$${Number(tx.valor).toLocaleString('es-CO')}</div>
    `;
    contenedor.appendChild(fila);
  });
}
