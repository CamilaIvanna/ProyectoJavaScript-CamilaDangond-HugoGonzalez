// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Recupera el usuario activo del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Verifica si el usuario está en la página de inicio (login)
    const enIndex = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';

    // Si no hay usuario activo y no está en la página de login
    if (!usuario && !enIndex) {
        // Guarda la URL actual en sessionStorage para redirigir luego del login
        sessionStorage.setItem('urlDestino', window.location.href);

        // Redirige al login
        window.location.href = '/index.html';
    }
});

// Detecta si el usuario cerró sesión en otra pestaña
window.addEventListener('storage', function (event) {
    // Si el valor de 'usuarioActivo' ha sido eliminado (logout)
    if (event.key === 'usuarioActivo' && event.newValue === null) {
        // Redirige a la página de inicio (login)
        window.location.replace('/index.html');
    }
});
