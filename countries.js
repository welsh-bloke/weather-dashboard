const apiKey = '6fcefb7d81fa4156b65348276b06228a';
let countryName = 'United States Of America'

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(response => response.json())
  .then(data => {
    let countryCode = data[0].cca2;

    console.log(countryCode);

    return fetch(`https://newsapi.org/v2/top-headlines/sources?country=${countryCode}&apiKey=${apiKey}`);
  }
)
.then(response => response.json())
.then(data => {
  console.log(data)
});
