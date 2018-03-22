/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Login from './components/login/index.jsx';
import Nav from './components/nav/index.jsx';
import './styles.css';

OfflinePluginRuntime.install();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.startChatClient = this.startChatClient.bind(this);
  }
  componentDidMount() {
    Axios.get('/');
    this.startChatClient();
    FB.getLoginStatus((response) => {
      console.dir(response);
      if (response.status === 'connected') {
        Axios.get(`/auth/isAuthenticated/${localStorage.getItem('id_token')}`)
          .then((res) => {
            if (res.data === true) {
              this.setState({ isAuthenticated: true });
            }
          })
          .catch((error) => {
            console.error('error checking authentication', error);
          });
      }
    });
  }
  startChatClient() {
    Axios.get(`/user/currentUser/${localStorage.getItem('id_token')}`)
      .then((response) => {
        const nexmoUsername = response.data.id;
        Axios.get(`/chat/nexmoJwt/${localStorage.getItem('id_token')}/${nexmoUsername}`)
          .then((res) => {
            const { user_jwt } = res.data;
            const client = new ConversationClient({
              debug: false,
              environment: 'development',
            });
            this.setState({ chatClient: client }, () => {
              console.log('chat client started');
            });
            localStorage.removeItem('nexmo_token');
            localStorage.setItem('nexmo_token', user_jwt);
          })
          .catch(error => console.error('error getting nexmo token', error));
      })
      .catch(error => console.error('error getting nexmo id', error));
  }
  render() {
    const { isAuthenticated, chatClient } = this.state;

    return isAuthenticated ? 
      <Nav chatClient={chatClient} startChatClient={this.startChatClient} /> :
      <Login chatClient={chatClient} startChatClient={this.startChatClient} />;
  }
}

ReactDOM.render(<BrowserRouter basename="/"><App /></BrowserRouter>, document.getElementById('app'));
