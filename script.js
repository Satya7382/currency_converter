const baseURL = "https://open.er-api.com/v6/latest/";
const selects = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");

for (let select of selects) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.textContent = currCode;
    if ((select.name === "from" && currCode === "USD") ||
        (select.name !== "from" && currCode === "INR")) {
      newOption.selected = true;
    }
    select.appendChild(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(selectEl) {
  let code = selectEl.value;
  let countryCode = countryList[code];
  let imgTag = selectEl.parentElement.querySelector("img");
  imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter a valid amount";
    return;
  }

  const fromCurrency = selects[0].value;
  const toCurrency = selects[1].value;

  try {
    const res = await fetch(`${baseURL}${fromCurrency}`);
    const data = await res.json();

    const rate = data.rates[toCurrency];
    const total = (rate * amount).toFixed(2);

    msg.textContent = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
  } catch (error) {
    msg.textContent = "Error fetching data.";
  }
});
