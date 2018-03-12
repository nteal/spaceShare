import React from 'react';
import Axios from 'axios';
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
      }],
      searches: [{
        purpose: 'You do not have any past searches',
        neighborhood: 'location',
        price_min: '0',
        price_max: '0',
        timeline: 'long-term',
        smoking: 'outside is fine',
        pet: 'anywhere',
        include_people: 'people included',
        sleep: 'early bird',
        personality: 'introvert',
        age_min: '0',
        age_max: '100',
        timestamp: 'time-stamp'
      }]
    };
  }
  componentDidMount() {
    console.log('SearchResults did mount');
    // if (localStorage.getItem('id_search')) {
    //   Axios.get('/api/search-results', {
    //     params: {
    //       token: localStorage.getItem('id_token'),
    //       search_id: localStorage.getItem('id_search'),
    //     }
    //   })
    //     .then((response) => {
    //       this.setState({
    //         people: response.data.people,
    //         places: response.data.places
    //       });
    //     })
    //     .catch((error) => {console.log(error)});
    // }
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
        />
      </div>
    );
  }
}

export default SearchResults;
