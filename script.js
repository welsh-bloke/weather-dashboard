const apiKey = 'c5f119e45d9aa12a529fdd40cba4ab20';

const mainSection = document.querySelector('#main');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#city-search');
const weatherCards = document.querySelector('#weather-cards');

const convert = (k) => {
  const c = k -273.15;
  return c.toFixed(2).toString()
}

mainSection.addEventListener('click', e => {
  if (e.target.id === 'search-button') {
    e.preventDefault;
    let city = searchInput.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
      .then(response => response.json())
      .then(cities => {
        let city = cities[0];
        let lat = city.lat;
        let lon = city.lon;
        console.log(city.name);

        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      }
    )
      .then(response => response.json())
      .then(data => {

        const list = data.list;
        const today = list[0];
        const forecast = [list[8], list[16], list[24], list[32], list[39]];

        for (let i = 0; i < forecast.length; i++) {
          console.log(forecast[i]);
          const d = new Date(forecast[i].dt_txt);

          const card = document.createElement('div');
          card.className = 'card';

          const cardBody = document.createElement('div');
          cardBody.className = 'card-body';
          card.append(cardBody)

          const forecastDate = document.createElement('h5');
          forecastDate.className = 'forecast-date';
          forecastDate.append(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`);
          cardBody.append(forecastDate);

          const weatherIcon = document.createElement('img');
          weatherIcon.className = 'weather-icon';
          weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png`);
          cardBody.append(weatherIcon);

          const temp = document.createElement('p');
          temp.className = 'temp';
          temp.append('Temp ' + convert(forecast[i].main.temp) +' \xB0C');
          cardBody.append(temp);

          const wind = document.createElement('p');
          wind.className = 'wind';
          wind.append('Wind ' + forecast[i].wind.speed);
          cardBody.append(wind);

          const hum = document.createElement('p');
          hum.className = 'hum';
          hum.append('Humidity ' + forecast[i].main.humidity);
          cardBody.append(hum);

          weatherCards.append(card);
        }
      }
    )
  }
});
