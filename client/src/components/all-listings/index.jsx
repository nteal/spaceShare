import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResultListItem from '../results/result-list-item.jsx';
import SearchListItem from '../results/search-list-item.jsx';

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
    console.log('SearchResults did mount');
    // Axios.get(`/api/listings/${localStorage.getItem('id_token')}`)
    //   .then((response) => {
    //     if (response.data.places.length) {
    //       this.setState({
    //         places: response.data.places,
    //       });
    //     }
    //     if (response.data.searches.length) {
    //       this.setState({
    //         searches: response.data.searches,
    //       });
    //     }
    //   })
    //   .catch((error) => { console.error(error); });
  }
  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    }, () => {
      console.log(this.state.location);
    });
  }
  newSearch() {
    this.props.history.push('/search');
  }
  filterByLocation() {
    Axios.get(`/api/listings/${localStorage.getItem('id_token')}/${this.state.location}`)
      .then((response) => {
        if (response.data.places.length) {
          this.setState({
            places: response.data.places,
          });
        }
        if (response.data.searches.length) {
          this.setState({
            searches: response.data.searches,
          });
        }
      })
      .catch((error) => { console.log(error); });
  }
  render() {
    const {
      heading, people, places, searches, listing_link,
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
              <button className="btn btn-outline-primary"type="button">Submit</button>
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
  history: PropTypes.object,
};
AllListings.defaultProps = {
  history: {
    push: () => (
      console.log('you do not have access to props.history inside of this component')
    ),
  },
};

export default AllListings;
