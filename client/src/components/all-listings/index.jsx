import React from 'react';
import Axios from 'axios';

class AllListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('AllListings did mount');
    // if (localStorage.getItem('id_search')) {
    //   Axios.get('/api/all-listings', {
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
        {/* all listings */}
      </div>
    );
  }
}

export default AllListings;