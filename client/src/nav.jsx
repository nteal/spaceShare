import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { AppBar } from 'material-ui';
import Axios from 'axios';
import Dashboard from './components/dashboard/index.jsx';

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
        <AppBar />
        {/* side nav */}


        <Switch>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Nav;
