const request = require('request');

const geocode = address => (
  new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => (
      err ? reject(err) : resolve(JSON.parse(body).results[0].geometry.location)
    ));
  })
);

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

const reverseGeocode = (lat, long) => {
  return new Promise((resolve, reject) => {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE_KEY}`, (err, res, body) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(JSON.parse(body));
      return true;
    
      // if (purpose === 'search') {
      //   resolve(reverseGeocodeSearch(lat, long, results));
      //   return true;
      // } else if (purpose === 'space') {
      //   resolve(reverseGeocodeSpace(lat, long, results));
      //   return true;
      // }
    });
  });
};


const reverseGeocodeSpace = (lat, lng) => {
  return reverseGeocode(lat, lng)
    .then(({ results }) => {
      const spaceLocation = { lat, lng, neighborhood: '' };
      for (let i = 0; i < results.length; i += 1) {
        for (let j = 0; j < results[i].address_components.length; j += 1) {
          const addressComp = results[i].address_components[j];
          if (addressComp.types.includes('neighborhood')) {
            spaceLocation.neighborhood = addressComp.long_name;
            return spaceLocation;
          }
        }
      }
      return spaceLocation;
    })
    .catch(err => console.log(err));
};

// const getSpaceLocation = (userInput) => {
//   // format correctly for user input:
//   geocode(userInput)
//     .then(loc => reverseGeo)
// }

exports.geocode = geocode;
exports.reverseGeocodeSpace = reverseGeocodeSpace;

