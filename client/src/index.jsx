/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import Login from './components/login/index.jsx';
import Nav from './components/nav/index.jsx';
import './styles.css';

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
    FB.getLoginStatus((response) => {
      console.dir(response);
      if (response.status === 'connected') {
        Axios.get('/isAuthenticated', { params: { token: localStorage.getItem('id_token') } })
          .then((response) => {
            if (response.data === true) {
              this.setState({ isAuthenticated: true });
            }
          })
          .catch((error) => {
            console.error('error checking authentication', error);
          });
      }
    });
  }
  render() {
    const { isAuthenticated } = this.state;

    return isAuthenticated ? <Nav /> : <Login />;
  }
}

ReactDOM.render(<BrowserRouter basename="/"><App /></BrowserRouter>, document.getElementById('app'));
