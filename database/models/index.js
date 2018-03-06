const { Gender } = require('./prefils/genderModel');
const { Personality } = require('./prefils/personalityModel');
const { Pet } = require('./prefils/petModel');
const { Purpose } = require('./prefils/purposeModel');
const { Sleep } = require('./prefils/sleepModel');
const { Smoking } = require('./prefils/smokingModel');
const { Timeline } = require('./prefils/timelineModel');
const { User } = require('./user/userModel');
const { OtherLink } = require('./user/otherLinkModel');
const { Search } = require('./user/searchModel');
const { Neighborhood } = require('./space/neighborhoodModel');
const { Image } = require('./space/imageModel');

Gender.sync();
Personality.sync();
Pet.sync();
Purpose.sync();
Sleep.sync();
Smoking.sync();
Timeline.sync();

// user and dependencies:
// make OtherLink wait for User table to finish being created
User.sync()
  .then(() => {
    OtherLink.sync();
  })
  .catch((err) => {
    console.log(err);
  });
Search.sync();

// space and dependencies
Neighborhood.sync();
Image.sync();
