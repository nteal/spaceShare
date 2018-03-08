import React from 'react';
import MediaQuery from 'react-responsive';
import Axios from 'axios';
import DashProfile from './profile.jsx';
import Messages from './messages.jsx';
import Spaces from './spaces.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentUserSpaces: [],
    };
    this.fbLogout = this.fbLogout.bind(this);
  }
  componentDidMount() {
    console.log('dashboard did mount');
    // get user data to populate profile content
    Axios({
      method: 'get',
      url: 'http://localhost:3003/currentUser',
    })
      .then((response) => {
        this.setState({ currentUser: response.data });
        console.log(response.data);
        // get user's spaces to populate spaces content
        Axios.get('http://localhost:3003/currentUserSpaces', {
          params: { userId: response.data.id },
        })
          .then((spaces) => {
            this.setState({ currentUserSpaces: spaces.data });
            console.log(spaces.data);
          })
          .catch((error) => {
            console.error('error retrieving user space data', error);
          });
      })
      .catch((error) => {
        console.error('error retrieving user data', error);
      });
  }
  fbLogout() {
    this.setState();
    console.log('bang');
    localStorage.removeItem('id_token');
  }

  render() {
    const { currentUser, currentUserSpaces } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <MediaQuery minDeviceWidth={800}>
              <div className="heading-box">
                <h1>Your Dashboard</h1>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={600}>
              <div className="mobile-heading-box">
                <h2>Your Dashboard</h2>
              </div>
            </MediaQuery>
          </div>
          <div className="row row-eq-height content-row">
            <div className="col-12 col-sm-4 col-md-4 col-lg-4">
              <DashProfile user={currentUser} />
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-8">
              <div className="row">
                <Messages />
              </div>
              <div className="row">
                <Spaces spaces={currentUserSpaces} />
              </div>
            </div>
          </div>
        </div>
        <div className="row"><button onClick={this.fbLogout}>LOGOUT</button></div>
      </div>
    );
  }
}

export default Dashboard;
