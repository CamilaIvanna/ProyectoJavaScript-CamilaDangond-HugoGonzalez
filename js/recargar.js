const listaBancosColombia = [
  "Bancolombia",
  "Banco de Bogotá",
  "Banco Davivienda",
  "Banco Popular",
  "Banco de Occidente",
  "Banco Agrario",
  "Banco AV Villas",
  "Banco Caja Social",
  "Banco Itaú",
  "Scotiabank Colpatria",
  "Banco GNB Sudameris",
  "Banco BBVA Colombia",
  "Banco Pichincha",
  "Banco Falabella",
  "Banco Finandina",
  "Banco W",
  "Banco Serfinanza",
  "Coomeva Financiera",
  "Banco Coopcentral",
  "Nequi",
  "Daviplata",
  "Movii",
  "Lulo Bank",
  "RappiPay",
  "Nu Colombia"
];

const bancoSelect = document.getElementById("banco");

listaBancosColombia.forEach(nombreBanco => {
    const option = document.createElement("option");
    option.value = nombreBanco;
    option.textContent = nombreBanco;
    bancoSelect.appendChild(option);
});

<<<<<<< HEAD
    document.addEventListener("DOMContentLoaded", () => {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuario) {
        const cuentaElemento = document.querySelector(".cuenta");
        if (cuentaElemento) {
            cuentaElemento.textContent = usuario.numeroCuenta;
        }
        }
    });
function generarReferencia() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

function recargar() {
    const banco = document.getElementById('banco').value.trim();
    const valor = parseFloat(document.getElementById('valor').value.trim());

    if (!banco || isNaN(valor) || valor <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos correctamente.'
        });
        return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!usuarioActivo || !usuarioActivo.numeroCuenta) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el usuario activo.'
        });
        return;
    }

    const numeroCuenta = usuarioActivo.numeroCuenta;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.numeroCuenta === numeroCuenta);

    if (index === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario activo no encontrado en la base de datos.'
        });
        return;
    }

    usuarios[index].saldo += valor;

    const transaccion = {
        fecha: new Date().toISOString(),
        referencia: generarReferencia(),
        tipo: "consignación",
        concepto: "Consignación por canal electrónico",
        valor: valor
    };

    if (!usuarios[index].transacciones) {
        usuarios[index].transacciones = [];
    }
    usuarios[index].transacciones.push(transaccion);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));

    // Mostrar alerta SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'Recarga exitosa',
        html: `
            <p><b>Referencia:</b> ${transaccion.referencia}</p>
            <p><b>Nuevo saldo:</b> $${usuarios[index].saldo.toFixed(2)}</p>
        `,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Redirigir después de cerrar el mensaje
        location.href = "/html/dashboard.html";
    });
}
