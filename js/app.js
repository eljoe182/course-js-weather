const form = document.querySelector("#formulario");
const displaySection = document.querySelector("#resultado");

function Spinner() {
  displaySection.innerHTML = "";
  const spinner = document.createElement("div");
  spinner.classList.add("sk-fading-circle");

  spinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  displaySection.appendChild(spinner);
}

function search(e) {
  e.preventDefault();
  const city = document.querySelector("#ciudad").value;
  const country = document.querySelector("#pais").value;

  if (city === "" || country === "") {
    showMessage("You must enter a city and a country");
    return;
  }

  getWeather(city, country);
}

const kelvinToCelsius = (kelvin) => parseInt(kelvin - 273.15);

function showWeather(data) {
  displaySection.innerHTML = "";

  const {
    main: { temp, temp_max, temp_min },
    name,
    sys: { country },
    weather,
  } = data;

  const { main } = weather[0];

  const countryTitle = document.createElement("p");
  countryTitle.classList.add("text-xl");
  countryTitle.innerHTML = `${name}, <small>${country}</small>`;

  const temperature = kelvinToCelsius(temp);
  const maxTemperature = kelvinToCelsius(temp_max);
  const minTemperature = kelvinToCelsius(temp_min);

  const infoTemperature = document.createElement("p");
  infoTemperature.innerHTML = `${temperature}°C`;
  infoTemperature.classList.add("font-bold", "text-6xl");

  const infoMaxTemperature = document.createElement("span");
  infoMaxTemperature.innerHTML = ` H:${maxTemperature}° `;
  infoMaxTemperature.classList.add("text-xl");

  const infoMinTemperature = document.createElement("span");
  infoMinTemperature.innerHTML = ` L:${minTemperature}° `;
  infoMinTemperature.classList.add("text-xl");

  const infoWeater = document.createElement("p");
  infoWeater.innerHTML = `${main}`;
  infoWeater.classList.add("text-xl");

  const displayContainer = document.createElement("div");
  displayContainer.classList.add("text-center", "text-white");

  displayContainer.appendChild(countryTitle);
  displayContainer.appendChild(infoTemperature);
  displayContainer.appendChild(infoWeater);
  infoMaxTemperature.appendChild(infoMinTemperature);
  displayContainer.appendChild(infoMaxTemperature);

  displaySection.appendChild(displayContainer);
}

function showMessage(message) {
  displaySection.innerHTML = "";
  form.reset();
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    "bg-red-500",
    "text-white",
    "text-center",
    "p-5"
  );
  messageContainer.innerHTML = `${message}`;
  displaySection.appendChild(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 2000);
}

function getWeather(city, country) {
  const apiKey = "2b8972fd022a5b9b016df47d1b0f2424";

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  Spinner();
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        showMessage(`${data.message} ${city}, ${country}`);
      } else {
        showWeather(data);
      }
    });
  form.reset();
}

window.addEventListener("load", () => {
  form.addEventListener("submit", search);
});
