const { Timeline } = require('../models/timelineModel');

const timelineList = [
  { range: 'Daily' },
  { range: 'Weekly' },
  { range: 'Monthly' },
  { range: 'Long-term' },
];

const populateTimeline = () => Timeline.bulkCreate(timelineList);

exports.fillTimelineOptions = () => (
  // search for Timelines
  Timeline.findAll()
    // if already Timelines, print them. else add them
    .then(timelineOptions => (timelineOptions.length ? console.log('timeline is already populated') : populateTimeline()))
    .catch(err => console.log(err))
);
