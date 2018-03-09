const moment = require('moment');

const getZodiac = (birthdate) => {
  // hardcoded 2018 to fit into 'iso format' to work with moment,
  // needed to all be same year for correct zodiac match
  const date = `2018-${moment(birthdate).format('MM-DD')}`;
  let zodiac;
  if (moment(date).isBefore('2018-01-20')) {
    zodiac = 'Capricorn';
  } else if (moment(date).isBefore('2018-02-19')) {
    zodiac = 'Aquarius';
  } else if (moment(date).isBefore('2018-03-21')) {
    zodiac = 'Pisces';
  } else if (moment(date).isBefore('2018-04-20')) {
    zodiac = 'Aries';
  } else if (moment(date).isBefore('2018-05-21')) {
    zodiac = 'Taurus';
  } else if (moment(date).isBefore('2018-06-21')) {
    zodiac = 'Gemini';
  } else if (moment(date).isBefore('2018-04-23')) {
    zodiac = 'Cancer';
  } else if (moment(date).isBefore('2018-08-23')) {
    zodiac = 'Leo';
  } else if (moment(date).isBefore('2018-09-23')) {
    zodiac = 'Virgo';
  } else if (moment(date).isBefore('2018-10-23')) {
    zodiac = 'Libra';
  } else if (moment(date).isBefore('2018-11-22')) {
    zodiac = 'Scorpio';
  } else if (moment(date).isBefore('2018-12-22')) {
    zodiac = 'Sagittarius';
  } else {
    zodiac = 'Capricorn';
  }
  return zodiac;
};

exports.getZodiac = getZodiac;
