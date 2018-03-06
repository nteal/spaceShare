import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import TopNav from './top-nav.jsx';
import Dashboard from '../dashboard/index.jsx';
import CommonArea from '../common-area/index.jsx';
import CreateSpace from '../create-a-space/index.jsx';
import Search from '../search/index.jsx';
import SearchResults from '../search-results/index.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // check if user is authenticated; if they aren't, redirect to /
    Axios.get('/isAuthenticated')
      .then((response) => {
        if (response.data === false) {
          Axios.get('/');
        }
      })
      .catch((error) => {
        console.error('error checking authentication', error);
      });
  }

  render() {
    return (
      <div>
        {/* top nav */}
        <TopNav />
        {/* side nav */}


        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/common-area" component={CommonArea} />
          <Route path="/new-space" component={CreateSpace} />
          <Route path="/search" component={Search} />
          <Route path="/listings" component={SearchResults} />
        </Switch>
      </div>
    );
  }
}

export default Nav;
