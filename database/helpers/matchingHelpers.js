const { getSpacesForMatching } = require('./spaceHelpers')
const { getSearchesForMatching } = require('./searchHelpers');
const { getSearchesByFbId } = require('./searchHelpers');
const { Search } = require('../models/searchModel');

const getAllMatches = searchId => {
  return Search.findById(searchId)
    .then(async search => {
      const matches = {};
      matches.places = await getSpacesForMatching(search.id);
      matches.people = search.include_people ? await getSearchesForMatching(search.id) : [];
      matches.searches = await getSearchesByFbId(search.fb_id);
      return matches;
    })
    .catch(err => console.log(err));
}

exports.getAllMatches = getAllMatches;