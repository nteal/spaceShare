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
    const { people, places } = this.state;
    return (
      <div>
        <Results
          heading="Your Results"
          people={people}
          places={places} 
        />
      </div>
    );
  }
}

export default SearchResults;
