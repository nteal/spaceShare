const { syncDb } = require('./models/index.js');
const { fillTables } = require('./insertOptions/index.js');
const { helpers } = require('./helpers/index.js');

// create db with all models
syncDb()
  // after tables are created, populate tables with options
  .then(() => fillTables())
  .catch(err => console.log(err));

exports.helpers = helpers;
