const { Planet } = require('../models/planetModel');

exports.fillPlanetOptions = () => (
  Planet.bulkCreate([
    { name: 'Murcery' },
    { name: 'Venus' },
    { name: 'Earth' },
    { name: 'Mars' },
    { name: 'Jupiter' },
    { name: 'Saturn' },
    { name: 'Uranus' },
    { name: 'Neptune' },
    { name: 'Pluto' },
  ])
);
