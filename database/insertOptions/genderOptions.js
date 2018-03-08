const { Gender } = require('../models/genderModel');

const initialGenderOptions = [
  { self_identification: 'male' },
  { self_identification: 'female' },
];

const addGenders = () => (
  Gender.bulkCreate(initialGenderOptions)
);

exports.fillGenderOptions = () => (
  Gender.findAll()
    .then(genders => (genders.length ? console.log('genders already populated') : addGenders()))
    .catch(err => console.log(err))
);
