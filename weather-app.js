// to cahnge current date

let current = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[current.getMonth()];
let date = current.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[current.getDay()];
let hour = current.getHours();
let minute = current.getMinutes();

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} <br> ${month} ${date} | ${hour}:${minute}`;

function showTemperature (response){
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempNumber").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function search(city){
  let apiKey = "e91ccfbc281d8496f0d12992ca337a9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text").value;
  search(city);
}
let searchCity = document.querySelector("#search-city-icon");
searchCity.addEventListener("click", showCity);

function showCurrent(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e91ccfbc281d8496f0d12992ca337a9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);

search("Yangon");

//To change fahrenheit
function changeCtoF(event) {
  event.preventDefault();
  let temp = 17;
  let temperaure = document.querySelector("#tempNumber");
  let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);
  temperaure.innerHTML = fahrenheitTemp;
}

let changeF = document.querySelector("#fahrenheit");
changeF.addEventListener("click", changeCtoF);

//To change celsius
function changeFtoC(event) {
  event.preventDefault();
  let fahrenheitTemp = 63;
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let temperaure = document.querySelector("#tempNumber");
  temperaure.innerHTML = celsiusTemp;
}
let changeC = document.querySelector("#celsius");
changeC.addEventListener("click", changeFtoC);

