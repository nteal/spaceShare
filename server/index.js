const app = require('./server.js');
const dotenv = require('dotenv').config();
require('offline-plugin/runtime').install();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log('listening on port ', port); // eslint-disable-line
});
