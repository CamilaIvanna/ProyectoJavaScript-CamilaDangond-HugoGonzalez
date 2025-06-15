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


const departamentoSelect = document.getElementById("departamento");
const ciudadSelect = document.getElementById("ciudad");

// Llenar departamentos
for (const departamento in dataColombia) {
  const option = document.createElement("option");
  option.value = departamento;
  option.textContent = departamento;
  departamentoSelect.appendChild(option);
}

// Al cambiar el departamento, actualizar las ciudades
departamentoSelect.addEventListener("change", () => {
  const ciudades = dataColombia[departamentoSelect.value] || [];

  // Limpiar ciudad
  ciudadSelect.innerHTML = '<option value=""></option>';

  // Agregar ciudades correspondientes
  ciudades.forEach(ciudad => {
    const option = document.createElement("option");
    option.value = ciudad;
    option.textContent = ciudad;
    ciudadSelect.appendChild(option);
  });
});
