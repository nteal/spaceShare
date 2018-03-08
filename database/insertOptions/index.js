const { fillGenderOptions } = require('./genderOptions');
const { fillPlanetOptions } = require('./planetOptions');
const { fillPersonalityOptions } = require('./personalityOptions');

exports.fillTables = () => {
  fillGenderOptions();
  fillPlanetOptions();
  fillPersonalityOptions();
};
