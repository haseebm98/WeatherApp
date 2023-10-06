// clock script

function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let session = "AM";

  if(hh == 0){
      hh = 12;
  }

  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
    
   let time = hh + ":" + mm + " " + session;
   let monthDate = day + "/" + month + "/" + year;

  document.getElementById("clock").innerText = time; 
  document.getElementById("date").innerText = monthDate;

  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();

// weather api script

function getWeatherData(location) {
    const apiKey = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherData = {
          temperature: data.main.temp,
          condition: data.weather[0].main,
          location: data.name,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          timezone: data.timezone,
        };
        return weatherData;
      });
}

function updateApp(weatherData) {
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const location = document.getElementById('location');
    const tempMax = document.getElementById('temp-max');
    const tempMin = document.getElementById('temp-min');
    const zone = document.getElementById('timezone');

    const clouds = document.querySelector(".fa-cloud");
    const clear = document.querySelector(".fa-moon");
    const rain = document.querySelector(".fa-cloud-showers-heavy");
    const thunder = document.querySelector(".fa-cloud-bolt");
  
  
    temperature.textContent = `${weatherData.temperature.toPrecision(2)}°C`;
    condition.textContent = `${weatherData.condition}`;
    location.textContent = weatherData.location;
    tempMax.textContent = `Max Temperature: ${weatherData.maxTemp.toPrecision(2)}°C`;
    tempMin.textContent = `Min Temperature: ${weatherData.minTemp.toPrecision(2)}°C`;
    zone.textContent = `(+ ${weatherData.timezone/3600} UTC)`;

    if (zone.textContent === "(+ 1 UTC)") {
      zone.textContent = `(+ 0 UTC)`
    }

    if (condition.textContent === "Clouds") {
      clouds.style.display = 'block';
    } if (condition.textContent === "Clear") {
      clear.style.display = 'block';
    } if (condition.textContent === "Rain") {
      rain.style.display = 'block';
    } if (condition.textContent === "Thunderstorm") {
      thunder.style.display = 'block';
    }
  }

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

searchBtn.addEventListener("click", () => {
  const location = searchInput.value;
  getWeatherData(location)
    .then(weatherData => {
      updateApp(weatherData);
    })
    .catch(error => {
      console.log(error);
    });
});
