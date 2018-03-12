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

const geocode = (address) => {
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      err ? reject(err) : resolve(JSON.parse(body).results[0].geometry.location);
    })
  })
};

const reverseGeocode = (lat, long) => {
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      err ? reject(err) : resolve(JSON.parse(body).results[0]); 
    })
  })
}

exports.getS3image = getS3image;
exports.geocode = geocode;
exports.reverseGeocode = reverseGeocode;
