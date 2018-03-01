const Sequelize = require('sequelize');

const HOST = 'localhost';

// note: before using db for first time, visit ./createDb.sql and follow directions

const sequelize = new Sequelize('space_share', 'root', 'password', {
  host: HOST,
  dialect: 'mysql',
});

// basic code to check if sequelize connected correctly
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// mainly used to check for connection
exports.seq = sequelize;
