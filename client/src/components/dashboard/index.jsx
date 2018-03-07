import React from 'react';
import MediaQuery from 'react-responsive';
import Axios from 'axios';
import Profile from './profile.jsx';
import Messages from './messages.jsx';
import Spaces from './spaces.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentUserSpaces: [],
    };
  }
  componentDidMount() {
    console.log('dashboard did mount');
    // get user data to populate profile content
    Axios.get('/currentUser')
      .then((user) => {
        this.setState({ currentUser: user.data });
        // get user's spaces to populate spaces content
        Axios.get('/currentUserSpaces', {
          params: { userId: user.data.id },
        })
          .then((spaces) => {
            this.setState({ currentUserSpaces: spaces.data });
          })
          .catch((error) => {
            console.error('error retrieving user space data', error);
          });
      })
      .catch((error) => {
        console.error('error retrieving user data', error);
      });
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
          <div className="row row-eq-height">
            <div className="col-12 col-sm-4 col-md-4 col-lg-4">
              <Profile user={currentUser} />
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
      </div>
    );
  }
}

export default Dashboard;
