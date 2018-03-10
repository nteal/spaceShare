const { Gender } = require('../models/genderModel');

const addGender = gender => (
  Gender.findOne({ where: { self_identification: gender } })
    .then(foundGender => foundGender || Gender.create({ self_identification: gender }))
    .catch(err => console.log(err))
);

exports.addGender = addGender;
