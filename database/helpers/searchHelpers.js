const { Search } = require('../models/searchModel');
const { User } = require('../models/userModel');
const { getPurposeById } = require('./optionHelpers');
const { getUserById } = require('./userHelpers');

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

exports.addNewSearch = addNewSearch;
exports.deleteSearchById = deleteSearchById;
