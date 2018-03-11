import React from 'react';
import { Link } from 'react-router-dom';
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
  }
  componentDidMount() {
    console.log('dashboard did mount');
    // get user data to populate profile content
    console.log('moved dashboard currentUser to 3002')
    Axios.get('/api/currentUser', {
      params: { token: localStorage.getItem('id_token') },
    })
      .then((response) => {
        this.setState({ currentUser: response.data });
        // get user's spaces to populate spaces content
        Axios.get('/api/currentUserSpaces', {
          params: {
            userId: response.data.id,
            token: localStorage.getItem('id_token'),
          },
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
        <div className="container-fluid">
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
          <MediaQuery maxDeviceWidth={600}>
            <div className="row justify-content-center content-row">
              <div className="col">
                <Link to="/messages" className="btn btn-primary btn-lg btn-block" role="button">
                  You have 0 new messages!
                </Link>
              </div>
            </div>
          </MediaQuery>
          <div className="row row-eq-height content-row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <DashProfile user={currentUser} />
            </div>
            <div className="col-12 col-sm-6 col-md-8 col-lg-8">
              <MediaQuery minDeviceWidth={601} maxDeviceWidth={799}>
                <div className="row justify-content-center">
                  <div className="col">
                    <Link to="/messages" className="btn btn-primary btn-lg btn-block" role="button">
                      You have 0 new messages!
                    </Link>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery minDeviceWidth={800}>
                <div className="row">
                  <Messages />
                </div>
              </MediaQuery>
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
