const { getSpacesForMatching } = require('./spaceHelpers')
const { getSearchesForMatching } = require('./searchHelpers');
const { Search } = require('../models/searchModel');

const getAllMatches = searchId => {
  return Search.findById(searchId)
    .then(async search => {
      const matches = {};
      matches.places = await getSpacesForMatching(search.id);
      matches.people = search.include_people ? await getSearchesForMatching(search.id) : [];
      return matches;
    })
    .catch(err => console.log(err));
}

exports.getAllMatches = getAllMatches;