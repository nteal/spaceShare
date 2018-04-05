import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../nav/index.jsx';
import Terms from '../login/terms.jsx';
import PrivacyPolicy from '../login/privacy.jsx';
import LogoGradient from '../../assets/ss-logo-gradient.png';

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
              localStorage.removeItem('id_token');
              localStorage.setItem('id_token', response.data);
              startChatClient((user_jwt) => {
                localStorage.setItem('nexmo_token', user_jwt);
              });
            }
          })
          .then(() => {
            console.log('this call in particular');
            Axios.get(`/auth/isAuthenticated/${localStorage.getItem('id_token')}`)
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
    const { startChatClient } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (!isAuthenticated) {
              return (
                <div className="jumbotron jumbotron-fluid splash-bg mb-0">
                  <div className="container">
                    <div className="row justify-content-center align-items-center splash-position">
                      <div className="col">
                        <div className="row justify-content-center align-items-center">
                          <img src={LogoGradient} className="img-fluid splash-logo" alt="SpaceShare logo" />
                        </div>
                        <div className="row justify-content-center">
                          <MediaQuery maxDeviceWidth={850}>
                            <h1 className="display-4 mt-neg-md">SpaceShare</h1>
                          </MediaQuery>
                          <MediaQuery minDeviceWidth={851} maxDeviceWidth={1800}>
                            <h1 className="display-2 mt-neg-lg">SpaceShare</h1>
                          </MediaQuery>
                          <MediaQuery minDeviceWidth={1801}>
                            <h1 className="display-xl mt-neg-xl">SpaceShare</h1>
                          </MediaQuery>
                        </div>
                      </div>
                    </div>
                    <MediaQuery maxDeviceWidth={850}>
                      <div className="row justify-content-center pt-10rem">
                        <button className="btn btn-outline-light" onClick={this.fbLogin}>
                          Log in with Facebook
                        </button>
                      </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={851} maxDeviceWidth={1800}>
                      <div className="row justify-content-center pt-10">
                        <button className="btn btn-outline-light" onClick={this.fbLogin}>
                          Log in with Facebook
                        </button>
                      </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={1801}>
                      <div className="row justify-content-center pt-alot">
                        <button className="btn btn-outline-light" onClick={this.fbLogin}>
                          Log in with Facebook
                        </button>
                      </div>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={1800}>
                      <div className="row justify-content-center pt-5">
                        <small>
                          <Link to="/terms">
                            Our terms of use
                          </Link>
                          &nbsp;|&nbsp;
                          <Link to="/privacy-policy">
                            Our privacy policy
                          </Link>
                        </small>
                      </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={1801}>
                      <div className="row justify-content-center pt-alot">
                        <small>
                          <Link to="/terms">
                            Terms of use
                          </Link>
                          &nbsp;|&nbsp;
                          <Link to="/privacy-policy">
                            Privacy policy
                          </Link>
                        </small>
                      </div>
                    </MediaQuery>
                  </div>
                </div>
              );
            }
            return <Nav startChatClient={startChatClient} />;
          }}
        />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
      </Switch>
    );
  }
}

Login.propTypes = {
  startChatClient: PropTypes.object,
};

Login.defaultProps = {
  startChatClient: null,
};

export default Login;
