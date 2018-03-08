import React from 'react';
import Axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    FB.init({
      appId: '2117633928483016',
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: false, // enable cookies to allow the server to access
      // the session
      xfbml: false, // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version: 'v2.8', // use graph api version 2.5
    });
    this.state = {};
    this.fbLogin = this.fbLogin.bind(this);
  }
  componentDidMount() {}
  fbLogin() {
    this.setState();
    FB.login((result) => {
      console.log('fb login result:');
      console.dir(result);
      if (result.authResponse) {
        Axios.get('auth/facebook', {
          params: {
            access_token: result.authResponse.accessToken,
          },
        })
          .then((response) => {
            console.log('server response:');
            console.dir(response);
            const token = response.headers.get('x-auth-token');
            if (token) {
              localStorage.setItem('id_token', token);
            }
          })
          .catch(err => (console.error(err)));
      }
    }, { scope: 'public_profile,email' });
  }
  render() {
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
}

export default Login;
