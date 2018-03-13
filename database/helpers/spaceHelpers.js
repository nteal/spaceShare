const Promise = require('bluebird');

const { User } = require('../models/userModel');
const { Space } = require('../models/spaceModel');
const { Search } = require('../models/searchModel');

const { getAmenitiesBySpaceId } = require('./amenityHelpers');
const { getImagesBySpaceId } = require('./imageHelpers');
const { getTodosBySpaceId } = require('./todoHelpers');
const { updateAmenities } = require('./amenityHelpers');
const { updateImages } = require('./imageHelpers');

const { getPurposeById } = require('./optionHelpers');
const { getSmokingById } = require('./optionHelpers');
const { getPetById } = require('./optionHelpers');
const { getTimelineById } = require('./optionHelpers');

const { addUsersToSpaces } = require('./spaceMembersHelpers');


const addDataFromIds = (spaceObj) => {
  const retObj = Object.assign({}, spaceObj);
  return Promise.all([
    getPurposeById(spaceObj.purpose_id),
    getSmokingById(spaceObj.smoking_id),
    getPetById(spaceObj.pet_id),
    getTimelineById(spaceObj.timeline_id),
    retObj,
  ])
    .then(([purpose, smoking, pet, timeline, retObj]) => {
      retObj.purpose = purpose.type;
      retObj.smoking = smoking.location;
      retObj.pet = pet.location;
      retObj.timeline = timeline.range;
      return retObj;
    })
    .catch(err => console.log(err));
};

// get just the data displayed on listings
const getSpaceListingById = (spaceId) => {
  return Space.findById(spaceId)
    .then(space => {
      spaceWithoutAddress = Object.assign({}, space.dataValues);
      delete spaceWithoutAddress.street_address;
      delete spaceWithoutAddress.zip;
      return addDataFromIds(spaceWithoutAddress)
    })
    .then(space => {
      return Promise.all([
        getImagesBySpaceId(space.id),
        getAmenitiesBySpaceId(space.id),
        space,
      ])
    })
    .then(async ([images, amenities, space]) => {
      space.gallery = images;
      space.amenities = amenities;
      const owner = await User.findOne({ where: { fb_id: space.owner_fb_id } });
      space.owner_name = `${owner.name_first} ${owner.name_last}`;
      return space;
    })
    .catch(err => console.log(err))
  }

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
    .then(async ([images, amenities, todos, spaceObj]) => {
      spaceObj.gallery = images;
      spaceObj.amenities = amenities;
      spaceObj.todos = todos;
      const owner = await User.findOne({where: { fb_id: spaceObj.owner_fb_id } });
      spaceObj.owner_name = `${owner.name_first} ${owner.name_last}`;
      return addDataFromIds(spaceObj);
    })
    .catch(err => console.log(err))
};

// takes a space object that INCLUDES a fb id:
const addNewSpace = (spaceObj, fbId) => {
  const newSpace = spaceObj ? Object.assign({ owner_fb_id: fbId }, spaceObj) : {};
  const amenitiesArr = newSpace.amenities || [{}];

  // add defaults
  newSpace.capacity = newSpace.capacity || 0;
  newSpace.city = newSpace.city || '';
  newSpace.cost = newSpace.cost || 0;
  newSpace.description = newSpace.description || '';
  newSpace.name = newSpace.name || '';
  newSpace.ground_rules = newSpace.ground_rules || '';
  newSpace.neighborhood = newSpace.neighborhood || '';
  newSpace.main_image = newSpace.main_image || 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space2.jpg';
  newSpace.open = newSpace.open || false;
  newSpace.owner_fb_id = newSpace.owner_fb_id || '';
  newSpace.purpose_id = newSpace.purpose_id || 1;
  newSpace.pet_id = newSpace.pet_id || 3;
  newSpace.smoking_id = newSpace.smoking_id || 3;
  newSpace.state = newSpace.state || '';
  newSpace.street_address = newSpace.street_address || '';
  newSpace.street_address2 = newSpace.street_address2 || '';
  newSpace.timeline_id = newSpace.timeline_id || 1;
  newSpace.zip = newSpace.zip || 0;

  // remove amenitites Arr from obj:
  delete newSpace.amenities;
  // first create user, then add amenities, then call getUser
  return Space.create(newSpace)
    .then(createdSpace => (
      Promise.all([
        updateAmenities(createdSpace.id, amenitiesArr),
        addUsersToSpaces(createdSpace.owner_fb_id, createdSpace.id),
      ])
    ))
    // .then(() => getSpaceById(spaceId)) // commented out to return only id!
    .then(([amenities, userSpaceJunction]) => userSpaceJunction.spaceId)
    .catch(err => console.log(err));
};

// takes a space object, returns a promise for updated space:
const updateSpace = (spaceObj) => {
  // set defaults to help prevent breaking
  const retObj = spaceObj ? Object.assign({}, spaceObj) : {};
  retObj.amenities = retObj.amenities || [];
  retObj.gallery = retObj.gallery || [];
  return Promise.all([
    // update amenities related to space
    updateAmenities(retObj.id, retObj.amenities),
    // update images related to space
    updateImages(retObj.id, retObj.gallery),
  ])
    // update space
    .then(() => Space.findById(spaceObj.id))
    .then((space) => {
      const updatedSpaceObj = Object.assign({}, spaceObj);
      updatedSpaceObj.main_image = spaceObj.main_image || 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space2.jpg';
      return space.update(updatedSpaceObj);
    })
    .then(({ id }) => id)
    .catch(err => console.log(err));
};

const getDashboardInfoById = spaceId => {
  return  Space.findById(spaceId)
    .then(async(space) => { 
      space.purpose = (await getPurposeById(space.purpose_id)).type;
      return space;
    })
    .then(space => ({ name: space.name, purpose: space.purpose, id: space.id }))
    .catch(err => console.log(err));
}

// get space info for matching purposes
  // based on location and purpose
// get users associated with space (members)
const getSpacesForMatching = (searchId) => (
  Search.findById(searchId)
    .then(searchObj => (
      // get all spaces with matching city and purpose to search obj
      Space.findAll({ where: { city: searchObj.city, purpose_id: searchObj.purpose_id, open: true}}))
    )
    .then(compatibleSpaces => Promise.map(compatibleSpaces, space => {
      return getSpaceListingById(space.id);
    }))
    .catch(err => console.log(err))
) 

const isOwner = (fbId, spaceId) => (
  Space.findById(spaceId)
    .then(space => space.owner_fb_id === fbId)
    .catch(err => console.log(err))
);

// expects object with spaceId and ground_rules
const updateGroundrules = (updateObj) => (
  Space.findById(updateObj.spaceId)
    .then(space => space.update({ ground_rules: updateObj.ground_rules }))
    .then(updated => true)
    .catch(err => console.log(err))
)

exports.addNewSpace = addNewSpace;
exports.getSpaceById = getSpaceById;
exports.updateSpace = updateSpace;
exports.getSpacesForMatching = getSpacesForMatching;
exports.getSpaceListingById = getSpaceListingById;
exports.getDashboardInfoById = getDashboardInfoById;
exports.isOwner = isOwner;
exports.updateGroundrules = updateGroundrules;
