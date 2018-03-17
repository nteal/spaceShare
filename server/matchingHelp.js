const db = require('../database');
const { getGeoDist } = require('./geocodeHelp');
const { addUserDataForMatching } = require('../database/helpers/searchHelpers');

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
  // check for matching personality preferences
  if ((match.personality_id !== currentSearch.search_personality_id) || (match.search_personality_id !== currentSearch.personality_id)) { diff += 1; }
  // check for matching sleep preferences
  if ((match.sleep_id !== currentSearch.search_sleep_id) || (match.search_sleep_id !== currentSearch.sleep_id)) { diff += 1; }
  // check for ages
  if ((match.age > currentSearch.age_max || match.age < currentSearch.age_min) || (currentSearch.age > match.age_max || currentSearch.age < match.age_min)) { diff += 1; }
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
  }, [[], [], [], [], [], [], []]);
};

// make func to take current search, find all searches, then compare
const match = (searchId) => {
  return db.helpers.getSearchById(searchId)
    .then((search) => {
      const currentSearch = Object.assign({}, search);
      // move sleep_id and personality_id to search_<...>
      currentSearch.search_sleep_id = currentSearch.sleep_id;
      currentSearch.search_personality_id = currentSearch.personality_id;
      delete currentSearch.personality_id;
      delete currentSearch.sleep_id;
      // add user data, inlcuding sleep_id and personality_id
      return addUserDataForMatching(currentSearch);
    })
    .then(currentSearch => (
      // return all the baseline matches from db and the currentSearch obj including user data
      Promise.all([
        db.helpers.getAllMatches(currentSearch),
        currentSearch,
      ])
    ))
    .then(([{ people, searches, places }, currentSearch]) => {
      // searches are good
      const finalMatches = {};
      finalMatches.searches = searches;
      // match places:
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
