const { Gender } = require('./prefils/genderModel');
const { Personality } = require('./prefils/personalityModel');
const { Pet } = require('./prefils/petModel');
const { Purpose } = require('./prefils/purposeModel');
const { Sleep } = require('./prefils/sleepModel');
const { Smoking } = require('./prefils/smokingModel');
const { Timeline } = require('./prefils/timelineModel');

Gender.sync();
Personality.sync();
Pet.sync();
Purpose.sync();
Sleep.sync();
Smoking.sync();
Timeline.sync();
