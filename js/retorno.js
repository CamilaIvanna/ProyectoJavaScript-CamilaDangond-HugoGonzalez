document.addEventListener('DOMContentLoaded', function () {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    const enIndex = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';

    if (!usuario && !enIndex) {
        // Guarda la URL original para volver después del login
        sessionStorage.setItem('urlDestino', window.location.href);

        // Redirige al login
        window.location.href = '/index.html';
    }
});

// Detecta cierre de sesión en otra pestaña
window.addEventListener('storage', function (event) {
    if (event.key === 'usuarioActivo' && event.newValue === null) {
        window.location.replace('/index.html');
    }
});
