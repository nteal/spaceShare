const { Search } = require('../models/searchModel');

// create a search:
const addNewSearch = searchData => (
  Search.create(searchData)
    .then(newSearch => newSearch.dataValues)
    .catch(err => console.log(err))
);

exports.addNewSearch = addNewSearch;
