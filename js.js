// function show(response) {
//   document.querySelector("#city").innerHTML = response.data.name;
//   document.querySelector("#temperature").innerHTML = Math.round(
//     response.data.main.temp
//   );
//   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//   document.querySelector("#wind").innerHTML = Math.round(
//     response.data.wind.speed
//   );
//   document.querySelector("#description").innerHTML =
//     response.data.weather[0].description;
// }
// function search(city) {
//   let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
//   let units = "metric";
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
//   console.log(url);
//   axios.get(url).then(show);
// }

// function showTemperature(response) {
//   let temperature = Math.round(response.data.main.temp);
//   let city2 = response.data.name;
// }

// function cityLocationTemperature() {
//   let cityTemp = document.querySelector("#temperature");
//   cityTemp.innerHTML = `${temperature}`;
//   let location = document.querySelector("#city");
//   location.innerHTML = `${city2}`;
// }
// // current temperature
// function currentPosition(position) {
//   let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
//   let units = "metric";
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(show);
// }
// function getCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(currentPosition);
// }

// let button2 = document.querySelector("#current-button");
// button2.addEventListener("click", getCurrentLocation);
// search("Texas");

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#today");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconeElement = document.querySelector("#icone");
  iconeElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showsearch(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-text");
  search(cityInputElement.value);
}

function changeTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function changeTempBack(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let clickButton = document.querySelector("#search-button");
clickButton.addEventListener("click", showsearch);

let showCity = document.querySelector("#city-search");
showCity.addEventListener("submit", showsearch);

let fahrenTemp = document.querySelector("#fahrenheit");
fahrenTemp.addEventListener("click", changeTemp);
search("Texas");

let celsTemp = document.querySelector("#celsius");
celsTemp.addEventListener("click", changeTempBack);
