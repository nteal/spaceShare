import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import ResultListItem from '../results/result-list-item.jsx';
import SearchListItem from '../results/search-list-item.jsx';
import Footer from '../nav/footer.jsx';

class PastSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [{
        image_url: '',
        name_first: 'no people were found for this search',
        name_last: '',
        profession: '',
        sleep: '',
        personality: '',
      }],
      places: [{
        main_image: '',
        name: 'There are no results for this search',
        cost: '',
        neighborhood: '',
        description: '',
        id: '',
      }],
      searches: [{
        purpose: 'You do not have any past searches',
        location: 'location',
        price_min: 0,
        price_max: 0,
        timeline: 'long-term',
        smoking: 'outside is fine',
        pet: 'anywhere',
        include_people: true,
        sleep: 'early bird',
        personality: 'introvert',
        age_min: 0,
        age_max: 100,
        timestamp: 'time-stamp',
      }],
      heading: 'Past Searches',
      people_button_heading: 'search for people',
      places_button_heading: 'search for places',
      people_link: '/search',
      places_link: '/search',
    };
    this.newSearch = this.newSearch.bind(this);
    this.deleteSearch = this.deleteSearch.bind(this);
  }
  componentDidMount() {
    console.log('SearchResults did mount'); // eslint-disable-line
    Axios.get(`/search/saved-searches/${localStorage.getItem('id_token')}`)
      .then((response) => {
        console.log('get saved-searches');
        console.dir(response);
        if (response.data.length) {
          this.setState({
            searches: response.data,
          });
        }
        if (this.props.location.state && this.props.location.state.people.name_first !== 'no people were found for this search') {
          this.setState({
            people: this.props.location.state.people,
            people_button_heading: 'more info',
            people_link: '/profile',
          });
        }
        if (this.props.location.state && this.props.location.state.places.name !== 'There are no results for this search') {
          this.setState({
            places: this.props.location.state.places,
            places_button_heading: 'more info',
            places_link: '/listing',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem('id_token');
        location.reload();
      });
  }
  newSearch() {
    this.props.history.push('/search');
  }
  deleteSearch(searchId) {
    Axios.post(`/search/delete-search/${localStorage.getItem('id_token')}/${searchId}`)
      .then(() => {
        Axios.get(`/search/saved-searches/${localStorage.getItem('id_token')}`)
          .then((response) => {
            if (response.data.length) {
              this.setState({
                searches: response.data,
              });
            }
            if (this.props.location.state.people.name_first !== 'no people were found for this search') {
              this.setState({
                people: this.props.location.state.people,
                people_button_heading: 'more info',
                people_link: '/profile',
              });
            }
            if (this.props.location.state.places.name !== 'There are no results for this search') {
              this.setState({
                places: this.props.location.state.places,
                places_button_heading: 'more info',
                places_link: '/listing',
              });
            }
          })
          .catch((error) => {
            console.error(error);
            localStorage.removeItem('id_token');
            location.reload();
          });
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem('id_token');
        location.reload();
      });
  }
  render() {
    const {
      heading, people, places, searches,
    } = this.state;
    const noResultsDisplay = (
      <div className="row justify-content-center">
        <div className="col">
          <div className="row justify-content-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Astronaut_Illustration.png" alt="A happy astronaut" />
          </div>
          <div className="row justify-content-center">
            <h2 className="h-result text-center">Sorry, there are no results here at this time.</h2>
          </div>
        </div>
      </div>
    );
    let peopleDisplay;
    if (people[0].name_first === 'no people were found for this search') {
      peopleDisplay = noResultsDisplay;
    } else {
      peopleDisplay = (
        <ul className="list-group list-group-flush">
          {people.map((person, i) => (
            <ResultListItem
              num={i}
              image={person.image_url}
              name={`${person.name_first} ${person.name_last}`}
              profession={person.profession}
              badgeOne={person.sleep}
              badgeTwo={person.personality}
              link={this.state.people_link}
              tag="userId"
              id={person.id}
              key={person.id}
              history={this.props.history}
              button_heading={this.state.people_button_heading}
            />
          ))}
        </ul>
      );
    }

    let placesDisplay;
    if (places[0].name === 'There are no results for this search') {
      placesDisplay = noResultsDisplay;
    } else {
      placesDisplay = (
        <ul className="list-group list-group-flush">
          {places.map((place, i) => (
            <ResultListItem
              num={i}
              image={place.main_image}
              name={place.name}
              cost={place.cost}
              neighborhood={place.neighborhood}
              city={place.city}
              badgeOne={place.smoking}
              badgeTwo={place.pet}
              tag="spaceId"
              id={place.id}
              key={place.id}
              link={this.state.places_link}
              place={place.id}
              history={this.props.history}
              button_heading={this.state.places_button_heading}
            />
          ))}
        </ul>
      );
    }

    let searchesDisplay;
    if (searches[0].purpose === 'You do not have any past searches') {
      searchesDisplay = (
        <div className="row justify-content-center">
          <div className="col">
            <div className="row justify-content-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Astronaut_Illustration.png" alt="A happy astronaut" />
            </div>
            <div className="row justify-content-center">
              <h2 className="h-result text-center">You do not have any searches yet!</h2>
            </div>
          </div>
        </div>
      );
    } else {
      searchesDisplay = (
        <ul className="list-group list-group-flush">
          {searches.slice(0).reverse().map(search => (
            <SearchListItem
              purpose={search.purpose}
              city={search.city}
              distance={search.distance}
              neighborhood={search.location}
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
              timestamp={search.createdAt}
              id={search.id}
              history={this.props.history}
              key={search.id}
              deleteSearch={this.deleteSearch}
            />
          ))}
        </ul>
      );
    }
    return (
      <div>
        <div className="searches-color">
          <div className="pt-2 pl-2 pr-2">
            <div className="row justify-content-between mb-5 mr-0 pl-3">
              <div className="heading-box searches-color-text">
                <h1>{heading}</h1>
              </div>
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
                  <a className="nav-link tab-spaces" data-toggle="tab" href="#places" role="tab">Places</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tab-people" data-toggle="tab" href="#people" role="tab">People</a>
                </li>
                <li className="nav-item saved-searches-tab">
                  <a className="nav-link tab-saved active" data-toggle="tab" href="#searches" role="tab">Saved Searches</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content pl-2 pr-2" id="myTabContent">
          <div className="tab-pane fade" id="people" role="tabpanel">
            {peopleDisplay}
          </div>
          <div className="tab-pane fade" id="places" role="tabpanel">
            {placesDisplay}
          </div>
          <div className="tab-pane fade show active" id="searches" role="tabpanel">
            {searchesDisplay}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PastSearches.propTypes = {
  history: PropTypes.object, // eslint-disable-line
};
PastSearches.defaultProps = {
  history: {
    push: () => (
      // eslint-disable-next-line
      console.log('you do not have access to props.history inside of this component')
    ),
  },
};

export default PastSearches;
