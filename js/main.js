var city = document.querySelector("#city");
var search = document.querySelector("#Search");
var Btn = document.querySelector("#searchBtn");
var day = document.querySelector(".day");
var month = document.querySelector("#month");

var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#windSpeed");
var windDirection = document.querySelector("#windDirection");


async function getWeather(city) {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=931d4789cc8c4b189df134233231108&q=${city}&days=3`);
  var data = await response.json();

  console.log("data=", data);
  document.getElementById("city").innerHTML = data.location.name;

  document.querySelector(".temp").innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  document.querySelector(".tommorow .temp").innerHTML = data.forecast.forecastday[1].day.avgtemp_c;
  document.querySelector(".after .temp").innerHTML = data.forecast.forecastday[2].day.avgtemp_c;


  document.querySelector(".icon").innerHTML = `<img src="${data.forecast.forecastday[0].day.condition.icon}" alt="" />`;
  document.querySelector(".tommorow .icon").innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" />`;
  document.querySelector(".after .icon").innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" />`;


  document.querySelector(".condition").innerHTML =data.forecast.forecastday[0].day.condition.text;
  document.querySelector(".tommorow .condition").innerHTML =data.forecast.forecastday[1].day.condition.text;
  document.querySelector(".after .condition").innerHTML =data.forecast.forecastday[2].day.condition.text;

  var today = new Date(); 
  var tomorrow = new Date(today); 
  tomorrow.setDate(today.getDate() + 1); 
  
  var afterTomorrow = new Date(today); 
  afterTomorrow.setDate(today.getDate() + 2); 
  
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  document.querySelector(".day").innerHTML = days[today.getDay()]; 
  document.getElementById("month").innerHTML = today.getDate() + " " + months[today.getMonth()];
  document.querySelector(".tommorow .day").innerHTML = days[tomorrow.getDay()]; // Set tomorrow's day
  document.querySelector(".after .day").innerHTML = days[afterTomorrow.getDay()]; // Set the day after tomorrow's day

  document.getElementById("humidity").innerHTML =data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
  document.getElementById("windSpeed").innerHTML =data.forecast.forecastday[0].day.maxwind_kph + "km/h";
}

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        getWeather(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }
  
  window.addEventListener("load", () => {
    getCurrentLocation();
  });
  
  search.addEventListener("keyup", (city) => {
    getWeather(city.target.value);
  });

 