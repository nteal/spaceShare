const db = require('../database');
const { getGeoDist } = require('./geocodeHelp');

// match space helper for match
// takes arr of spaces and current search
  // else puts into nested array depending on differences

const getDiffOfSpace = (search, place) => {
  let diff = 0;
  if (place.pet_id !== search.pet_id) { diff += 1; }
  if (place.smoking_id !== search.smoking_id) { diff += 1; }
  if (place.timeline_id !== search.timeline_id) { diff += 1; }
  return diff;
};

const matchSpaces = (currentSearch, allPlaces) => {
  // remove places outside of search distance
  const placesInDist = allPlaces.filter(space =>
    getGeoDist({ lat: currentSearch.lat, lon: currentSearch.lng }, { lat: space.lat, lon: space.lng }) < currentSearch.distance);
  // TODO: trim objs here?
  // return arr or arrs ordered by difference between space and search
  return placesInDist.reduce((orderedMatches, space) => {
    const ind = getDiffOfSpace(currentSearch, space);
    orderedMatches[ind] = orderedMatches[ind] ? orderedMatches[ind].concat(space) : [space];
    return orderedMatches;
  }, [[], [], [], []]);
};

const getDiffOfPeople = (currentSearch, match) => {
  let diff = 0;
  if (match.pet_id !== currentSearch.pet_id) { diff += 1; }
  if (match.smoking_id !== currentSearch.smoking_id) { diff += 1; }
  if (match.timeline_id !== currentSearch.timeline_id) { diff += 1; }
  if (match.personality_id !== currentSearch.personality_id) { diff += 1; }
  if (match.sleep_id !== currentSearch.sleep_id) { diff += 1; }
  return diff;
};

const matchPeople = (currentSearch, allMatches) => {
  // remove places outside of search distance
  const matchesInDist = allMatches.filter(match =>
    getGeoDist({ lat: currentSearch.lat, lon: currentSearch.lng }, { lat: match.lat, lon: match.lng }) < currentSearch.distance + (match.distance || 0));
  // TODO: trim objs here?
  // return arr or arrs ordered by difference between matching search and current search
  return matchesInDist.reduce((orderedMatches, match) => {
    const ind = getDiffOfPeople(currentSearch, match);
    orderedMatches[ind] = orderedMatches[ind] ? orderedMatches[ind].concat(match) : [match];
    return orderedMatches;
  }, [[], [], [], [], [], []]);
};

// make func to take current search, find all searches, then compare
const match = (searchId) => {
  let currentSearch;
  const finalMatches = {};
  return db.helpers.getSearchById(searchId)
    .then((search) => {
      currentSearch = search;
      // ensure that every object is within budget, and open
      return db.helpers.getAllMatches(search.id);
    })
    .then(({ people, searches, places }) => {
      // searches are good
      finalMatches.searches = searches;
      // match places:
      debugger;
      // const thePlaces = matchSpaces(currentSearch, places);
      // const theNewPlaces = thePlaces.reduce((concatPlaces, space) => concatPlaces.concat(space), []);
      // finalMatches.places = theNewPlaces;
      finalMatches.places = matchSpaces(currentSearch, places).reduce((concatPlaces, space) => concatPlaces.concat(space), []);
      // match people:
      finalMatches.people = matchPeople(currentSearch, people).reduce((concatPeople, person) => concatPeople.concat(person), []);
      return finalMatches;
    })
    .catch(err => console.log(err));
};
    // also, should not match user to self or  spaces they are a member of
    // also, should only match to 1 listing / user if looking for ppl
  // sort every obj into arrays based on difference
  // trim data in each obj to include what is necessary
  // return object with different arrays based on differences
exports.match = match;
