const db = require('../sequelize').sequelize;
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
const { Space } = require('./space/spaceModel');
const { Todo } = require('./space/todoModel');
const { Amenity } = require('./space/amenityModel');

// create junction tables:
// user_space junction table:
User.belongsToMany(Space, { through: 'user_space' });
Space.belongsToMany(User, { through: 'user_space' });
// space_amenity junction table:
Amenity.belongsToMany(Space, { through: 'space_amenity' });
Space.belongsToMany(Amenity, { through: 'space_amenity' });

db.sync();
