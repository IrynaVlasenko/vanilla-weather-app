let date = new Date();
// console.log(date);
// console.log(date.getDay());
// console.log(date.getHours());
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
// console.log(day);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
// console.log(date.getHours());
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
// console.log(date.getMinutes());
let currentDate = `${day} ${hours}:${minutes}`;
// console.log(currentDate);

let elementDate = document.querySelector("#today");
elementDate.innerHTML = currentDate;

function show(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  //   let thisTemp = Math.round(response.data.main.temp);
  //   console.log(thisTemp);
  //   let cityName = response.data.name;
  //   console.log(cityName);
  //   let displayTemp = document.querySelector("#temperature");
  //   displayTemp.innerHTML = `${thisTemp}`;
  //   let userCity = document.querySelector("#city");
  //   userCity.innerHTML = `${cityName}`;
}

function search(city) {
  let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(url);
  axios.get(url).then(show);
}

function showsearch(event) {
  event.preventDefault();
  //   let showText = document.querySelector("#search-text");
  //   let inputCity = document.querySelector("#city");
  //   inputCity.innerHTML = `${showText.value}`;

  let city = document.querySelector("#search-text").value;
  search(city);
}
let showCity = document.querySelector("#city-search");
showCity.addEventListener("submit", showsearch);
let clickButton = document.querySelector("#search-button");
clickButton.addEventListener("click", showsearch);
function changeTemp() {
  let ftemp = Math.round((temp * 9) / 5 + 32);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${ftemp}`;
}
let temp = 19;
let fahrenTemp = document.querySelector("#fahrenheit");
fahrenTemp.addEventListener("click", changeTemp);

function changeTempBack() {
  let degr = document.querySelector("#temperature");
  degr.innerHTML = `${temp}`;
}
let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeTempBack);

// Bonus point:
// function showTemperature(response) {
//   let temperature = Math.round(response.data.main.temp);
//   let city2 = response.data.name;

//   function cityLocationTemperature() {
//     let cityTemp = document.querySelector("#temperature");
//     cityTemp.innerHTML = `${temperature}`;
//     let location = document.querySelector("#city");
//     location.innerHTML = `${city2}`;
//   }

function currentPosition(position) {
  let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(show);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button2 = document.querySelector("#current-button");
button2.addEventListener("click", getCurrentLocation);
search("Texas");
