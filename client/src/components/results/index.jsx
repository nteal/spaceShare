import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CurrencyUsd from 'mdi-react/CurrencyUsdIcon.js';
import AccountMultiple from 'mdi-react/AccountMultipleIcon.js';
import Briefcase from 'mdi-react/BriefcaseIcon.js';
import TimerSand from 'mdi-react/TimerSandIcon.js';
import Home from 'mdi-react/HomeIcon.js';
import Smoking from 'mdi-react/SmokingIcon.js';
import Paw from 'mdi-react/PawIcon.js';
import ResultListItem from './result-list-item.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newSearch = this.newSearch.bind(this);
  }
  newSearch() {
    this.props.history.push('/search');
  }
  render() {
    const {
      heading, people, places, search, history, profile_link, listing_link,
    } = this.props;
    return (
      <div className="pl-4">
        <div className="row mb-2 mt-2">
          <div className="col-10">
            <h1>{heading}</h1>
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={this.newSearch}>New Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              {((search.purpose === 'Work') ? <Briefcase /> : <Home />)}
              {search.distance} miles around
            </div>
            <div className="row">
              {search.location}
            </div>
            <div className="row">
              {search.city}
            </div>
          </div>
          <div className="col">
            <div className="row">
              <CurrencyUsd /> {search.price_min} - {search.price_max}
            </div>
            <div className="row">
              <TimerSand /> {search.timeline}
            </div>
          </div>
          <div className="col">
            <div className="row">
              <Smoking /> {search.smoking}
            </div>
            <div className="row">
              <Paw /> {search.pet}
            </div>
          </div>
          <div className="col">
            <div className="row">
              {(search.include_people ? <AccountMultiple /> : null)}
            </div>
            <div className="row">
              {search.sleep} {search.personality}
            </div>
            <div className="row">
              age range: {search.age_min} - {search.age_max}
            </div>
          </div>
        </div>
        <div className="row">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#places" role="tab">Places</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#people" role="tab">People</a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{
                  pathname: '/saved-searches',
                  state: {
                    people: people, // eslint-disable-line
                    places: places, // eslint-disable-line
                  },
                }}
                refresh="true"
              >Saved Searches
              </Link>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade" id="people" role="tabpanel">
            {people.map(person => (
              <ResultListItem
                image={person.image_url}
                name={`${person.name_first} ${person.name_last}`}
                financial={person.profession}
                about={person.sleep}
                description={person.personality}
                tag="userId"
                link={profile_link}
                history={history}
                key={person.id}
              />
            ))}
          </div>
          <div className="tab-pane fade show active" id="places" role="tabpanel">
            {places.map(place => (
              <ResultListItem
                image={place.main_image}
                name={place.name}
                financial={place.cost}
                about={place.neighborhood}
                description={place.description}
                tag="spaceId"
                id={place.id}
                link={listing_link}
                history={history}
                key={place.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  heading: PropTypes.string,
  people: PropTypes.array, // eslint-disable-line
  places: PropTypes.array, // eslint-disable-line
  search: PropTypes.array, // eslint-disable-line
  profile_link: PropTypes.string,
  listing_link: PropTypes.string,
};
Results.defaultProps = {
  history: {
    push: () => (
      // eslint-disable-next-line
      console.log('you do not have access to props.history inside of this component')
    ),
  },
  heading: 'Results',
  people: [],
  places: [],
  search: {},
  profile_link: '/profile',
  listing_link: '/listing',
};

export default Results;
