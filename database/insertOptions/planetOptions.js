const { Planet } = require('../models/planetModel');

const planetList = [
  { name: 'Murcery' },
  { name: 'Venus' },
  { name: 'Earth' },
  { name: 'Mars' },
  { name: 'Jupiter' },
  { name: 'Saturn' },
  { name: 'Uranus' },
  { name: 'Neptune' },
  { name: 'Pluto' },
];

const populatePlanets = () => Planet.bulkCreate(planetList);

exports.fillPlanetOptions = () => (
  // search for planets
  Planet.findAll()
    // if already planets, print them. else add them
    .then(planets => (planets.length ? console.log('planets already populated') : populatePlanets()))
    .catch(err => console.log(err))
);
