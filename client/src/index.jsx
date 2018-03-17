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
    FB.getLoginStatus((response) => {
      console.dir(response);
      if (response.status === 'connected') {
        Axios.get(`/api/isAuthenticated/${localStorage.getItem('id_token')}`)
          .then((res) => {
            if (res.data === true) {
              const client = new ConversationClient;
              this.setState({
                isAuthenticated: true,
                chatClient: client,
              });
            }
          })
          .catch((error) => {
            console.error('error checking authentication', error);
          });
      }
    });
  }
  render() {
    const { isAuthenticated, chatClient } = this.state;

    return isAuthenticated ? <Nav chatClient={chatClient} /> : <Login chatClient={chatClient} />;
  }
}

ReactDOM.render(<BrowserRouter basename="/"><App /></BrowserRouter>, document.getElementById('app'));
