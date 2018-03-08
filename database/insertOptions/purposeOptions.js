const { Purpose } = require('../models/purposeModel');

const purposeList = [
  { type: 'Work' },
  { type: 'Live' },
];

const populatePurpose = () => Purpose.bulkCreate(purposeList);

exports.fillPurposeOptions = () => (
  // search for Purposes
  Purpose.findAll()
    // if already Purposes, print them. else add them
    .then(purposeOptions => (purposeOptions.length ? console.log('purpose is already populated') : populatePurpose()))
    .catch(err => console.log(err))
);
