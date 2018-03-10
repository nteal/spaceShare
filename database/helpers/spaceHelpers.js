const { Space } = require('../models/spaceModel');
const { updateAmenities } = require('./amenityHelpers');

// get space for users purposes
  // needs to fetch todos, amenities, and images
const getSpaceById = (spaceId) => (
  Space.findById(spaceId)
    .then(space => space.dataValues)
    .catch(err => console.log(err))
);

// takes a space object that INCLUDES a fb id:
const addNewSpace = (spaceObj) => {
  const amenitiesArr = spaceObj.amenities;
  const newSpace = Object.assign({}, spaceObj);
  newSpace.main_image = spaceObj.main_image.name;
  let spaceId;
  // remove amenitites Arr from obj:
  delete newSpace.amenities;
  // first create user, then add amenities, then call getUser
  return Space.create(newSpace)
    .then(createdSpace => {
      spaceId = createdSpace.id;
      updateAmenities(createdSpace.id, amenitiesArr)
    })
    .then(() => getSpaceById(spaceId))
    .catch(err => console.log(err));
}

// takes a space object, returns a promise for updated space:
const editSpace = (spaceObj) => {
  Space.findById(spaceObj.id)
    .then(space => space.update(spaceObj))
    .catch(err => console.log(err));
}

// get space info for matching purposes
  // based on location and purpose
// get users associated with space (members) 

exports.addNewSpace = addNewSpace;