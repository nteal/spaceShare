import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import ResultListItem from '../results/result-list-item.jsx';

class AllListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [{
        main_image: '',
        name: 'Filter by location to find available spaces.',
        cost: '',
        neighborhood: '',
        description: '',
        id: '',
      }],
      heading: 'Open Listings',
      location: 'New Orleans',
      listing_link: '/listing',
    };
    this.newSearch = this.newSearch.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.filterByLocation = this.filterByLocation.bind(this);
  }
  componentDidMount() {
    // eslint-disable-next-line
    console.log('SearchResults did mount');
    // Axios.get(`/search/listings/${localStorage.getItem('id_token')}`)
    //   .then((response) => {
    //     if (response.data.places.length) {
    //       this.setState({
    //         places: response.data.places,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line
    //     console.error(error);
    //   });
  }
  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    });
  }
  newSearch() {
    this.props.history.push('/search');
  }
  filterByLocation() {
    Axios.get(`/search/listings/${localStorage.getItem('id_token')}/${this.state.location}`)
      .then((response) => {
        console.log('get listings');
        console.dir(response);
        if (response.data.listings.length) {
          this.setState({
            places: response.data.listings,
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
        localStorage.removeItem('id_token');
        location.reload();
      });
  }
  render() {
    const {
      heading, places, listing_link,
    } = this.state;

    let resultsDisplay = places[0].name === 'Filter by location to find available spaces.' ? (
      <div className="row justify-content-center">
        <div className="col">
          <div className="row justify-content-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Astronaut_Illustration.png" alt="A happy astronaut" />
          </div>
          <div className="row justify-content-center">
            <h2 className="h-result text-center">Enter a location to find all listings there.</h2>
          </div>
        </div>
      </div>      
    ) : (
      <ul className="list-group list-group-flush">
        {places.map(place => (
          <ResultListItem
            image={place.main_image}
            name={place.name}
            cost={place.cost}
            neighborhood={place.neighborhood}
            city={place.city}
            badgeOne={place.smoking}
            badgeTwo={place.pet}
            tag="spaceId"
            id={place.id}
            link={listing_link}
            history={this.props.history}
            key={place.id}
          />
          ))}
      </ul>
    );

    return (
      <div className="pt-2 pl-2 pr-2">
        <div className="row justify-content-between ml-0 mr-0 mb-5">
          <div className="heading-box descender">
            <h1 className="pl-4">{heading}</h1>
          </div>
          <button className="btn btn-info pr-3" onClick={this.newSearch}>
            <div className="row ml-0 mr-0">
              <i className="material-icons mr-2">search</i>
              New Search
            </div>
          </button>
        </div>
        <div className="row mb-2 mx-auto w-50">
          <div className="input-group mb-3" onChange={this.handleLocationChange}>
            <input type="text" className="form-control" placeholder="Filter by location" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.filterByLocation}>Submit</button>
            </div>
          </div>
        </div>
        {resultsDisplay}
      </div>
    );
  }
}

AllListings.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
};
AllListings.defaultProps = {
  history: {
    push: () => (
      // eslint-disable-next-line
      console.log('you do not have access to props.history inside of this component')
    ),
  },
};

export default AllListings;
