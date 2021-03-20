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

  let dayIndex = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[monthIndex];
  let year = date.getYear();
  
  return `${date}`;
}

function currentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt*1000);
}

function enterCity(city) {
 let apiKey = "f8250d81f6e1cec8e34d3029054ab81a";
 let units = "metric";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(currentWeather); 
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  enterCity(city);
}

function searchCurrent(position) {
  let apiKey = "f8250d81f6e1cec8e34d3029054ab81a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(currentWeather); 
}

function getNewLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}
  
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = currentWeather((degree * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = currentWeather(degree);  
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentWeatherButton=document.querySelector("#current-weather-button");
currentWeatherButton.addEventListener("click", getNewLocation);

enterCity("Vancouver");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
