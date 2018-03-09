const { Gender } = require('../models/genderModel');
const { Planet } = require('../models/planetModel');
const { Personality } = require('../models/personalityModel');
const { Sleep } = require('../models/sleepModel');

const { Purpose } = require('../models/purposeModel');
const { Timeline } = require('../models/timelineModel');
const { Pet } = require('../models/petModel');
const { Smoking } = require('../models/smokingModel');

// get option by id
const getModelById = (model, id) => model.findByPrimary(id);

// get all options
const getOptions = model => model.findAll()
  .then(instances => instances.map(instance => instance.dataValues))
  .catch(err => console.log(err));
// get options by id
exports.getGenderById = getModelById.bind(null, Gender);
exports.getPlanetById = getModelById.bind(null, Planet);
exports.getPersonalityById = getModelById.bind(null, Personality);
exports.getSleepById = getModelById.bind(null, Sleep);

exports.getPurposeById = getModelById.bind(null, Purpose);
exports.getTimelineById = getModelById.bind(null, Timeline);
exports.getPetById = getModelById.bind(null, Pet);
exports.getSmokingById = getModelById.bind(null, Smoking);

// get all options
exports.getGenderOptions = getOptions.bind(null, Gender);
exports.getPlanetOptions = getOptions.bind(null, Planet);
exports.getPersonalityOptions = getOptions.bind(null, Personality);
exports.getSleepOptions = getOptions.bind(null, Sleep);

exports.getPurposeOptions = getOptions.bind(null, Purpose);
exports.getTimelineOptions = getOptions.bind(null, Timeline);
exports.getPetOptions = getOptions.bind(null, Pet);
exports.getSmokingOptions = getOptions.bind(null, Smoking);

