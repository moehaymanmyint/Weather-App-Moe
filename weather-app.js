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

function displayForecast(forecastData) {
  let forecast = document.querySelector("#weather-forecast");
  let forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Short day names
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (data, index) {
    let day = forecastDay[index]; // Get the short day name based on the index
    let iconUrl = data.condition.icon_url;
    let minTemp = Math.round(data.temperature.minimum);
    let maxTemp = Math.round(data.temperature.maximum);

    forecastHTML += `
      <div class="col">
        <div class="card-body">
          <h5 class="card-title"><strong>${day}</strong></h5>
          <p class="card-icon">
            <img src="${iconUrl}" alt="" width="50" />
          </p>
          <p class="card-temperature"><strong>${maxTemp}° ${minTemp}°</strong></p>
        </div>
      </div>`;
  });

  forecastHTML += `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemperature(response) {
    celsiusTemp = response.data.temperature.current;
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#tempNumber").innerHTML = Math.round(celsiusTemp);
    document.querySelector("#description").innerHTML = response.data.condition.description.charAt(0).toUpperCase() + response.data.condition.description.slice(1);
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#date-time").innerHTML = formatDate(response.data.time * 1000);
    document.querySelector("#icon").setAttribute("src", response.data.condition.icon_url);

    // Fetch the forecast weather data using the SheCodes API
    getForecast(response.data.city);
  }

  function search(city) {
    let apiKey = "03aa5321feb0a48eoca7a4tede1f2bb1";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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

  function getForecast(city) {
  let apiKey = "03aa5321feb0a48eoca7a4tede1f2bb1";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(forecastApiUrl)
    .then(function (response) {
      let forecastData = response.data.daily;
      displayForecast(forecastData); // Pass the forecastData to displayForecast function
    })
    .catch(function (error) {
      console.log(error);
    });
}


  function showCurrent(position) {
    let apiKey = "03aa5321feb0a48eoca7a4tede1f2bb1";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrent);
  }

  let currentButton = document.querySelector("#currentButton");
  currentButton.addEventListener("click", getCurrentLocation);

  function showFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#tempNumber");
    let fahrenheitTemperature = (celsiusTemp * 9/5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function showCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#tempNumber");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", showFahrenheitTemp);

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showCelsiusTemp);

  let celsiusTemp = null;
