import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import MessageText from 'mdi-react/MessageTextIcon.js';
import FacebookBox from 'mdi-react/FacebookBoxIcon.js';
import UserStats from './userStats.jsx';
import AboutBox from '../listing/aboutBox.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name_first: 'Bobo',
        name_last: 'Boberton',
        image_url: 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
        gender: 'Female',
        profession: 'Professional pickler',
        personality: 'Extrovert',
        sleep: 'Early bird',
        zodiac: 'Aquarius',
        links: [
          {
            id: 1,
            display: 'I love pickles',
            url: 'http://www.nytimes.com/2012/02/19/magazine/adam-davidson-craft-business.html',
          },
        ],
        about: 'I\'m me! and no one else.',
      },
    };
    this.handleBack = this.handleBack.bind(this);
    this.messageUser = this.messageUser.bind(this);
  }
  componentDidMount() {
    const userId = this.props.location.state ? this.props.location.state.userId : 0;

    Axios.get(`/user/userPublic/${localStorage.getItem('id_token')}/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch(error => console.error('error retrieving user public data', error));
  }
  handleBack() {
    this.props.history.goBack();
  }
  messageUser() {
    const { nexmo_id, name_first, name_last } = this.state.user;
    const { startNewChat } = this.props;

    startNewChat(nexmo_id, name_first, name_last);
  }
  render() {
    const { user } = this.state;
    const { name_first, fb_link } = user;
    const heading = (/[qypg]/).test(name_first) ? (
      <div className="heading-box descender">
        <h1>{name_first}&apos;s Profile</h1>
      </div>
    ) : (
      <div className="heading-box">
        <h1>{name_first}&apos;s Profile</h1>
      </div>
    );
    return (
      <div className="pl-3">
        <MediaQuery minDeviceWidth={800}>
          <button id="edit-profile-back" className="custom-btn" onClick={this.handleBack}>
            <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
          </button>
        </MediaQuery>
        <div className="container p-res">
          <MediaQuery minDeviceWidth={800}>
            <div className="row mt-neg-3">
              {heading}
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={799}>
            <div className="row">
              <button className="custom-btn" onClick={this.handleBack}>
                <ArrowLeftBoldCircle className="mdi-btn" height={38} width={38} fill="#6F5BC0" />
              </button>
              <div className="mobile-heading-box">
                <h2>{name_first}&apos;s Profile</h2>
              </div>
            </div>
          </MediaQuery>
          <div className="row justify-content-center pt-res">
            <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex flex-column align-items-start">
              <UserStats user={user} />
            </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-8 d-flex flex-column">
              <MediaQuery maxDeviceWidth={799}>
                <Link to="/messages" className="btn btn-primary btn-block mb-1" onClick={this.messageUser}>
                  <div className="row pl-3">
                    <MessageText className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pt-1">Chat with this user</span>
                  </div>
                </Link>
              </MediaQuery>
              <MediaQuery minDeviceWidth={800}>
                <Link to="/messages" className="btn btn-primary btn-block btn-lg mb-1" onClick={this.messageUser}>
                  <div className="row pl-3 mb-neg">
                    <MessageText className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pb-1">Chat with this user</span>
                  </div>
                </Link>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={799}>
                <a href={fb_link} className="btn btn-primary btn-block mb-5">
                  <div className="row pl-3">
                    <FacebookBox className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pt-1">View this user&apos;s Facebook profile</span>
                  </div>
                </a>
              </MediaQuery>
              <MediaQuery minDeviceWidth={800}>
                <a href={fb_link} className="btn btn-primary btn-block btn-lg mb-5">
                  <div className="row pl-3 mb-neg">
                    <FacebookBox className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pb-1">View this user&apos;s Facebook profile</span>
                  </div>
                </a>
              </MediaQuery>
              <AboutBox heading={`A little about ${user.name_first}`} text={user.about} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

