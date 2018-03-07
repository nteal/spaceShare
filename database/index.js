const { syncDb } = require('./models/index.js');

// fill in necessary tables:
const { fillTables } = require('./insertOptions/index.js');

syncDb()
  .then(() => fillTables())
  .catch(err => console.log(err));

