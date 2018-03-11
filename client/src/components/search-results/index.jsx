import React from 'react';
import Axios from 'axios';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
    // }
  }
  render() {
    return (
      <div>
        {/* search results */}
      </div>
    );
  }
}

export default SearchResults;
