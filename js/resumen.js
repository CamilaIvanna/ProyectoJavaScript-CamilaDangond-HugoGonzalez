document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.transacciones');

    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const transacciones = usuarioActivo?.transacciones || [];

    // Si no hay transacciones, mostrar alerta y redirigir
    if (transacciones.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin movimientos',
            text: 'No se encontraron transacciones registradas.',
            confirmButtonText: 'Volver al inicio'
        }).then(() => {
            window.location.href = 'dashboard.html';
        });
        return;
    }

    // Limpiar filas anteriores
    const filasAntiguas = contenedor.querySelectorAll('.fila-transacciones');
    filasAntiguas.forEach(f => f.remove());

    // Ordenar y tomar las últimas 10
    const ultimas10 = transacciones
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 10);

    // Insertar cada fila
    ultimas10.forEach(tx => {
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

    // Rellenar datos del cliente
    document.querySelector('.nombre').textContent = usuarioActivo.nombre || '';
    document.querySelector('.tipoId').textContent = usuarioActivo.tipoId || '';
    document.querySelector('.identificacion').textContent = usuarioActivo.identificacion || '';
    document.querySelector('.cuenta').textContent = usuarioActivo.cuenta || '';
});

