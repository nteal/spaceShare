const { fillGenderOptions } = require('./genderOptions');
const { fillPlanetOptions } = require('./planetOptions');
const { fillPersonalityOptions } = require('./personalityOptions');
const { fillSleepOptions } = require('./sleepOptions');
const { fillPurposeOptions } = require('./purposeOptions');
const { fillTimelineOptions } = require('./timelineOptions');
const { fillPetOptions } = require('./petOptions');
const { fillSmokingOptions } = require('./smokingOptions');
const { findOrAddUsersAndSpaces } = require('./fakeUsers');

exports.fillTables = () => {
  return Promise.all([fillGenderOptions(),
    fillPlanetOptions(),
    fillPersonalityOptions(),
    fillSleepOptions(),
    fillPurposeOptions(),
    fillTimelineOptions(),
    fillPetOptions(),
    fillSmokingOptions(),
  ])
    .then(arr => findOrAddUsersAndSpaces())
    .catch(err => console.log(err));
};
