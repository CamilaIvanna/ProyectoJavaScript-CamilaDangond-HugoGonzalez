//Generar referencia aleatoria
function generarRef() {
    const ref = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('referencia').innerHTML = `<b>REF:</b> ${ref}`;
}

function actualizarValoComprobante(contenedorComprobante) {
  const valor = document.getElementById('valor')?.value;
  if (valor) {
    const valorElemento = contenedorComprobante.querySelector('.valor');
    if (valorElemento) {
      valorElemento.textContent = `$${Number(valor).toLocaleString('es-CO')}`;
    }
  }

  // Verifica si se trata de un comprobante de recarga con <p class="baco-user">
  const bancoUserP = contenedorComprobante.querySelector('.baco-user');
  if (bancoUserP) {
    const banco = document.getElementById('banco')?.value || 'banco';
    const usuario = document.getElementById('usuario')?.value || 'usuario';
    bancoUserP.textContent = `Recarga por canal electrónico desde ${banco} - ${usuario}`;
  }
  generarRef();
}

function generarComprobante() {
    const formulario = document.getElementById("contenedor-formulario-verificarDatos");
    const comprobante = document.querySelector(".contenedor-comprobante");

    if (!formulario || !comprobante) {
        console.error("No se encontró el formulario o el comprobante.");
        return;
    }

    actualizarValoComprobante(comprobante); //Actualiza valor, banco y usuario antes de mostrarlo

    formulario.classList.add("oculto");
    comprobante.classList.remove("oculto");
}


function retirar() {
    generarComprobante();
}
function recargar(){
    generarComprobante();
}



function imprimir() {
    const comprobante = document.querySelector('.contenedor-comprobante');
    const cerrar = comprobante.querySelector('.cerrar');
    const botonImprimir = document.getElementById('btn-imprimir');

    // Oculta los elementos antes de imprimir
    cerrar.style.display = 'none';
    botonImprimir.style.display = 'none';

    // Imprime solo esa sección
    const contenidoOriginal = document.body.innerHTML;
    const contenidoAImprimir = comprobante.innerHTML;

    document.body.innerHTML = contenidoAImprimir;
    window.print();

    // Restaura el contenido original
    document.body.innerHTML = contenidoOriginal;
    window.location.reload(); // recarga para restablecer los eventos y scripts
}