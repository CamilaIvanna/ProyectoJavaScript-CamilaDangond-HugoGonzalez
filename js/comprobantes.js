// Genera una referencia aleatoria
function generarRef() {
    const ref = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('referencia').innerHTML = `<b>REF:</b> ${ref}`;
    return ref;
}

// Devuelve objeto con fecha y hora formateadas
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

        // Intentar actualizar el saldo y registrar la transacción
        const resultado = actualizarSaldoYTransaccion(valorIngresado, "Retiro", "", referencia, iso);

        // Solo si fue exitosa se continúa
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
        }else{
            document.getElementById('valor').value = "";
        }
        // Si no fue exitosa (por ejemplo, saldo insuficiente), no se muestra comprobante
    }
}


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

        // Capturar nombre del servicio desde el input/select (ajusta el id si es necesario)
        const servicio = document.getElementById('servicio')?.value || 'Servicio no especificado';

        const referencia = generarRef(); // Genera y devuelve la referencia (ya se muestra en #referencia)
        const { iso, fecha, hora } = obtenerFechaYHora();
        
        // Intentar actualizar el saldo y registrar la transacción
        const resultado = actualizarSaldoYTransaccion(valorIngresado, "Pago", servicio, referencia, iso);

        if (resultado) {
            // Actualizar campos del comprobante
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
            // Si no fue exitosa, limpiar campo y dar focus
            const inputValor = document.getElementById('valor');
            inputValor.value = "";
            inputValor.focus();
        }
    }
}

function imprimir() {
    // Intenta obtener el contenedor principal que se va a imprimir
    const comprobante = document.querySelector('.contenedor-comprobante') || document.querySelector('.contenedor-tabla');

    if (!comprobante) {
        console.error("No se encontró ningún contenedor para imprimir.");
        return;
    }

    // Intenta ocultar el botón de cerrar y el botón de imprimir si existen
    const cerrar = comprobante.querySelector('.cerrar');
    const botonImprimir = comprobante.querySelector('input[type="button"], button');
    const filtro = comprobante.querySelector('.filtro');

    if (cerrar) cerrar.style.display = 'none';
    if (botonImprimir) botonImprimir.style.display = 'none';
    if (filtro) filtro.style.display = 'none';
  
    // Imprime solo esa sección
    const contenidoOriginal = document.body.innerHTML;
    const contenidoAImprimir = comprobante.innerHTML;

    document.body.innerHTML = contenidoAImprimir;
    window.print();

    // Restaura el contenido original después de imprimir
    document.body.innerHTML = contenidoOriginal;
    window.location.reload(); // recarga para restablecer eventos, estilos, etc.
}