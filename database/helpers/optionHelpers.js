const { Gender } = require('../models/genderModel');
const { Planet } = require('../models/planetModel');
const { Personality } = require('../models/personalityModel');
const { Sleep } = require('../models/sleepModel');

const getGenderById = genderId => Gender.findByPrimary(genderId);
const getPlanetById = planetId => Planet.findByPrimary(planetId);
const getPersonalityById = personalityId => Personality.findByPrimary(personalityId);
const getSleepById = sleepId => Sleep.findByPrimary(sleepId);

const getGenderOptions = () => Gender.findAll()
  .then(genders => genders.map(gender => gender.dataValues))
  .catch(err => console.log(err));

const getPlanetOptions = () => Planet.findAll()
  .then(planets => planets.map(planet => planet.dataValues))
  .catch(err => console.log(err));

const getSleepOptions = () => Sleep.findAll()
  .then(sleepArray => sleepArray.map(sleep => sleep.dataValues))
  .catch(err => console.log(err));

exports.getGenderById = getGenderById;
exports.getPlanetById = getPlanetById;
exports.getPersonalityById = getPersonalityById;
exports.getSleepById = getSleepById;
exports.getGenderOptions = getGenderOptions;
exports.getPlanetOptions = getPlanetOptions;
exports.getSleepOptions = getSleepOptions;
