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

