const { Gender } = require('../models/genderModel');

exports.fillGenderOptions = () => (
  Gender.bulkCreate([
    { self_identification: 'male' },
    { self_identification: 'female' },
  ])
);
