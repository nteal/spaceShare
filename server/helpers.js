const request = require('request');
const aws4 = require('aws4');
const dotenv = require('dotenv').config();


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

const postS3image = (file, filename, callback) => {
  const options = {
    service: 's3',
    region: 'us-east-1',
    method: 'POST',
    path: filename,
    body: { image: file },
  };

  request(aws4.sign(options), (response) => {
    callback(response);
  });
};

const getSignature = (callback) => {
  
};

exports.getS3image = getS3image;