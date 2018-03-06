import React from 'react';
import PeopleSearch from './peopleSearch.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('new search did mount');
  }
  render() {
    return (
      <div>
        {/* search */}
        {/* if conditional is meet: */}
        <PeopleSearch />
      </div>
    );
  }
}

export default Search;
