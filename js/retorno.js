document.addEventListener('DOMContentLoaded', function () {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Evita redirigir si ya estás en index.html
    const enIndex = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';

    if (!usuario && !enIndex) {
        window.location.href = '/index.html';
    }
});

