const { fillGenderOptions } = require('./genderOptions');
const { fillPlanetOptions } = require('./planetOptions');
const { fillPersonalityOptions } = require('./personalityOptions');
const { fillSleepOptions } = require('./sleepOptions');
const { fillPurposeOptions } = require('./purposeOptions');
const { fillTimelineOptions } = require('./timelineOptions');
const { fillPetOptions } = require('./petOptions');
const { fillSmokingOptions } = require('./smokingOptions');

exports.fillTables = () => {
  fillGenderOptions();
  fillPlanetOptions();
  fillPersonalityOptions();
  fillSleepOptions();
  fillPurposeOptions();
  fillTimelineOptions();
  fillPetOptions();
  fillSmokingOptions();
};
