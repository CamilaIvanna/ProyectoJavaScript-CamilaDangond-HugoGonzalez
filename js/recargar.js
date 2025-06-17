// Lista de bancos en Colombia, incluyendo entidades tradicionales y digitales
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

// Referencia al elemento <select> con id="banco"
const bancoSelect = document.getElementById("banco");

// Itera sobre la lista de bancos y los agrega como opciones en el select
listaBancosColombia.forEach(nombreBanco => {
  const option = document.createElement("option"); // Crea una nueva opción
  option.value = nombreBanco;                     // Establece el valor
  option.textContent = nombreBanco;               // Establece el texto visible
  bancoSelect.appendChild(option);                // Añade la opción al select
});
