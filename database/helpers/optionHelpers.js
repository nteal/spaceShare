const { Gender } = require('../models/genderModel');
const { Planet } = require('../models/planetModel');
const { Personality } = require('../models/personalityModel');
const { Sleep } = require('../models/sleepModel');

const getGenderById = genderId => Gender.findByPrimary(genderId);
const getPlanetById = planetId => Planet.findByPrimary(planetId);

exports.getGenderById = getGenderById;
exports.getPlanetById = getPlanetById;
