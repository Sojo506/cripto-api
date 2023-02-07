const criptocoinsSelect = document.querySelector("#criptocoins");

// Create promise
const getCriptocoins = (criptocoins) =>
  new Promise((resolve) => {
    resolve(criptocoins);
  });

document.addEventListener("DOMContentLoaded", () => {
  quoteCriptocoins();
});

function quoteCriptocoins() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
  fetch(url)
    .then((res) => res.json())
    .then((data) => getCriptocoins(data.Data))
    .then((criptocoins) => selectCriptocoins(criptocoins));
}

function selectCriptocoins(criptocoins) {
  criptocoins.forEach((cpt) => {
    const { FullName, Name } = cpt.CoinInfo;

    const option = document.createElement("option");
    option.textContent = FullName;
    option.value = Name;

    criptocoinsSelect.appendChild(option);
  });
}
