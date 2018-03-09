const { Gender } = require('../models/genderModel');
const { Planet } = require('../models/planetModel');
const { Personality } = require('../models/personalityModel');
const { Sleep } = require('../models/sleepModel');
// get option by id
const getGenderById = genderId => Gender.findByPrimary(genderId);
const getPlanetById = planetId => Planet.findByPrimary(planetId);
const getPersonalityById = personalityId => Personality.findByPrimary(personalityId);
const getSleepById = sleepId => Sleep.findByPrimary(sleepId);

// get all options
const getGenderOptions = () => Gender.findAll()
  .then(genders => genders.map(gender => gender.dataValues))
  .catch(err => console.log(err));

const getPlanetOptions = () => Planet.findAll()
  .then(planets => planets.map(planet => planet.dataValues))
  .catch(err => console.log(err));

const getPersonalityOptions = () => Personality.findAll()
  .then(personalities => personalities.map(personality => personality.dataValues))
  .catch(err => console.log(err));

const getSleepOptions = () => Sleep.findAll()
  .then(sleepArray => sleepArray.map(sleep => sleep.dataValues))
  .catch(err => console.log(err));

// get option by id
exports.getGenderById = getGenderById;
exports.getPlanetById = getPlanetById;
exports.getPersonalityById = getPersonalityById;
exports.getSleepById = getSleepById;
// get all options
exports.getGenderOptions = getGenderOptions;
exports.getPlanetOptions = getPlanetOptions;
exports.getPersonalityOptions = getPersonalityOptions;
exports.getSleepOptions = getSleepOptions;
