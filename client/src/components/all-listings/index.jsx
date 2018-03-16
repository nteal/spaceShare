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
    // Axios.get(`/api/listings/${localStorage.getItem('id_token')}`)
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
    Axios.get(`/api/listings/${localStorage.getItem('id_token')}/${this.state.location}`)
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
      });
  }
  render() {
    const {
      heading, places, listing_link,
    } = this.state;
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
        
        <div className="row mb-2 mx-auto w-50">
          <div className="input-group mb-3" onChange={this.handleLocationChange}>
            <input type="text" className="form-control" placeholder="Filter by location" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary"type="button" onClick={this.filterByLocation}>Submit</button>
            </div>
          </div>
        </div>
        {places.map(place => (
          <div className="row mx-auto w-75">
            <ResultListItem
              image={place.main_image}
              name={place.name}
              financial={place.cost}
              about={place.neighborhood}
              description={place.description}
              tag="spaceId"
              id={place.id}
              link={listing_link}
              history={this.props.history}
              key={place.id}
            />
          </div>
          ))}
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
