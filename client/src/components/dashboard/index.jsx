import React from 'react';
import MediaQuery from 'react-responsive';
import Profile from './profile.jsx';
import Messages from './messages.jsx';
import Spaces from './spaces.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('dashboard did mount');
  }
  render() {
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
              <Profile />
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-8">
              <div className="row">
                <Messages />
              </div>
              <div className="row">
                <Spaces />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
