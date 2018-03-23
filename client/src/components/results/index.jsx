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
        <div className="row justify-content-between mb-5 mt-2 mr-0">
          <div className="heading-box">
            <h1>{heading}</h1>
          </div>
          <button className="btn btn-info pr-3" onClick={this.newSearch}>
            <div className="row ml-0 mr-0">
              <i className="material-icons mr-2">search</i>
              <h5 className="h-result mb-0">New Search</h5>
            </div>
          </button>
        </div>
        <div className="row pb-4">
          <div className="col col-lg-2">
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0">
                  {((search.purpose === 'Work') ? <Briefcase className="mr-1" fill="#FFF" /> : <Home className="mr-1" fill="#FFF" />)}
                  {search.distance} miles around
                </div>
              </span>
            </div>
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-secondary align-middle">
                {search.location}
              </span>
            </div>
            <div className="row justify-content-center">
              <span className="badge badge-pill badge-secondary align-middle">
                {search.city}
              </span>
            </div>
          </div>
          <div className="col col-lg-2">
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0"><CurrencyUsd className="mr-1" fill="#FFF" />
                  {search.price_min} - {search.price_max}
                </div>
              </span>
            </div>
            <div className="row justify-content-center">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0"><TimerSand className="mr-1" fill="#FFF" />{search.timeline}</div>
              </span>
            </div>
          </div>
          <div className="col col-lg-2">
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0"><Smoking className="mr-1" fill="#FFF" />{search.smoking}</div>
              </span>
            </div>
            <div className="row justify-content-center">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0"><Paw className="mr-1" fill="#FFF" />{search.pet}</div>
              </span>
            </div>
          </div>
          <div className="col col-lg-2">
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0">
                  {(search.include_people ? <AccountMultiple /> : null)} 
                  {search.sleep}
                </div>
              </span>
            </div>
            <div className="row justify-content-center pb-1">
              <span className="badge badge-pill badge-primary">
                <div className="row d-flex align-items-center ml-0 mr-0">
                  {(search.include_people ? <AccountMultiple /> : null)}
                  {search.personality}
                </div>
              </span>
            </div>
            <div className="row justify-content-center">
              <span className="badge badge-pill badge-primary">age range: {search.age_min} - {search.age_max}</span>
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
                className="nav-link saved-searches-tab"
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
            <ul className="list-group list-group-flush">
              {people.map((person, i) => (
                <ResultListItem
                  num={i}
                  image={person.image_url}
                  name={`${person.name_first} ${person.name_last}`}
                  profession={person.profession}
                  badgeOne={person.sleep}
                  badgeTwo={person.personality}
                  tag="userId"
                  link={profile_link}
                  history={history}
                  key={person.id}
                />
              ))}
            </ul>
          </div>
          <div className="tab-pane fade show active" id="places" role="tabpanel">
            <ul className="list-group list-group-flush">
              {places.map((place, i) => (
                <ResultListItem
                  num={i}
                  image={place.main_image}
                  name={place.name}
                  cost={place.cost}
                  timeline={place.timeline}
                  neighborhood={place.neighborhood}
                  city={place.city}
                  badgeOne={place.smoking}
                  badgeTwo={place.pet}
                  tag="spaceId"
                  id={place.id}
                  link={listing_link}
                  history={history}
                  key={place.id}
                />
              ))}
            </ul>
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
