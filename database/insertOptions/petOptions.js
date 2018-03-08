const { Pet } = require('../models/petModel');

const petList = [
  { location: 'Outside is fine' },
  { location: 'Anywhere is fine' },
  { location: 'Absolutely not' },
];

const populatePet = () => Pet.bulkCreate(petList);

exports.fillPetOptions = () => (
  // search for Pets
  Pet.findAll()
    // if already Pets, print them. else add them
    .then(petOptions => (petOptions.length ? console.log('pet is already populated') : populatePet()))
    .catch(err => console.log(err))
);
