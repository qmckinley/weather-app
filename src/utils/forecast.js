const request = require('request');

const forecast = (long, lat, callback) => {
  const key = '132e425ff0ab07b9a1628ddf825b0780';
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather services.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const { summary } = body.daily
      const { temperatureHigh, temperatureLow } = body.daily.data[0]
      const { precipProbability, temperature, humidity, windSpeed, icon } = body.currently
      callback(undefined, {
        summary,
        temperatureHigh,
        temperatureLow,
        precipProbability,
        temperature,
        humidity,
        windSpeed,
        icon
      });
    };
  });
};

module.exports = forecast;