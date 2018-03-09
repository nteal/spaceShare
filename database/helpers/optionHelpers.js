const { Gender } = require('../models/genderModel');
const { Planet } = require('../models/planetModel');
const { Personality } = require('../models/personalityModel');
const { Sleep } = require('../models/sleepModel');

const getGenderById = genderId => Gender.findByPrimary(genderId);
const getPlanetById = planetId => Planet.findByPrimary(planetId);
const getPersonalityById = personalityId => Personality.findByPrimary(personalityId);
const getSleepById = sleepId => Sleep.findByPrimary(sleepId);

const getGenders = () => Gender.findAll()
  .then(genderList => genderList.map(gender => gender.dataValues))
  .catch(err => console.log(err));

exports.getGenderById = getGenderById;
exports.getPlanetById = getPlanetById;
exports.getPersonalityById = getPersonalityById;
exports.getSleepById = getSleepById;
exports.getGenders = getGenders;
