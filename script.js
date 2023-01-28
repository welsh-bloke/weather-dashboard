const apiKey = 'c5f119e45d9aa12a529fdd40cba4ab20';
let city = 'London';

const todaysForecastUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

let lattitude = null;

fetch(todaysForecastUrl)
  .then(response => response.json())
  .then(cities => {
    let city = cities[0];
    let lat = city.lat;
    let lon = city.lon;

    console.log(lat);

    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
