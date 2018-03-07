const { fillGenderOptions } = require('./genderOptions');
const { fillPlanetOptions } = require('./planetOptions');

exports.fillTables = () => {
  fillGenderOptions();
  fillPlanetOptions();
};
