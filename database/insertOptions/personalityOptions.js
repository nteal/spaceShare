const { Personality } = require('../models/personalityModel');

const personalityList = [
  { type: 'introvert' },
  { type: 'extrovert' },
];

const addPersonalities = () => (
  Personality.bulkCreate(personalityList)
);

exports.fillPersonalityOptions = () => (
  Personality.findAll()
    // if already personalities, print them. else add them
    .then(personalities => (personalities.length ? console.log('personalities already populated') : addPersonalities()))
    .catch(err => console.log(err))
);
