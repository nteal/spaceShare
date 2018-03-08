const { Smoking } = require('../models/smokingModel');

const smokingList = [
  { location: 'Outside is fine' },
  { location: 'Anywhere is fine' },
  { location: 'Absolutely not' },
];

const populateSmoking = () => Smoking.bulkCreate(smokingList);

exports.fillSmokingOptions = () => (
  // search for Smokings
  Smoking.findAll()
    // if already Smokings, print them. else add them
    .then(smokingOptions => (smokingOptions.length ? console.log('Smoking is already populated') : populateSmoking()))
    .catch(err => console.log(err))
);
