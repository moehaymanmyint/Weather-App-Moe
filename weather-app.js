function formatDate(times){
  let date = new Date (times);
  let hours = date.getHours();
  if(hours < 10){
    hours = `0${hours}`
  }
  let minutes = date.getMinutes();
  if(minutes < 10){
    minutes = `0${minutes}`
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let dates = date.getDate();

  return `${day} <br> ${month} ${dates} | ${hours}:${minutes}`;

}

function showTemperature (response){
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempNumber").innerHTML = Math.round(response.data.main.temp);
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



