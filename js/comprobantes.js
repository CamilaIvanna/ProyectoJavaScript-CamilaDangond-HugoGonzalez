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