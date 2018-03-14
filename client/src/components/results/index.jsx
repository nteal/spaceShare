import React from 'react';
import PropTypes from 'prop-types';
import ResultListItem from './result-list-item.jsx';
import SearchListItem from './search-list-item.jsx';

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
      heading, people, places, searches, history, profile_link, listing_link,
    } = this.props;
    return (
      <div>
        <div className="row mb-2 mt-2">
          <div className="col-10">
            <h1>{heading}</h1>
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={this.newSearch}>New Search</button>
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
              <a className="nav-link" href="/saved-searches">Past Searches</a>
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
                link={profile_link}
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
                id={place.id}
                link={listing_link}
              />
            ))}
          </div>
          <div className="tab-pane fade" id="searches" role="tabpanel">
            {searches.map(search => (
              <SearchListItem
                purpose={search.purpose}
                neighborhood={search.neighborhood}
                price_min={search.price_min}
                price_max={search.price_max}
                timeline={search.timeline}
                smoking={search.smoking}
                pet={search.pet}
                include_people={search.include_people}
                sleep={search.sleep}
                personality={search.personality}
                age_min={search.age_min}
                age_max={search.age_max}
                timestamp={search.timestamp}
                id={search.id}
                history={history}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  history: PropTypes.object,
  heading: PropTypes.string,
  people: PropTypes.array,
  places: PropTypes.array,
  searches: PropTypes.array,
  profile_link: PropTypes.string,
  listing_link: PropTypes.string,
};
Results.defaultProps = {
  history: {
    push: () => (
      console.log('you do not have access to props.history inside of this component')
    ),
  },
  heading: 'Results',
  people: [],
  places: [],
  searches: [],
  profile_link: '/profile',
  listing_link: '/listing',
};

export default Results;
