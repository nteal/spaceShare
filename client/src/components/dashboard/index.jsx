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
      currentUser: {
        spaces: [],
      },
      currentUserSpaces: [],
    };
  }
  componentDidMount() {
    console.log('dashboard did mount');
    // get user data to populate profile content
    console.log('moved dashboard currentUser to 3002')
    Axios.get(`/api/currentUser/${localStorage.getItem('id_token')}`)
      .then((response) => {
        console.log('response data => ', response.data);

        this.setState({
          currentUser: response.data,
          currentUserSpaces: response.data.spaces || [],
        });
      })
      .catch((error) => {
        console.error('error retrieving user / space data', error);
      });
  }

  render() {
    const { currentUser, currentUserSpaces } = this.state;
    return (
      <main>
        <div className="container p-res">
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
            <div className="row justify-content-center pt-res">
              <div className="col">
                <Link to="/messages" className="btn btn-primary btn-lg btn-block mt-3" role="button">
                  You have 0 new messages!
                </Link>
              </div>
            </div>
          </MediaQuery>
          <div className="row row-eq-height pt-res">
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 d-flex flex-column align-items-stretch">
              <DashProfile user={currentUser} />
            </div>
            <div className="col-12 col-sm-6 col-md-8 col-lg-8 d-flex flex-column align-items-stretch">
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
                <Messages />
              </MediaQuery>
              <Spaces spaces={currentUserSpaces} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
