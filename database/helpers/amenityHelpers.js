const Promise = require('bluebird');
const { Amenity } = require('../models/amenityModel');

// takes amenity object including space_id
const addAmenity = amenityData => (
  Amenity.create(amenityData)
    .then(newAmenity => newAmenity.dataValues)
    .catch(err => console.log(err))
);

// takes amenityId
const deleteAmenity = amenityId => (
  Amenity.findById(amenityId)
    .then(amenity => amenity.destroy())
    .then(destroyedAmenity => destroyedAmenity.dataValues)
    .catch(err => console.log(err))
);
// takes amenityId
const updateAmenity = amenityObj => (
  Amenity.findOneById(amenityObj.id)
    .then(amenity => amenity.update(amenityObj))
    .then(updatedAmenity => updatedAmenity.dataValues)
    .catch(err => console.log(err))
);


// takes space id and array of amenityObj
const updateAmenities = (spaceId, amenities) => {
  
  return Promise.map(amenities, (amenity) => {
    // add space id to every amenity before it is stored
    amenity.space_id = spaceId;
    if (amenity.id && !amenity.text) {
      // delete amenity:
      return deleteAmenity(amenity.id);
    } else if (amenity.id && amenity.text) {
      // update
      return updateAmenity(amenity);
    } else if (!amenity.id && amenity.text) {
      // create
      return addAmenity(amenity);
    }
  })
}

exports.updateAmenities = updateAmenities;