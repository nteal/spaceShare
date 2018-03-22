import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    const { getNewChatEvents } = this.props;
    // get user data to populate profile content
    Axios.get(`/user/currentUser/${localStorage.getItem('id_token')}`)
      .then((response) => {
        this.setState({
          currentUser: response.data,
          currentUserSpaces: response.data.spaces || [],
        });
      })
      .catch((error) => {
        console.error('error retrieving user / space data', error);
      });
    getNewChatEvents();
  }

  render() {
    const { currentUser, currentUserSpaces } = this.state;
    const { newEvents, setConversation } = this.props;
    const invite = newEvents.length === 1 ? 'invite' : 'invites';
    return (
      <main className="pl-3">
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
                  You have {newEvents.length} new {invite} to chat!
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
                      You have {newEvents.length} new {invite} to chat!
                    </Link>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery minDeviceWidth={800}>
                <Messages newEvents={newEvents} setConversation={setConversation} />
              </MediaQuery>
              <Spaces spaces={currentUserSpaces} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Dashboard.propTypes = {
  newEvents: PropTypes.array,
  getNewChatEvents: PropTypes.func,
  setConversation: PropTypes.func,
};

Dashboard.defaultProps = {
  newEvents: [],
  getNewChatEvents: null,
  setConversation: null,
};

export default Dashboard;
