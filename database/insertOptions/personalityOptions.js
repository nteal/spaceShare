const { Personality } = require('../models/personalityModel');

exports.fillPersonalityOptions = () => (
  Personality.bulkCreate([
    { type: 'introvert' },
    { type: 'extrovert' },
  ])
);
