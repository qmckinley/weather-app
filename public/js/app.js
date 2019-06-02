const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        const { location, forecast } = data;
        const { temperature, precipProbability, humidity } = data.forecast;
        messageOne.textContent = location
        messageTwo.textContent = forecast.dailySummary
        messageThree.textContent = `It is currently ${temperature} degrees fahrenheit. With a ${precipProbability}% chance of rain, and a humitidy level of ${humidity}.`
      };
    });
  });
});