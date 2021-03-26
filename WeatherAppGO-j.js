function formatDate(timestamp) {
 let date = new Date(timestamp);
   let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

  let day = days[date.getDay()];
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
  let month = months[date.getMonth()]; 
  let year = date.getFullYear();
  let number = date.getDate();
 
 return `Last updated on: ${day}, ${month} ${number}, ${year} at ${formatHours(timestamp)}`;
}

  function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
}
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }

  return '${hours}:${minutes}';
}


//Current Weather
let button = document.querySelector("#currently");

function currentWeather(response) {
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#degree").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
  toCelsius = response.data.main.temp;
    
let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

 let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}


function displayForecast(response) {
 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = null;
 let forecast = null;
 
 for (let index = 0; index < 3; index++) { 
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
<div class="col-4">
<h4>
 $formatHours(forecast.dt * 1000)}
</h4>
<img
 src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
 />
 <div class="weather-forecast-temperature">
 <strong>
  ${Math.round(forecast.main.temp_max)}°
 </strong>
  ${Math.round(forecast.main.temp_min)}°;
  </div>
 </div> 
';
}
}

function enterCity(city) {
 let apiKey = "f8250d81f6e1cec8e34d3029054ab81a";
 let units = "metric";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(currentWeather); 
 
 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  enterCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function searchCurrent(position) {
  console.log(position);
  let apiKey = "f8250d81f6e1cec8e34d3029054ab81a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(currentWeather); 

}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}
 
function convertToFahrenheit(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let toFahrenheit = (toCelsius*9)/5+32;
  degreeElement.innerHTML = Math.round(toFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = Math.round(toCelsius);  
}

let toCelsius = null;

let currentWeatherButton = document.querySelector("#current-weather-button");
currentWeatherButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Default City
enterCity("Vancouver");

