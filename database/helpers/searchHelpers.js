const { Search } = require('../models/searchModel');
const { getPurposeById } = require('./optionHelpers');
const { getSmokingById } = require('./optionHelpers');
const { getPetById } = require('./optionHelpers');
const { getTimelineById } = require('./optionHelpers');
const { getSleepById } = require('./optionHelpers');
const { getPersonalityById } = require('./optionHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getAge } = require('./userHelpers');
const Promise = require('bluebird');
const { Op } = require('sequelize');

// create a search:
const addNewSearch = (fbId, searchData) => {
  const searchObjWithFbId = Object.assign({ fb_id: fbId }, searchData);
  return Search.create(searchObjWithFbId)
    .then(newSearch => newSearch.dataValues.id)
    .catch(err => console.log(err));
};

// delete a search by id:
const deleteSearchById = id => (
  Search.findById(id)
    .then(search => search.destroy())
    .then(destroyed => destroyed.dataValues)
    .catch(err => console.log(err))
);

const addUserDataForMatching = (searchObj) => {
  const retObj = Object.assign({}, searchObj);
  return getUserByFbId(retObj.fb_id)
    .then((user) => {
      retObj.name_first = user.name_first;
      retObj.name_last = user.name_last;
      retObj.image_url = user.image_url;
      retObj.profession = user.profession;
      retObj.age = getAge(user.birthdate);
      retObj.personality_id = user.personality_id;
      retObj.sleep_id = user.sleep_id;
      // need to get searchable bool from user
      if (retObj.purpose_id === 1) {
        retObj.searchable = user.searchable_work;
      } else if (retObj.purpose_id === 2) {
        retObj.searchable = user.searchable_live;
      }
      retObj.userPersonality = user.personality;
      retObj.userSleep = user.sleep;
      // TODO: add / get age
      return retObj;
    })
    .catch(err => console.log(err));
  // return retObj;
};

const addDataFromIds = (searchObj) => {
  const retObj = Object.assign({}, searchObj);
  return Promise.all([
    getPurposeById(searchObj.purpose_id),
    getSmokingById(searchObj.smoking_id),
    getPetById(searchObj.pet_id),
    getTimelineById(searchObj.timeline_id),
    getSleepById(searchObj.sleep_id),
    getPersonalityById(searchObj.personality_id),
  ])
    .then(([purpose, smoking, pet, timeline, sleep, personality]) => {
      retObj.purpose = purpose.type;
      retObj.smoking = smoking.location;
      retObj.pet = pet.location;
      retObj.timeline = timeline.range;
      retObj.sleep = sleep.schedule;
      retObj.personality = personality.type;
      return retObj;
    })
    .catch(err => console.log(err));
};

const getSearchesByFbId = fbId => (
  Search.findAll({ where: { fb_id: fbId } })
    .then(userSearches => Promise.map(userSearches, search => addDataFromIds(search.dataValues)))
    .catch(err => console.log(err))
);

// get all searches:
const getSearchesForMatching = searchId => (
  // get all searches
  Search.findById(searchId)
    // only include searches with same purpose and city, that include people
    .then(search => (
      Search.findAll({
        where: {
          purpose_id: search.purpose_id,
          price_min: {
            [Op.lte]: parseFloat(search.price_max),
          },
          price_max: {
            [Op.gte]: parseFloat(search.price_min),
          },
          include_people: true,
          fb_id: {
            [Op.ne]: search.fb_id,
          },
        },
      })))
    .then(matches => (
      Promise.map(matches, (match) => {
        const useableMatch = Object.assign({}, match.dataValues);
        // move personality and sleep ids to search_<>
        useableMatch.search_sleep_id = useableMatch.sleep_id;
        useableMatch.search_personality_id = useableMatch.personality_id;
        // delete personality and sleep ids, will add actual user info for these properties
        delete useableMatch.sleep_id;
        delete useableMatch.personality_id;
        return addUserDataForMatching(useableMatch);
      })
    ))
    .then((objsWithUserData) => {
      // only include searches from people who are "open"
      const openSearches = objsWithUserData.filter(search => search.searchable);
      return Promise.map(openSearches, search => addDataFromIds(search));
    })
    .catch(err => console.log(err))
);

const getSearchById = id => (
  Search.findById(id)
    .then(search => search.dataValues)
    .catch(err => console.log(err))
);

exports.addNewSearch = addNewSearch;
exports.deleteSearchById = deleteSearchById;
exports.getSearchesByFbId = getSearchesByFbId;
exports.getSearchesForMatching = getSearchesForMatching;
exports.getSearchById = getSearchById;
// only for matching, used only twice in program at the moment
exports.addUserDataForMatching = addUserDataForMatching;
