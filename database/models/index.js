const db = require('../sequelize').sequelize;
const { Gender } = require('./genderModel');
const { Personality } = require('./personalityModel');
const { Pet } = require('./petModel');
const { Purpose } = require('./purposeModel');
const { Sleep } = require('./sleepModel');
const { Smoking } = require('./smokingModel');
const { Timeline } = require('./timelineModel');
const { Planet } = require('./planetModel');
const { User } = require('./userModel');
const { OtherLink } = require('./otherLinkModel');
const { Search } = require('./searchModel');
const { Neighborhood } = require('./neighborhoodModel');
const { Image } = require('./imageModel');
const { Space } = require('./spaceModel');
const { Todo } = require('./todoModel');
const { Amenity } = require('./amenityModel');
const { UserSpace } = require('./user_spaceModel');

// create junction tables:
// user_space junction table:
User.belongsToMany(Space, { through: UserSpace });
Space.belongsToMany(User, { through: UserSpace });

exports.syncDb = () => db.sync();
