const form = document.querySelector('form');
const feelsLikeDiv = document.querySelector('.feels-like');
const humidityDiv = document.querySelector('.humidity');
const pressureDiv = document.querySelector('.pressure');
const windSpeedDiv = document.querySelector('.wind-speed');
const descriptionDiv = document.querySelector('.description');
const nameDiv = document.querySelector('.name');
const tempDiv = document.querySelector('.temp');

form.addEventListener('submit', main);

function main(event) {
  event.preventDefault();
  const city = document.querySelector('#search').value;
  const link = prepareLink(city);
  fetchData(link);
}

function prepareLink(city) {
  const appid = 'd9b40f8f7249d3aa1da723782d44d61d';
  const link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
  return link;
}

async function fetchData(link) {
  try {
    const response = await fetch(link);
    const data = await response.json();
    updateDOM(data);
  } 
  catch (err) {
    console.log(err);
  }
}

function updateDOM(data) {
  console.log(data);
  const description = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const feelsLike = KtoC(data.main.feels_like); 
  const temp = KtoC(data.main.temp)
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const name = data.name;
  feelsLikeDiv.innerHTML = feelsLike + " &deg;C";
  pressureDiv.textContent = pressure + " bar";
  humidityDiv.textContent = humidity + " %";
  windSpeedDiv.textContent = windSpeed + " km/h";
  descriptionDiv.textContent = description;
  nameDiv.textContent = name;
  tempDiv.innerHTML = temp + " &deg;C";
}

function KtoC(temp) {
  temp = Number(temp);
  const tempC = temp - 273.15;
  return Math.round(tempC);
}

function init() {
  const city = "Agra";
  const link = prepareLink(city);
  fetchData(link);
}

init();
