function formatDate(times){
  let date = new Date (times);
  let hours = date.getHours();
  if(hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes < 10){
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let dates = date.getDate();

  return `${day} <br> ${month} ${dates} | ${hours}:${minutes}`;
}

function showTemperature (response){
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempNumber").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#date-time").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

let submit = document.querySelector("#submitControl");
submit.addEventListener("submit", showCity);

let searchInput = document.querySelector("#search-city-text");
searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    showCity(event);
  }
});

search("Yangon");

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

function showFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  let fahrenheitTemperature = (celsiusTemp * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;



