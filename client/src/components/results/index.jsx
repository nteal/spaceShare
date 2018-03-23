import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import SearchParams from './search-params.jsx';
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
      <div>
        <div className="searches-color">
          <div className="pt-2 pl-2 pr-2">
            <div className="row justify-content-between mb-5 mr-0 pl-3">
              <div className="heading-box searches-color-text">
                <h1>{heading}</h1>
              </div>
              {/* <SearchParams
                purpose={search.purpose}
                location={search.location}
                radius={search.distance}
                priceMin={search.price_min}
                priceMax={search.price_max}
                timeline={search.timeline}
                smoking={search.smoking}
                pet={search.pet}
                includesPeople={search.include_people}
                sleep={search.sleep}
                personality={search.personality}
                ageMin={search.age_min}
                ageMax={search.age_max}
              /> */}
              <button className="btn btn-info pr-3" onClick={this.newSearch}>
                <div className="row ml-0 mr-0">
                  <i className="material-icons mr-2">search</i>
                  <h5 className="h-result mb-0">New Search</h5>
                </div>
              </button>
            </div>
            <div className="row tab-row pl-3">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item mr-2">
                  <a className="nav-link tab-spaces active" data-toggle="tab" href="#places" role="tab">Places</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tab-people" data-toggle="tab" href="#people" role="tab">People</a>
                </li>
                <li className="nav-item saved-searches-tab">
                  <Link
                    className="nav-link tab-saved"
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
          </div>
        </div>
        <div className="tab-content pl-2 pr-2" id="myTabContent">
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
