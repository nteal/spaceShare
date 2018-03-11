const { Image } = require('../models/imageModel');

const getImagesBySpaceId = (spaceId) => (
  Image.findAll( { where: { space_id: spaceId } })
    .then(images => images.map(image => image.dataValues))
    .catch(err => console.log(err))
)

const addNewImage = (imgObject) => {

}

exports.getImagesBySpaceId = getImagesBySpaceId;