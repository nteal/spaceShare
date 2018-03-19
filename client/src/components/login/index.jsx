import React from 'react';
import Axios from 'axios';
import Nav from '../nav/index.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    FB.init({
      appId: '2117633928483016',
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: false, // enable cookies to allow the server to access the session
      xfbml: false, // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version: 'v2.8',
    });
    this.state = {
      isAuthenticated: false,
    };
    this.fbLogin = this.fbLogin.bind(this);
  }
  componentDidMount() {}
  fbLogin() {
    const { startChatClient } = this.props;
    this.setState();
    FB.login((result) => {
      console.log('fb login result:');
      console.dir(result);
      if (result.authResponse) {
        Axios.post('/auth/facebook', {
          access_token: result.authResponse.accessToken,
        })
          .then((response) => {
            console.log('server response:');
            console.dir(response);
            if (response.data) {
              console.log('bang');
              localStorage.removeItem('id_token');
              localStorage.setItem('id_token', response.data);
              startChatClient();
            }
          })
          .then(() => {
            console.log('this call in particular');
            Axios.get(`/api/isAuthenticated/${localStorage.getItem('id_token')}`)
              .then((isAuthenticated) => {
                console.log('isAuth...');
                console.dir(isAuthenticated);
                if (isAuthenticated.data) {
                  this.setState({ isAuthenticated: true });
                }
              });
          })
          .catch(err => (console.error(err)));
      }
    }, { scope: 'public_profile,email' });
  }
  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return (
        <div>
          <h1>SpaceShare</h1>
          <br />
          <button onClick={this.fbLogin}>
            Login with Facebook
          </button>
        </div>
      );
    }
    return <Nav />;
  }
}

export default Login;
