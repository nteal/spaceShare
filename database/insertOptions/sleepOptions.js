const { Sleep } = require('../models/sleepModel');

const sleepList = [
  { schedule: 'Early bird' },
  { schedule: 'Night owl' },
  { schedule: '' },
];

const populateSleep = () => Sleep.bulkCreate(sleepList);

exports.fillSleepOptions = () => (
  // search for Sleeps
  Sleep.findAll()
    // if already Sleeps, print them. else add them
    .then(sleepOptions => (sleepOptions.length ? console.log('Sleep is already populated') : populateSleep()))
    .catch(err => console.log(err))
);
