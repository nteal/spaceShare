const { syncDb } = require('./models/index.js');
const { fillTables } = require('./insertOptions/index.js');

// create db with all models
syncDb()
  // after tables are created, populate tables with options
  .then(() => fillTables())
  .catch(err => console.log(err));

