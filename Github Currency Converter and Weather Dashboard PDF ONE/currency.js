const API_KEY = "c5a1fa32b0f8ca2b0d63d311"; // Replace with your ExchangeRate-API key

async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();
    return data.conversion_rates[toCurrency];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (isNaN(amount)) {
    document.getElementById("result").innerHTML =
      "Please enter a valid amount.";
    return;
  }

  const rate = await getExchangeRate(fromCurrency, toCurrency);
  if (rate) {
    const result = amount * rate;
    document.getElementById(
      "result"
    ).innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(
      2
    )} ${toCurrency}`;
  } else {
    document.getElementById("result").innerHTML = "Conversion failed.";
  }
}

async function populateCurrencies() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`
    );
    const data = await response.json();
    const currencies = data.supported_codes;

    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    currencies.forEach(([code, name]) => {
      fromSelect.add(new Option(`${code} - ${name}`, code));
      toSelect.add(new Option(`${code} - ${name}`, code));
    });
  } catch (error) {
    console.error("Error fetching currencies:", error);
  }
}

populateCurrencies();

document
  .getElementById("convertBtn")
  .addEventListener("click", convertCurrency);
