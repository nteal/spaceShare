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

const geocode = address => (
  new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => (
      err ? reject(err) : resolve(JSON.parse(body).results[0].geometry.location)
    ));
  })
);

const reverseGeocodeSpace = (lat, lng, results) => {
  const spaceLocation = { lat, lng, neighborhood: '' };
  for (let i = 0; i < results.length; i += 1) {
    for (let j = 0; j < results.length; j += 1) {
      const addressComp = results[i][j];
      if (addressComp.types.contains('neighborhood')) {
        spaceLocation.neighborhood = addressComp.long_name;
        return spaceLocation;
      }
    }
  }
};

const reverseGeocodeSearch = (lat, lng) => {
  // needs to save long/lat and city
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      if (err) {
        reject(err);
        return false;
      }
      const { results } = JSON.parse(body);
      for (let i = 0; i < results.length; i += 1) {
        for (let j = 0; j < results.length; j += 1) {
          const addressComp = results[i][j];
          if (addressComp.types.contains('locality')) {
            resolve(addressComp.long_name);
            return true;
          }
        }
      }
      resolve('');
      return true;
    });
  });
};

const reverseGeocode = (purpose, lat, long) => {
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      if (err) {
        reject(err);
        return false;
      }

      const { results } = JSON.parse(body);
    
      if (purpose === 'search') {
        resolve(reverseGeocodeSearch(lat, long, results));
        return true;
      } else if (purpose === 'space') {
        resolve(reverseGeocodeSpace(lat, long, results));
        return true;
      }
    });
  });
};

exports.getS3image = getS3image;
exports.geocode = geocode;
exports.reverseGeocode = reverseGeocode;
