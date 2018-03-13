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

reverseGeocodeSpace = (lat, long) => {
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      if (err) {
        reject(err);
        return false;
      }
      const { results } = JSON.parse(body);
    let streetNum = '';
    let street = '';
    const address = {
      street_address: '',
      neighborhood: '',
      city: '',
      state: '',
      zip: '',
    };
    for (let i = 0; i < results; i += 1) {
      for (let j = 0; j < results[i].length; j += 1) {
        const addressComp = results[i][j];
        // if everything populated, resolve and return!
        // else try to fill them
        if (address.street_address && address.city && address.state && address.zip && address.neighborhood) {
          resolve(address);
          return true;
        } else if (!streetNum && addressComp.types.includes('street_number')) {
          streetNum = addressComp.long_name;
          address.street_address = streetNum && street && !address.street_address ? `${streetNum} ${street}` : false;
        } else if (!street && addressComp.types.includes('route')) {
          street = addressComp.short_name;
          address.street_address = streetNum && street && !address.street_address ? `${streetNum} ${street}` : false;
        } else if (!results.neighborhood && addressComp.types.includes('neighborhood')) {
          results.neighborhood = addressComp.long_name;
        } else if (!results.city && addressComp.types.includes('locality')) {
          results.city = addressComp.long_name;
        } else if (!results.state && addressComp.types.includes('administrative_area_level_1')) {
          results.state = addressComp.short_name;
        } else if (!results.zip && addressComp.types.includes('postal_code')) {
          results.zip = addressComp.short_name;
        }
      }
    }
    resolve(address);
    return true;
    });
  });
};

reverseGeocodeSearch = (lat, lng) => {
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
      if (purpose === 'search') {
        return reverseGeocodeSearch(lat, long);
      } else if (purpose === 'space') {
        return reverseGeocodeSpace(lat, long);
      }
};

exports.getS3image = getS3image;
exports.geocode = geocode;
exports.reverseGeocode = reverseGeocode;
