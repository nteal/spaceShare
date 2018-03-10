const { Search } = require('../models/searchModel');

// create a search:
const addNewSearch = searchData => (
  Search.create(searchData)
    .then(newSearch => newSearch.dataValues)
    .catch(err => console.log(err))
);

// delete a search by id:
const deleteSearchById = id => (
  Search.findById(id)
    .then(search => search.destroy())
    .then(destroyed => destroyed.dataValues)
    .catch(err => console.log(err))
);

// get all searches:
const getSearches = () => (
  Search.findAll()
    .then(searches => searches.map((search => search.dataValues)))
    .catch(err => console.log(err))
);
// get searches by match criteria:

exports.addNewSearch = addNewSearch;
exports.deleteSearchById = deleteSearchById;
exports.getSearches = getSearches;
