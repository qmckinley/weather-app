const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const loading = document.querySelector('#loading');
const loc = document.querySelector('#loc');
const currently = document.querySelector('#currently');
const cTemp = document.querySelector('#cTemp');
const cSum = document.querySelector('#cSum');
const dHighLow = document.querySelector('#dHighLow');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const rain = document.querySelector('#rain');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  loading.textContent = 'Loading...';
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        loading.textContent = data.error
      } else {
        const { location } = data;
        const { temperature, precipProbability, humidity, summary, windSpeed, temperatureHigh, temperatureLow } = data.forecast;
        loading.textContent = '';
        loc.textContent = `${location}`;
        currently.textContent = 'Right Now'
        cTemp.textContent = `${temperature}° Fahrenheit`
        wind.textContent = `Wind ${windSpeed}/mph`
        humidity.textContent = `Humidity ${humidity}`
        rain.textContent = `${precipProbability}% Chance Of Rain`
        dHighLow.textContent = `H ${temperatureHigh}° / L ${temperatureLow}°`
        cSum.textContent = summary
      };
    });
  });
});