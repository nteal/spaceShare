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

exports.getLinksByUser = getLinksByUser;
exports.addLinksForUser = addLinksForUser;
exports.deleteLinkForUser = deleteLinkForUser;
exports.updateLinkForUser = updateLinkForUser;
