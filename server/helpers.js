const request = require('request');
const aws4 = require('aws4');
require('dotenv').config();
const geoHelp = require('./geocodeHelp');


const getS3image = (filename, callback) => {
  const options = {
    service: 's3',
    region: 'us-east-1',
    path: filename,
  };

  request(aws4.sign(options), (response) => {
    callback(response);
  });
};

const addLocToSpace = (spaceObj) => {
  // double check where user input will be stored
  const userInput = `${spaceObj.street_address} ${spaceObj.city} ${spaceObj.state} ${spaceObj.zip}`;
  return geoHelp.getSpaceLocation(userInput)
    .then(locObj => Object.assign({}, spaceObj, locObj))
    .catch(err => console.log(err));
};

const addLocToSearch = (searchObj) => {
  // double check where user input will be stored
  const userInput = `${searchObj.location}`;
  return geoHelp.getSearchLocation(userInput)
    .then(locObj => Object.assign({}, searchObj, locObj))
    .catch(err => console.log(err));
};

const getLocForListings = userInput => (
  geoHelp.getSearchLocation(userInput)
    .then(locObj => locObj.city)
    .catch(err => console.log(err))
);

exports.getS3image = getS3image;
exports.addLocToSpace = addLocToSpace;
exports.addLocToSearch = addLocToSearch;
exports.getLocForListings = getLocForListings;
