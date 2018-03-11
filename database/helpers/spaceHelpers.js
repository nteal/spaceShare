const Promise = require('bluebird');
const { getAmenitiesBySpaceId } = require('./amenityHelpers');
const { getImagesBySpaceId} = require('./imageHelpers');
const { Space } = require('../models/spaceModel');
const { updateAmenities } = require('./amenityHelpers');
const { getTodosBySpaceId } = require('./todoHelpers');

// get space for users purposes
  // needs to fetch todos, amenities, and images
const getSpaceById = (spaceId) => {
  return Space.findById(spaceId)
    .then(space => {
      const spaceId = space.dataValues.id;
      return Promise.all([
        getImagesBySpaceId(spaceId),
        getAmenitiesBySpaceId(spaceId),
        getTodosBySpaceId(spaceId),
        space.dataValues,
      ])
    })
    .then(([images, amenities, todos, spaceObj]) => {
      spaceObj.images = images;
      spaceObj.amenities = amenities;
      spaceObj.todos = todos;
      return spaceObj;
    })
    .catch(err => console.log(err))
};

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
  // update images
  // update amenities
  // update todo
  Space.findById(spaceObj.id)
    .then(space => space.update(spaceObj))
    .catch(err => console.log(err));
}

// get space info for matching purposes
  // based on location and purpose
// get users associated with space (members) 

exports.addNewSpace = addNewSpace;
exports.getSpaceById = getSpaceById;