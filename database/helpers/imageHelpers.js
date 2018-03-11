const Promise = require('bluebird');
const { Image } = require('../models/imageModel');

const getImagesBySpaceId = (spaceId) => (
  Image.findAll( { where: { space_id: spaceId } })
    .then(images => images.map(image => image.dataValues))
    .catch(err => console.log(err))
)

// takes image object including space_id
const addImage = imageData => (
  Image.create(imageData)
    .then(newImage => newImage.dataValues)
    .catch(err => console.log(err))
);

// takes imageId
const deleteImage = imageId => (
  Image.findById(imageId)
    .then(image => image.destroy())
    .then(destroyedImage => destroyedImage.dataValues)
    .catch(err => console.log(err))
);
// takes imageId
const updateImage = imageObj => (
  Image.findById(imageObj.id)
    .then(image => image.update(imageObj))
    .then(updatedImage => updatedImage.dataValues)
    .catch(err => console.log(err))
);


// takes space id and array of imageObjs
const updateImages = (spaceId, images) => {

  return Promise.map(images, (image) => {
    // add space id to every image before it is stored
    image.space_id = spaceId;
    if (image.id && !image.name) {
      // delete image:
      return deleteImage(image.id);
    } else if (image.id && image.name) {
      // update
      return updateImage(image);
    } else if (!image.id && image.name) {
      // create
      return addImage(image);
    }
  })
}



exports.getImagesBySpaceId = getImagesBySpaceId;
exports.updateImages = updateImages;