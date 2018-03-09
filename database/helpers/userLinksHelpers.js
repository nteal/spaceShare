const Promise = require('bluebird');
const { OtherLink } = require('../models/otherLinkModel');

const getLinksByUser = userId => OtherLink.findAll({ where: { user_id: userId } })
  .then(linkArray => linkArray.map(link => link.dataValues))
  .catch(err => console.log(err));

const addLinksForUser = linkArr => OtherLink.bulkCreate(linkArr);

const deleteLinkForUser = linkId => (
  OtherLink.findOne({ where: { id: linkId } })
    .then(link => link.destroy())
    .catch(err => console.log(err))
);

const updateLinkForUser = linkData => (
  OtherLink.findOne({ where: { id: linkData.id } })
    .then(link => link.update(linkData))
    .catch(err => console.log(err))
);

const updateLinksForUser = (userId, linkArr) => (
  Promise.map(linkArr, (link) => {
    if (!link.url && link.id) {
      return deleteLinkForUser(link.id);
    } else if (link.id) {
      return updateLinkForUser(link);
    } else if (link.url) {
      const newLink = Object.assign({ user_id: userId }, link);
      return addLinksForUser([newLink]);
    }
    return false;
  })
);

exports.getLinksByUser = getLinksByUser;
exports.addLinksForUser = addLinksForUser;
exports.deleteLinkForUser = deleteLinkForUser;
exports.updateLinksForUser = updateLinksForUser;
