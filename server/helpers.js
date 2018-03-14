const request = require('request');
const aws4 = require('aws4');
require('dotenv').config();


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


exports.getS3image = getS3image;
