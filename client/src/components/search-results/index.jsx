import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Results from '../results/index.jsx';

class SearchResults extends React.Component {
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
      search: {
        purpose: '',
        location: '',
        city: '',
        price_min: 0,
        price_max: 0,
        timeline: '',
        smoking: '',
        pet: '',
        include_people: true,
        sleep: '',
        personality: '',
        age_min: 0,
        age_max: 100,
        createdAt: '',
        updatedAt: '',
        distance: 0,
      },
      profile_link: '/profile',
      listing_link: '/listing',
    };
  }
  componentDidMount() {
    const id_search = this.props.location.state ?
      this.props.location.state.search_id :
      localStorage.getItem('id_search');
      // eslint-disable-next-line
    console.log('SearchResults did mount');
    Axios.get(`/api/search-results/${localStorage.getItem('id_token')}/${id_search}`)
      .then((response) => {
        console.log('get search-results');
        console.dir(response);
        if (response.data.people.length) {
          this.setState({
            people: response.data.people,
          });
        }
        if (response.data.places.length) {
          this.setState({
            places: response.data.places,
          });
        }
        if (response.data.search) {
          this.setState({
            search: response.data.search,
          });
        }
      })
      // eslint-disable-next-line
      .catch((error) => { console.error(error); });
  }
  render() {
    const {
      people, places, search, profile_link, listing_link,
    } = this.state;
    return (
      <div>
        <Results
          heading="Search Results"
          people={people}
          places={places}
          search={search}
          profile_link={profile_link}
          listing_link={listing_link}
          history={this.props.history}
        />
      </div>
    );
  }
}

SearchResults.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  // eslint-disable-next-line
  location: PropTypes.object,
};
SearchResults.defaultProps = {
  history: {
    push: () => (
      // eslint-disable-next-line
      console.log('you do not have access to props.history inside of this component')
    ),
  },
  location: {
    state: {
      search_id: false,
    },
  },
};

export default SearchResults;
