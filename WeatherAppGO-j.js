function formatDate (timestamp) {
 let date = new Date (timestamp);
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

  let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
}
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }

  return `Last updated on: ${day}, ${month} ${number}, ${year} at ${hours}:${minutes}`;
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
  
    
let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

 let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  toCelsius = response.data.main.temp;
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let toFahrenheit = (toCelsius*9)/5+32;
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(toFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
   fahrenheitLink.classList.remove("active");
   celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(toCelsius);  
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

