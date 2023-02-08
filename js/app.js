const criptocoinsSelect = document.querySelector("#criptocoins");
const coinSelect = document.querySelector("#coin");
const form = document.querySelector("#form");
const result = document.querySelector("#result");

// Select values
const searcherObj = {
  coin: "",
  criptocoin: "",
};

// Create promise
const getCriptocoins = (criptocoins) =>
  new Promise((resolve) => {
    resolve(criptocoins);
  });

document.addEventListener("DOMContentLoaded", () => {
  quoteCriptocoins();

  form.addEventListener("submit", submitForm);

  criptocoinsSelect.addEventListener("change", readValue);
  coinSelect.addEventListener("change", readValue);
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

function readValue(e) {
  searcherObj[e.target.name] = e.target.value;
}

function showAlert(message) {
  const alertFound = document.querySelector(".error");

  if (!alertFound) {
    const alert = document.createElement("P");
    alert.classList.add("error");
    alert.textContent = message;

    form.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function submitForm(e) {
  e.preventDefault();
  console.log(searcherObj);

  // validate
  const { coin, criptocoin } = searcherObj;

  if (!coin || !criptocoin) return showAlert("Both fields are required!");

  // call api
  callAPI();
}

function callAPI() {
  const { coin, criptocoin } = searcherObj;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`;

  showSpinner();

  fetch(url)
    .then((res) => res.json())
    .then((data) => showQuote(data.DISPLAY[criptocoin][coin]));
}

function showQuote(quote) {
  cleanHTML();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quote;

  const price = document.createElement("P");
  price.classList.add("price");
  price.innerHTML = `Price: <span>${PRICE}</span>`;

  const highDay = document.createElement("P");
  highDay.innerHTML = `Higher Price: <span>${HIGHDAY}</span>`;

  const lowDay = document.createElement("P");
  lowDay.innerHTML = `Lower Price: <span>${LOWDAY}</span>`;

  const lastHours = document.createElement("P");
  lastHours.innerHTML = `Variation Last Hours: <span>${CHANGEPCT24HOUR}%</span>`;

  const lastUpdate = document.createElement("P");
  lastUpdate.innerHTML = `Last Update: <span>${LASTUPDATE}</span>`;

  result.appendChild(price);
  result.appendChild(highDay);
  result.appendChild(lowDay);
  result.appendChild(lastHours);
  result.appendChild(lastUpdate);
}

function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.lastChild);
  }
}

function showSpinner() {
  cleanHTML();

  const spinner = document.createElement("DIV");
  const dot1 = document.createElement("DIV");
  const dot2 = document.createElement("DIV");

  spinner.classList.add("spinner");
  dot1.classList.add("dot1");
  dot2.classList.add("dot2");

  spinner.appendChild(dot1);
  spinner.appendChild(dot2);

  result.appendChild(spinner);
}
