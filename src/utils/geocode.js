const request = require('request');

const geocode = (address, callback) => {
  const key = 'pk.eyJ1IjoicS1tY2tpbmxleSIsImEiOiJjandjcjc1cGwwNjE0NDRucDJscHMyOWhoIn0.nM7YCGugwFoM1XjR9ilpjw'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services.', undefined)
    } else if (body.features.length === 0) {
      callback('Could not find a match to your location. Try a different search.', undefined)
    } else {
      const { center, place_name } = body.features[0];
      const latitude = center[1];
      const longitude = center[0];
      callback(undefined, {
        latitude,
        longitude,
        location: place_name
      });
    };
  });
};

module.exports = geocode;