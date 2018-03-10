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
// get searches by match criteria:

exports.addNewSearch = addNewSearch;
exports.deleteSearchById = deleteSearchById;
