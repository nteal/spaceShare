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
        name: 'There are no results for this search.',
        cost: '',
        neighborhood: '',
        description: '',
        id: '',
      }],
      searches: [{
        purpose: 'You do not have any past searches',
        neighborhood: 'location',
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
      profilelink: '/profile',
      refresh: true,
    };
  }
  componentDidMount() {
    console.log('SearchResults did mount');
    this.setState({
      refresh: this.props.refresh, togggleRefresh: this.props.toggleRefresh
    });
    // Axios.get('/api/search-results', {
    //   params: {
    //     token: localStorage.getItem('id_token'),
    //     search_id: localStorage.getItem('id_search'),
    //   },
    // })
    //   .then((response) => {
    //     if (response.data.people.length) {
    //       this.setState({
    //         people: response.data.people,
    //       });
    //     }
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
    //   .catch((error) => { console.log(error); });
  }
  render() {
    const { people, places, searches } = this.state;
    return (
      <div>
        <Results
          heading="Search Results"
          people={people}
          places={places}
          searches={searches}
          history={this.props.history}
          profilelink={this.state.profilelink}
          toggleRefresh={this.props.toggleRefresh}
        />
      </div>
    );
  }
}

SearchResults.propTypes = {
  history: PropTypes.object,
};

export default SearchResults;
