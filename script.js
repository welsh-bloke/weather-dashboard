const apiKey = 'c5f119e45d9aa12a529fdd40cba4ab20';

const mainSection = document.querySelector('#main');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#city-search');
const searchHistory = document.querySelector('#search-history');
const weatherCards = document.querySelector('#weather-cards');
const currentForecast = document.querySelector('#current-forecast');
//let historySearchButton = document.createElement('button');

const convert = (k) => {
  const c = k -273.15;
  return c.toFixed(2).toString();
}

const searchDuplicate = (city, arr) => {
  return arr.includes(city);
}

const capitalize = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
}

const citySearch = (e) => {
  if (searchButton.getAttribute('data-button') === 'submit') {
    e.preventDefault;
  }

  console.log(e.target.getAttribute('data-button'));

  currentForecast.innerHTML = '';
  weatherCards.innerHTML = '';
  currentForecast.classList.remove('d-none');
  searchHistory.innerHTML = '';
  searchHistory.classList.remove('d-none')

  // let city = '';
  // if (e.target.getAttribute('data-button') === 'submit') {
  //   city = searchInput.value;
  // } else {
  //   city = historySearchButton.getAttribute('data-searchTerm');
  // }

  let city = capitalize(searchInput.value);


  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(response => response.json())
    .then(cities => {
      let city = cities[0];
      let lat = city.lat;
      let lon = city.lon;

      console.log(city);

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    }
  )
    .then(response => response.json())
    .then(data => {

      const list = data.list;
      const today = list[0];
      const forecast = [list[7], list[15], list[23], list[31], list[39]];

      let cityName = document.createElement('p');
      cityName.classList.add('fs-4', 'me-2', 'd-inline')
      cityName.textContent = city + ': ';
      currentForecast.append(cityName);

      let d = new Date(list[0].dt_txt);
      let currentDate = document.createElement('span');
      currentDate.classList.add('fs-4')
      currentDate.append(`(${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()})`);
      currentForecast.append(currentDate);

      let weatherIcon = document.createElement('img');
      weatherIcon.className = 'current-weather-icon';
      weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${list[0].weather[0].icon}.png`);
      currentForecast.append(weatherIcon);

      let temp = document.createElement('p');
      temp.className = 'temp';
      temp.append('Temp ' + convert(list[0].main.temp) +' \xB0C');
      currentForecast.append(temp);

      let wind = document.createElement('p');
      wind.className = 'wind';
      wind.append('Wind ' + list[0].wind.speed);
      currentForecast.append(wind);

      let hum = document.createElement('p');
      hum.className = 'hum';
      hum.append('Humidity ' + list[0].main.humidity);
      currentForecast.append(hum);

      const heading = document.createElement('h4');
      heading.textContent = '5 Day Forecast:';
      weatherCards.append(heading);

      for (let i = 0; i < forecast.length; i++) {
        let d = new Date(forecast[i].dt_txt);

        const col = document.createElement('div');
        col.className = 'col-lg';

        const card = document.createElement('div');
        card.classList.add ('card', 'future-forecast', 'mb-3');
        col.append(card);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.append(cardBody);

        const forecastDate = document.createElement('h5');
        forecastDate.className = 'forecast-date';
        forecastDate.append(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
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

        weatherCards.append(col);

        searchInput.value = '';
      }

      let search = JSON.parse(localStorage.getItem("search") || "[]");
      // check if item is already in local storage
      if (!searchDuplicate(city, search)) {
        search.push(city);
        localStorage.setItem("search", JSON.stringify(search));
      }

      search.map(term => {
        let historySearchButton = document.createElement('button');
        historySearchButton.textContent = term;
        historySearchButton.classList.add('btn', 'btn-secondary', 'd-block', 'my-2', 'w-100', 'historyButton');
        historySearchButton.setAttribute('data-button', term);
        searchHistory.append(historySearchButton);
      });
    }
  )
}

searchHistory.addEventListener('click', e => {
  if (e.target.classList.contains('historyButton')) {
    citySearch(e);
  }
});

mainSection.addEventListener('click', e => {
  if (e.target.id === 'search-button') {
    citySearch(e);
    // e.preventDefault;

    // currentForecast.innerHTML = '';
    // weatherCards.innerHTML = '';
    // currentForecast.classList.remove('d-none');
    // searchHistory.classList.remove('d-none')

    // let city = searchInput.value;

    // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    //   .then(response => response.json())
    //   .then(cities => {
    //     let city = cities[0];
    //     let lat = city.lat;
    //     let lon = city.lon;

    //     return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    //   }
    // )
    //   .then(response => response.json())
    //   .then(data => {

    //     const list = data.list;
    //     const today = list[0];
    //     const forecast = [list[7], list[15], list[23], list[31], list[39]];

    //     let d = new Date(list[0].dt_txt);
    //     let currentDate = document.createElement('span');
    //     currentDate.classList.add('fs-4')
    //     currentDate.append(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
    //     currentForecast.append(currentDate);

    //     let weatherIcon = document.createElement('img');
    //     weatherIcon.className = 'current-weather-icon';
    //     weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${list[0].weather[0].icon}.png`);
    //     currentForecast.append(weatherIcon);

    //     let temp = document.createElement('p');
    //     temp.className = 'temp';
    //     temp.append('Temp ' + convert(list[0].main.temp) +' \xB0C');
    //     currentForecast.append(temp);

    //     let wind = document.createElement('p');
    //     wind.className = 'wind';
    //     wind.append('Wind ' + list[0].wind.speed);
    //     currentForecast.append(wind);

    //     let hum = document.createElement('p');
    //     hum.className = 'hum';
    //     hum.append('Humidity ' + list[0].main.humidity);
    //     currentForecast.append(hum);

    //     const heading = document.createElement('h4');
    //     heading.textContent = '5 Day Forecast:';
    //     weatherCards.append(heading);

    //     for (let i = 0; i < forecast.length; i++) {
    //       let d = new Date(forecast[i].dt_txt);

    //       const col = document.createElement('div');
    //       col.className = 'col-lg';

    //       const card = document.createElement('div');
    //       card.classList.add ('card', 'future-forecast', 'mb-3');
    //       col.append(card);

    //       const cardBody = document.createElement('div');
    //       cardBody.className = 'card-body';
    //       card.append(cardBody);

    //       const forecastDate = document.createElement('h5');
    //       forecastDate.className = 'forecast-date';
    //       forecastDate.append(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
    //       cardBody.append(forecastDate);

    //       const weatherIcon = document.createElement('img');
    //       weatherIcon.className = 'weather-icon';
    //       weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png`);
    //       cardBody.append(weatherIcon);

    //       const temp = document.createElement('p');
    //       temp.className = 'temp';
    //       temp.append('Temp ' + convert(forecast[i].main.temp) +' \xB0C');
    //       cardBody.append(temp);

    //       const wind = document.createElement('p');
    //       wind.className = 'wind';
    //       wind.append('Wind ' + forecast[i].wind.speed);
    //       cardBody.append(wind);

    //       const hum = document.createElement('p');
    //       hum.className = 'hum';
    //       hum.append('Humidity ' + forecast[i].main.humidity);
    //       cardBody.append(hum);

    //       weatherCards.append(col);

    //       searchInput.value = '';
    //     }

    //     let search = JSON.parse(localStorage.getItem("search") || "[]");
    //     // check if item is already in local storage
    //     if (!searchDuplicate(city, search)) {
    //       search.push(city);
    //       localStorage.setItem("search", JSON.stringify(search));
    //     }

    //     const history = localStorage.getItem('search');

    //     search.map(term => {
    //       let button = document.createElement('button');
    //       button.textContent = term;
    //       button.classList.add('btn', 'btn-secondary', 'd-block', 'my-2', 'w-100')
    //       searchHistory.append(button);
    //     })



    //     console.log(history);
    //   }
    // )
  }
});
