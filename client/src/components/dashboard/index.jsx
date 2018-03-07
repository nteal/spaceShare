import React from 'react';
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
            <div className="heading-box">
              <h1>Your Dashboard</h1>
            </div>
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
