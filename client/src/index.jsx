/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import Nav from './nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount() {
    Axios.get('/');
    // check if user is authenticated; if they are, redirect to dashboard; else, GET '/'
    Axios.get('/isAuthenticated')
      .then((response) => {
        if (response.data === true) {
          this.setState({ isAuthenticated: true });
        }
      })
      .catch((error) => {
        console.error('error checking authentication', error);
      });
  }

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to={Nav} />;
    }

    return (
      <div>
        <header>
          <h1>SpaceShare</h1>
          {/* Log In with Facebook button */}
        </header>
        <BrowserRouter basename="/" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
