const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Q.McKinley'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Q.McKinley'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Q.McKinley',
    message: 'This is an example help message'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search address'
    });
  };
  const { address } = req.query;
  geocode(address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    };
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      };
      res.send({
        location,
        forecast: forecastData,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Response',
    name: 'Q.McKinley',
    message: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Response',
    name: 'Q.McKinley',
    message: 'Page Not Found'
  });
});

//
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});