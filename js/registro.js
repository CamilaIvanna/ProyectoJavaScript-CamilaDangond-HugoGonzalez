// Objeto que contiene los departamentos de Colombia con sus respectivas ciudades
const dataColombia = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro", "Apartadó", "Turbo"],
    "Arauca": ["Arauca", "Arauquita", "Saravena"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Galapa", "Sabanalarga"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"],
    "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Villamaría"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Puerto Rico"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Monterrey"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
    "Cesar": ["Valledupar", "Aguachica", "Codazzi"],
    "Chocó": ["Quibdó", "Istmina", "Tadó"],
    "Córdoba": ["Montería", "Lorica", "Sahagún", "Cereté"],
    "Cundinamarca": ["Soacha", "Zipaquirá", "Fusagasugá", "Girardot", "Chía"],
    "Guainía": ["Inírida"],
    "Guaviare": ["San José del Guaviare"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
    "Meta": ["Villavicencio", "Acacías", "Granada"],
    "Nariño": ["Pasto", "Ipiales", "Tumaco"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
    "Putumayo": ["Mocoa", "Puerto Asís"],
    "Quindío": ["Armenia", "Calarcá", "La Tebaida"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Giron", "Piedecuesta", "Barrancabermeja"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués"],
    "Tolima": ["Ibagué", "Espinal", "Melgar"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago"],
    "Vaupés": ["Mitú"],
    "Vichada": ["Puerto Carreño"]
};

// Referencias a elementos select del DOM
const departamentoSelect = document.getElementById("departamento");
const ciudadSelect = document.getElementById("ciudad");

// Cargar opciones de departamentos en el select
for (const departamento in dataColombia) {
    const option = document.createElement("option");
    option.value = departamento;
    option.textContent = departamento;
    departamentoSelect.appendChild(option);
}

// Evento: Actualiza ciudades según el departamento seleccionado
departamentoSelect.addEventListener("change", () => {
    const ciudades = dataColombia[departamentoSelect.value] || [];

    ciudadSelect.innerHTML = '<option value=""></option>'; // Limpiar select

    ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
    });
});

// Evento que se ejecuta una vez el DOM ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
    const registroBtn = document.querySelector(".b-registro");

    // Hashea una contraseña utilizando SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }

    // Genera un número de cuenta aleatorio de 10 dígitos no repetido
    function generarNumeroCuenta(usuarios) {
        let cuenta;
        do {
            cuenta = Math.floor(1000000000 + Math.random() * 9000000000);
        } while (usuarios.some(u => u.numeroCuenta === cuenta.toString()));
        return cuenta.toString();
    }

    // Verifica que todos los campos requeridos estén llenos
    function validarCamposRequeridos(campos) {
        for (const id of campos) {
            const input = document.getElementById(id);
            if (!input || !input.value.trim()) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo requerido',
                    text: 'Por favor completa todos los campos.',
                    confirmButtonColor: '#3085d6'
                });
                input.focus();
                return false;
            }
        }
        return true;
    }

    // Valida el formato del teléfono (10 dígitos)
    function validarTelefono(telefono) {
        if (!/^\d{10}$/.test(telefono)) {
            Swal.fire({
                icon: 'error',
                title: 'Teléfono inválido',
                text: 'Debe tener exactamente 10 dígitos numéricos.'
            });
            document.getElementById("telefono").focus();
            return false;
        }
        return true;
    }

    // Valida el formato del correo electrónico
    function validarEmail(email) {
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoValido.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo inválido',
                text: 'Ingresa un correo electrónico válido.'
            });
            document.getElementById("email").focus();
            return false;
        }
        return true;
    }

    // Verifica que la clave cumpla criterios de seguridad y coincida con la confirmación
    function validarClave(clave, confirmarClave) {
        const claveSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!claveSegura.test(clave)) {
            Swal.fire({
                icon: 'error',
                title: 'Clave insegura',
                html: 'Debe tener al menos 8 caracteres,<br>una mayúscula, una minúscula, un número y un símbolo.'
            });
            document.getElementById("psw").focus();
            return false;
        }

        if (clave !== confirmarClave) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Verifica que ambas sean iguales.'
            });
            document.getElementById("validar-psw").focus();
            return false;
        }

        return true;
    }

    // Evento: Al hacer clic en el botón de registro
    registroBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const campos = [
            "tipo-id", "identificacion", "name", "apellido",
            "telefono", "email", "departamento", "ciudad",
            "direccion", "genero", "psw", "validar-psw"
        ];

        if (!validarCamposRequeridos(campos)) return;

        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const clave = document.getElementById("psw").value.trim();
        const confirmarClave = document.getElementById("validar-psw").value.trim();
        const cedula = document.getElementById("identificacion").value.trim();

        if (!validarTelefono(telefono)) return;
        if (!validarEmail(email)) return;
        if (!validarClave(clave, confirmarClave)) return;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica si ya existe un usuario con la misma cédula
        const yaExiste = usuarios.some(usuario => usuario.identificacion === cedula);
        if (yaExiste) {
            Swal.fire({
                icon: 'warning',
                title: 'Usuario ya registrado',
                text: 'Ya existe un usuario con esa cédula.',
                confirmButtonColor: '#d33'
            });
            document.getElementById("identificacion").focus();
            return;
        }

        // Crear objeto de usuario con la información del formulario
        const numeroCuenta = generarNumeroCuenta(usuarios);
        const fechaCreacion = new Date().toISOString();
        const claveHash = await hashPassword(clave);

        const datosRegistro = {
            tipoId: document.getElementById("tipo-id").value,
            identificacion: cedula,
            nombres: document.getElementById("name").value,
            apellidos: document.getElementById("apellido").value,
            telefono: telefono,
            email: email,
            departamento: document.getElementById("departamento").value,
            ciudad: document.getElementById("ciudad").value,
            direccion: document.getElementById("direccion").value,
            genero: document.getElementById("genero").value,
            clave: claveHash,
            numeroCuenta: numeroCuenta,
            fechaCreacion: fechaCreacion,
            saldo: 0
        };

        // Guardar usuario en localStorage
        usuarios.push(datosRegistro);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Mostrar confirmación de registro
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            html: `
                <p><b>Nombre:</b> ${datosRegistro.nombres} ${datosRegistro.apellidos}</p>
                <p><b>Número de cuenta:</b> ${datosRegistro.numeroCuenta}</p>
                <p><b>Saldo inicial:</b> $0</p>
                <p><b>Fecha de creación:</b> ${new Date(fechaCreacion).toLocaleString()}</p>
                <br>
                <a href="/index.html" style="color:rgb(86, 149, 230); text-decoration: underline;
                font-family: Montserrat, sans-serif; font-weight: bold; font-size: 1.2rem;">Iniciar sesión</a>
            `,
            showConfirmButton: false
        });

        // Limpiar formulario
        document.querySelector("form").reset();
        document.getElementById("tipo-id").selectedIndex = 0;
        document.getElementById("departamento").selectedIndex = 0;
        document.getElementById("ciudad").selectedIndex = 0;
        document.getElementById("genero").selectedIndex = 0;
    });
});
