const Promise = require('bluebird');
const { getSpacesForMatching } = require('./spaceHelpers');
const { addDataFromIds } = require('./spaceHelpers');
const { getSearchesForMatching } = require('./searchHelpers');
const { getSearchesByFbId } = require('./searchHelpers');
const { Search } = require('../models/searchModel');
const { Space } = require('../models/spaceModel');
const { User } = require('../models/userModel');

const getAllMatches = searchId => (
  Search.findById(searchId)
    .then(async (search) => {
      const matches = {};
      matches.places = await getSpacesForMatching(search.id);
      matches.people = search.include_people ? await getSearchesForMatching(search.id) : [];
      matches.searches = await getSearchesByFbId(search.fb_id);
      return matches;
    })
    .catch(err => console.log(err))
);

// this function will eventually gets its data from geocoding, which will take user input
const getAllListings = city => (
  Space.findAll({ where: { city, open: true } })
    .then(spaces => Promise.map(spaces, (space) => {
      const spaceObj = space.dataValues;
      return addDataFromIds(spaceObj);
    }))
    .then(spaces => Promise.map(spaces, async (space) => {
      const owner = await User.findOne({ where: { fb_id: space.owner_fb_id } });
      const spaceListing = {
        cost: space.cost,
        description: space.description,
        neighborhood: space.neighborhood,
        main_image: space.main_image,
        pet: space.pet,
        smoking: space.smoking,
        purpose: space.purpose,
        owner_fb_id: space.owner_fb_id,
        timeline: space.timeline,
        owner_name: `${owner.name_first} ${owner.name_last}`,
      };
      return spaceListing;
    }))
    .then(spaceListings => spaceListings)
    .catch(err => console.log(err))
);

const getListingsAndSavedSearches = async(city, fbId) => {
  const listingsAndSearches = {};
  listingsAndSearches.listings = await getAllListings(city);
  listingsAndSearches.searches = await getSearchesByFbId(fbId);
  return listingsAndSearches;
};

exports.getAllMatches = getAllMatches;
exports.getAllListings = getAllListings;
exports.getListingsAndSavedSearches = getListingsAndSavedSearches;
