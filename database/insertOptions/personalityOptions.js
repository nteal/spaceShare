const { Personality } = require('../models/personalityModel');

const personalityList = [
  { type: 'Introvert' },
  { type: 'Extrovert' },
];

const addPersonalities = () => Personality.bulkCreate(personalityList);

exports.fillPersonalityOptions = () => (
  // search for personalities
  Personality.findAll()
    // if already personalities, print them. else add them
    .then(personalities => (personalities.length ? console.log('personalities already populated') : addPersonalities()))
    .catch(err => console.log(err))
);
